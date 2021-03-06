const cuponPdfTemplate = (data) => {
  return `<style>
  .box {
    box-sizing: border-box;
    max-width: 800px;
    margin: auto;
    padding: 3rem;
    border: 1px solid #eee;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
    font-size: 16px;
    line-height: 24px;
    font-family: "Helvetica Neue", "Helvetica", Helvetica, Arial, sans-serif;
    color: #555;
    background-image: url("./img/ovostudio.svg");
    background-repeat: no-repeat;
    background-position: 3rem 3rem;
    background-size: 5rem;
  }

  .box table {
    width: 100%;
    line-height: inherit;
    text-align: left;
  }

  .box table td {
    padding: 5px;
    vertical-align: top;
  }

  .box table tr td:nth-child(2) {
    text-align: right;
  }

  .box table tr.top table td {
    padding-bottom: 20px;
  }

  .box table tr.top table td.title {
    font-size: 45px;
    line-height: 45px;
    color: #333;
  }

  .box table tr.information table td {
    padding-bottom: 40px;
  }

  .box table tr.heading td {
    background: #eee;
    border-bottom: 1px solid #ddd;
    font-weight: bold;
  }

  .box table tr.details td {
    padding-bottom: 20px;
  }

  .box table tr.item td {
    border-bottom: 1px solid #eee;
  }

  .box table tr.item.last td {
    border-bottom: none;
  }

  .box table tr.total td:nth-child(2) {
    font-weight: bold;
  }
  @media only screen and (max-width: 600px) {
    .box table tr.top table td {
      width: 100%;
      display: block;
      text-align: center;
    }

    .box table tr.information table td {
      width: 100%;
      display: block;
      text-align: center;
    }
  }
  .rtl {
    direction: rtl;
    font-family: Tahoma, "Helvetica Neue", "Helvetica", Helvetica, Arial,
      sans-serif;
  }
  .rtl table {
    text-align: right;
  }
  .rtl table tr td:nth-child(2) {
    text-align: left;
  }
  .center {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .text-center {
    text-align: center;
  }
</style>
 <div>
   <div class="box">
     <table cellpadding="0" cellspacing="0">
       <tr class="top">
         <td colspan="2">
           <table>
             <tr>
               <td class="title"></td>
               <td>
                 CuponId #: ${data.cuponId}<br />
                 Creato il: ${data.createdAt}<br />
                 Valido fino al: ${data.expire}<br />
               </td>
             </tr>
           </table>
         </td>
       </tr>
       <tr>
        <td>
          <h2>${data.validFor}</h2>
        </td>
       </tr>
       <tr class="information">
         <td colspan="2">
           <table>
             <tr>
               <td>
                 Citta: ${data.citta}<br />
                 Company Name<br />
                 Name: ${data.nome} ${data.cognome}<br />
                 Email: ${data.email}
               </td>
             </tr>
           </table>
         </td>
       </tr>
       <tr class="item">
         <td>Discount Code:</td>
         <td>${data.discountCode}</td>
       </tr>
     </table>
   </div>
 </div>`;
};

module.exports = {
  cuponPdfTemplate,
};
