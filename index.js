require("dotenv").config();
// third parties
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const http = require("http");
let passport = require("passport");

let adminRoutes = require("./routes/admin");


const app = express();
const server = http.createServer(app);
//Use CORS
app.use(cors());
// Use bodyparser
app.use(bodyParser.json({}));

// Bring in defined Passport Strategy

// require("./config/passport")(passport);       //uncomment it after set passport authentication

// Initialize passport for use
app.use(passport.initialize());
app.use(passport.session());


// app.use("/api", apiRoutes);
app.use("/api/admin", adminRoutes);

app.use("/", (req, res) => {
  res.json({
    IsSuccess: true,

  });
});



// Port Set
const port = process.env.PORT || 3000;
server.listen(port, () => {
  console.log(`started on port: ${port}`);
});