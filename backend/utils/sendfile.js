const nodeMailer = require("nodemailer");
const sendEmail=async(options)=>{
    
    let transporter = nodeMailer.createTransport({
        host: "smtp.ethereal.email",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
          user: "marta.deckow61@ethereal.email", // generated ethereal user
          pass: "nVdm91uUzyGKmVaMBx"
          , // generated ethereal password
        },
      });

    // const transporter=nodeMailer.createTransport({
    //     service: "Gmail",
    //     auth: {
    //         user: "nahaliqra@gmail.com",
    //         pass: "Nahal@123"
    //     }
    // });
    
    
    // nodeMailer.createTransport({
    //     service: 'smtp.gmail.com',
    //     auth:{
    //         user:"nahaliqra@gmail.com",
    //         pass:"Nahal@123",
    //     }
    // });
    const mailOptions ={
        from:"marta.deckow61@ethereal.email",
        to:options.email,
        subject:options.subject,
        text:options.message,
    };
    await transporter.sendMail(mailOptions);
   
}
module.exports=sendEmail;