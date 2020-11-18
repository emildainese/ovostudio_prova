const path = require("path");
const fs = require("fs");

//----------------------------------------------------------------
const discountEmailTemplate = (emails) => {
  const emailData = {
    from: process.env.EMAIL_FROM,
    to: [...emails],
    subject: `Ovostudio Promotions`,
    html: `
       <h1>Shopping Countdown</h1>
       <p>Segui il link per sottoscrivere alla promozione!</p>
       <a href="${process.env.CLIENT_URL}/home">Ovostudio</a>
       <hr>
       <h2>Sono disponibili degli sconti</h2>
       <p>Affrettati lo sconto è valido per 15 giorni</p>
     `,
  };
  return emailData;
};

//----------------------------------------------------------------
const cuponEmailTemplate = (email, ...fileNames) => {
  const dirPath = path.join(__dirname, "..", "..", "download");
  const commercePath = `${dirPath}/${fileNames[0]}`;
  const shopPath = `${dirPath}/${fileNames[1]}`;
  //Per Sendgrid
  const ecommerceCupon = fs.readFileSync(commercePath).toString("base64");
  const shopCupon = fs.readFileSync(shopPath).toString("base64");

  const emailData = {
    from: process.env.OVOSTUDIO_EMAIL,
    to: email,
    subject: `Ovostudio Promotions`,
    html: `
       <h1>Discount Code</h1>
       <p>Scarica il pdf con il codice per accedere allo sconto</p>
       <a href="${process.env.DOWNLAOD_URI}/${fileNames[0]}" download="${fileNames[0]}">Download Ecommerce</a>
       <a href="${process.env.DOWNLAOD_URI}/${fileNames[1]}" download="${fileNames[1]}">Download Shop</a>
       <hr>
       <h2>Sono disponibili degli sconti</h2>
       <p>Affrettati lo sconto è valido per 15 giorni</p>
     `,
    attachments: [
      {
        content: ecommerceCupon,
        filename: fileNames[0],
        contentType: "application/pdf",
        disposition: "attachment",
      },
      {
        content: shopCupon,
        filename: fileNames[1],
        type: "application/pdf",
        disposition: "attachment",
      },
    ],
  };

  return emailData;
};

module.exports = {
  discountEmailTemplate,
  cuponEmailTemplate,
};
