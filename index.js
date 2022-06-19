const express = require("express");
const app = express();
var nodemailer = require("nodemailer");

const port = 3000;

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
function getText(email, message) {}
app.post("/test", (req, res) => {
  res.status(200).json("test success");
});
app
  .get("/", (req, res) => {
    res.json({ api: "api for sending emails" });
  })
  .post("/", (req, res) => {
    if (!req.query.email)
      res.status(300).json({
        input: req.query.email,
        error: "email error",
      });

    mailOptions.from = req.query.email;
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

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
