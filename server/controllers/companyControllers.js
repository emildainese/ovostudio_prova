const sendgrid = require("@sendgrid/mail");
const User = require("../models/User");
const { discountEmailTemplate } = require("../template/email/mail");
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

//-------------------------------------------------------------------
const discountEmail = async (req, res, next) => {
  const users = await User.find({}).lean();
  const emails = users.map((user) => user.email);
  const emailsTemplate = discountEmailTemplate(emails);
  try {
    await sendgrid.sendMultiple(emailsTemplate);
    res
      .status(200)
      .json({ message: "Le email sono state inviate con successo" });
  } catch (err) {
    return next(err);
  }
};

module.exports = {
  discountEmail,
};
