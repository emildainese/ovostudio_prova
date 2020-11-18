const path = require("path");
const pdf = require("html-pdf");
const { cuponPdfTemplate } = require("../template/pdf/cuponPdf");
const uuid = require("uuid");

const createPdf = (flag, data) => {
  const dirPath = path.join(__dirname, "..", "download");
  const fileName = `${uuid.v4()}-${flag}.pdf`;
  const filePath = `${dirPath}/${fileName}`;
  return new Promise((resolve, reject) => {
    pdf.create(cuponPdfTemplate(data), {}).toFile(filePath, (err) => {
      if (err) {
        reject(err);
      }
      resolve(fileName);
    });
  });
};

const generateCuponData = (userData, cupon, validFor) => {
  return {
    ...userData,
    cuponId: cupon._id.toString(),
    discountCode:
      validFor === "Valido per acquisti in negozio"
        ? cupon.shopDiscountCode
        : cupon.commerceDiscountCode,
    expire: cupon.expireAt.toString().substring(0, 10),
    createdAt: cupon.createdAt.toString().substring(0, 10),
    validFor,
  };
};

module.exports = {
  createPdf,
  generateCuponData,
};
