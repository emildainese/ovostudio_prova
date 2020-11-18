const { workerData } = require("worker_threads");
const { createPdf } = require("../util/pdf");
const { cuponEmailTemplate } = require("../template/email/mail");
const sendgrid = require("@sendgrid/mail");
sendgrid.setApiKey(process.env.SENDGRID_API_KEY);

// const nodemailer = require("nodemailer");
// const sparkPostTransport = require("nodemailer-sparkpost-transport");
// const transporter = nodemailer.createTransport(
//   sparkPostTransport({
//     sparkPostApiKey: process.env.SPARKPOST_API_KEY,
//   })
// );
// transporter.sendMail(template, (err, info) => {
//   if (err) {
//     console.log(err);
//     throw new Error(err);
//   }
// });

const generateFilesAndSendEmail = async (shopData, commerceData, email) => {
  try {
    const file1 = await createPdf("shop", shopData);
    const file2 = await createPdf("ecommerce", commerceData);
    const template = cuponEmailTemplate(email, file1, file2);
    await sendgrid.send(template);
  } catch (error) {
    throw new Error(error);
  }
};

generateFilesAndSendEmail(
  workerData.shopData,
  workerData.commerceData,
  workerData.email
)
  .then((result) => {
    console.log(`Mail sent to ${workerData.email}`);
  })
  .catch((err) => console.error(err));

// const sendgrid = require("@sendgrid/mail");
// sendgrid.setApiKey(process.env.SENDGRID_API_KEY);
// await sendgrid.send(template);
