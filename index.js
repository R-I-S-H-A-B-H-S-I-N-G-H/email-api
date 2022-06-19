const express = require("express");
const app = express();
var nodemailer = require("nodemailer");
const port = process.env.PORT || 3000;
app.use(express.json());

// app.use(express.urlencoded({ extended: true }));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "rishabhsinghtemp@gmail.com",
    pass: "qwqzzcigatficwcg",
  },
  port: 465,
  host: "smtp.gmail.com",
});

var mailOptions = {
  from: "",
  to: "rishabhsingh2305@gmail.com",
  subject: "Sending Email using Node.js",
  text: "",
};

app
  .get("/", (req, res) => {
    res.json({ api: "api for sending emails" });
  })
  .post("/email", (req, res, next) => {
    console.log(req.query);
    var data = {};
    data.email = req.query.email;
    data.message = req.query.message;
    data.phone = req.query.phone;
    data.name = req.query.name;
    mailOptions.text = ` Name: ${data.name} \n Email:${data.email} \n Phone:${data.phone} \n Message:${data.message}`;

    // console.log(mailOptions);
    // res.status(200).json(data);
    // return;
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log("error", error);
        res.status(300).json(error);
      } else {
        console.log("Email sent: " + info.response);
        res.status(200).json("success");
      }
    });
  });
