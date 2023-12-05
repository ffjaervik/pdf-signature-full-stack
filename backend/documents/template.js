const templatePdf = ({ name, days, signature = '' }) => {
    const today = new Date();
    return `
         <!doctype html>
         <html>
             <head>
                 <meta charset="utf-8">
                 <title>PDF Result Template</title>
                 <style>
                     .invoice-box {
                         max-width: 800px;
                         margin: auto;
                         padding: 30px;
                         border: 1px solid #eee;
                         box-shadow: 0 0 10px rgba(0, 0, 0, .15);
                         font-size: 16px;
                         line-height: 24px;
                         font-family: 'Helvetica Neue', 'Helvetica',
                         color: #555;
                     }
                     .margin-top {
                         margin-top: 50px;
                     }
                     .justify-center {
                         text-align: center;
                     }
                     .invoice-box table {
                         width: 100%;
                         line-height: inherit;
                         text-align: left;
                     }
                     .invoice-box table td {
                         padding: 5px;
                         vertical-align: top;
                     }
                     .invoice-box table tr td:nth-child(2) {
                         text-align: right;
                     }
                     .invoice-box table tr.top table td {
                         padding-bottom: 20px;
                     }
                     .invoice-box table tr.top table td.title {
                         font-size: 45px;
                         line-height: 45px;
                         color: #333;
                     }
                     .invoice-box table tr.information table td {
                         padding-bottom: 40px;
                     }
                     .invoice-box table tr.heading td {
                         background: #eee;
                         border-bottom: 1px solid #ddd;
                         font-weight: bold;
                     }
                     .invoice-box table tr.details td {
                         padding-bottom: 20px;
                     }
                     .invoice-box table tr.item td {
                         border-bottom: 1px solid #eee;
                     }
                     .invoice-box table tr.item.last td {
                         border-bottom: none;
                     }
                     .invoice-box table tr.total td:nth-child(2) {
                         border-top: 2px solid #eee;
                         font-weight: bold;
                     }
                     @media only screen and (max-width: 600px) {
                         .invoice-box table tr.top table td {
                             width: 100%;
                             display: block;
                             text-align: center;
                         }
                         .invoice-box table tr.information table td {
                             width: 100%;
                             display: block;
                             text-align: center;
                         }
                     }
                 </style>
             </head>
             <body>
                 <div class="invoice-box">
                     <table cellpadding="0" cellspacing="0">
                         <tr class="top">
                             <td colspan="2">
                                 <table>
                                     <tr>
                                         <td class="title"><img  src="data:image/jpeg;base64,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"
                                             style="width:100%; max-width:156px;"></td>
                                         <td>
                                             Datum: ${`${today.getDate()}. ${today.getMonth() + 1}. ${today.getFullYear()}.`}
                                         </td>
                                     </tr>
                                 </table>
                             </td>
                         </tr>
                         <tr class="information">
                             <td colspan="2">
                                 <table>
                                     <tr>
                                         <td>
                                             Customer name: ${name}
                                         </td>
                                     </tr>
                                 </table>
                             </td>
                         </tr>
                         <tr class="heading">
                             <td>Working Days:</td>
                             <td>Working Hours</td>
                         </tr>
                         ${days
                             .map(
                                 (day) => `
                               <tr class="item">
                                   <td>Day ${day.day}:</td>
                                   <td>${day.start} - ${day.end}</td>
                               </tr>
                         `
                             )
                             .join('')}
                         <tr>
                             <td colspan="2">
                                 <p>Employee Signature:</p>
                                 <img src="${signature}" style="width: 300px; height: 100px; border: 1px solid #ddd;">
                             </td>
                         </tr>
                     </table>
                 </div>
                 <script>
                    //  You can use a signature library or tool here to capture the signature.
                    //  For example, you can use a library like SignaturePad.
                    //  Import the library and initialize it on the 'signature' div.
                    //  Example using SignaturePad:
                    //  const signaturePad = new SignaturePad(document.getElementById('signature'));
                 </script>
             </body>
         </html>
    `;
};

module.exports = templatePdf;
