"use strict";
const nodemailer = require("nodemailer");


async function send(sub, content) {
  
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    auth: {
      type:'login',
      user: 'carlostex98@gmail.com', 
      pass: 'Carlos9198!!', 
    },
  });

  //sub.trim();
  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"MarketPlace" <carlostex98@gmail.com>', // sender address
    to: sub, // list of receivers
    subject: "Atencion al cliente", 
    html: content
  });

  //console.log("Message sent: %s", info.messageId);
  
  
}

module.exports.send=send;