const { Worker } = require("worker_threads");
const path = require("path");
const uuid = require("uuid");
const { Cupon } = require("../models/Cupon");
const User = require("../models/User");
const { generateCuponData } = require("../util/pdf");

//---------------------------------------------------------
const sendCuponEmail = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email }).populate("cupon");

  if (!user) {
    return next(
      new Error(
        "Utente non presente nel database. Ti preghiamo di effettuare la registrazione."
      )
    );
  }

  if (!user.isValidDomain(getDomain(email))) {
    return next(new Error("Non puoi accedere a questa promozione"));
  }

  if (user.cupon) {
    return next(
      new Error("Sembra che tu abbia già usufruito di questa promozione.")
    );
  }

  const newCupon = new Cupon({
    shopDiscountCode: uuid.v4(),
    commerceDiscountCode: uuid.v4(),
    user: user,
  });

  try {
    user.cupon = newCupon;

    await newCupon.save();
    await user.save();

    spawnThread(
      generateCuponData(req.body, newCupon, "Valido per acquisti in negozio"),
      generateCuponData(req.body, newCupon, "Valido per acquisti in ecommerce"),
      email
    );

    res.status(200).json({
      message: `Una email con i codici di sconto è stata inviata a ${email}.`,
    });
  } catch (err) {
    return next(new Error(err));
  }
};

//---------------------------------------------------------
const registerUser = async (req, res, next) => {
  const { email } = req.body;
  const user = await User.findOne({ email });
  if (user) {
    return next(new Error("Utente gia registrato."));
  }
  if (!user.isValidDomain(getDomain(email))) {
    return next(new Error("Non puoi accedere a questa promozione"));
  }
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(200).json({ message: "Utente registrato con successo" });
  } catch (err) {
    return next(new Error(err));
  }
};

module.exports = { sendCuponEmail, registerUser };

//---------------------------------------------------------
const getDomain = (email) => {
  return email.toString().slice(email.toString().indexOf("@") + 1);
};

//---------------------------------------------------------
function spawnThread(shopData, commerceData, email) {
  const workerPath = path.resolve(
    __dirname,
    "..",
    "workers",
    "generate_pdf.js"
  );
  return new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, {
      workerData: { shopData, commerceData, email },
    });
    worker.on("message", (data) => {
      resolve(data);
    });
    worker.on("error", (err) => {
      reject(err);
    });
    worker.on("exit", (code) => {
      if (code !== 0)
        reject(new Error(`Worker stopped with exit code ${code}`));
    });
  });
}
