const express = require("express");
const app = express();
var nodemailer = require("nodemailer");
const port = process.env.PORT || 3000;
app.use(express.json());

// app.use(express.urlencoded({ extended: true }));
console.log();
app.use(express.static(`${__dirname}"\public"`));
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
  to: "info@redpositive.in",
  subject: "Sending Email via App create by Rishabh Singh(Internshala)",
  text: "",
  html: "<h1>Hello</h1>",
};

app
  .get("/", (req, res) => {
    res.json({ api: "api for sending emails" });
  })
  .post("/", (req, res, next) => {
    console.log(req.query);
    const data = {};
    data.email = req.query.email;
    data.message = req.query.message;
    data.phone = req.query.phone;
    data.name = req.query.name;

    //assigning data
    mailOptions.from = data.email;

    mailOptions.html = `
    <h2>Contact Details</h2>
    <li> Name  : ${data.name} </li>
    <li> Phone : ${data.phone}</li>
    <li> Email : ${data.email}</li>

    <h2>Message</h2>
    <p>
    ${data.message}
    </p>
    `;

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

//404
app.use((req, res) => {
  res.sendFile(__dirname + "/public/404.html");
});
