const sessionName = "Talha";
const owner = ["966541433942"];
const QRCode = require("qrcode");
const {
  default: sansekaiConnect,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  generateForwardMessageContent,
  prepareWAMessageMedia,
  generateWAMessageFromContent,
  generateMessageID,
  downloadContentFromMessage,
  makeInMemoryStore,
  jidDecode,
  proto,
  getContentType,
  makeWASocket,
  makeCacheableSignalKeyStore,
} = require("@whiskeysockets/baileys");
// require('./ws.js')
const connect = require("./mongo/index");
const CredsModels = require("./mongo/model/creds");
const express = require("express");
const path = require("path");
const app = express();
const {credsRoute} = require('./routes/index.js') 
require("dotenv").config();
const port = process.env.PORT || 3551;
const AllowedUsers = require("./mongo/model/allowed");
// Middleware to calculate and log the current URL
// app.use((req, res, next) => {
//   const fullUrl = `${req.protocol}://${req.get('host')}${req.originalUrl}`;
//   console.log('Current URL:', fullUrl);
//   setTimeout(async ()=>{
//    try {
//     await axios.get(`${req.protocol}://${req.get('host')}`)
//    } catch (error) {
//     console.log(' error ')
//    }
//   console.log('sended')
// },20000)
//   next(); // Move to the next middleware or route handler
// });
//  setInterval(async ()=>{
//    try {
//     await axios.get(`https://whatsapp-bot-new-bot-65c6e4e95b06.herokuapp.com/`)
//    } catch (error) {
//     console.log(' error ')
//    }

// },20000)
// Static file middleware

const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const isAuthenticated = require('./ middleware/auth.js');


app.use(express.json());
// Configure session management
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: false
}));

// Initialize Passport and session
app.use(passport.initialize());
app.use(passport.session());

// Define a simple user authentication strategy
passport.use(new LocalStrategy((username, password, done) => {
    // Replace with your user authentication logic
    if (username === 'adminfdsdfkls' && password === 'passwordfsddfsdfsdfs') {
        return done(null, { id: 1, username: 'admin' });
    }
    return done(null, false, { message: 'Incorrect credentials' });
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    // Replace with your user deserialization logic
    done(null, { id: 1, username: 'admin' });
});

// Your existing routes

// Protect specific routes
app.use('/admin.html', isAuthenticated, express.static(__dirname + '/public/admin.html'));
app.use('/creds.html', isAuthenticated, express.static(__dirname + '/public/creds.html'));

// Public routes


// Login route
app.get('/login', (req, res) => {
    res.sendFile(__dirname + '/public/login.html');
});

app.post('/login', passport.authenticate('local'), (req, res) => {
    res.json({ message: 'Login successful' });
});

// Error handling for unauthorized access
app.use((err, req, res, next) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Invalid token');
    } else {
        next(err);
    }
});

app.use(express.static("./public"));

app.use('/api/v1/creds',credsRoute)
app.get("/check", (req, res) => {
  res.json({ res: "hi, I am a bot" }).status(200);
});
app.get("/files/:id",isAuthenticated, (req, res) => {
  const { id } = req.params;
  res.sendFile(path.join(__dirname, `./files/${id}`));
});

app.post("/api/v1/creds/remove",isAuthenticated, async (req, res) => {
  try {
    const { name } = req.body;
    if (!name)
      return res
        .json({ status: "failed", data: "Please provide number" })
        .status(400);
    await CredsModels.deleteOne({ _id: name });
    res.json({ status: "success", data: req.body });
  } catch (error) {
    res.json({ status: "failed" }).status(500);
  }
});
app.get("/api/v1/creds/users",isAuthenticated, async (req, res) => {
  try {
    const Users = await CredsModels.find({});
    //  console.log(Users)
    res.json({ Users, status: "success" });
  } catch (error) {
    res.json({ status: "failed" }).status(500);
  }
});
// app.post('/api/v1/creds/login',async (req,res)=>{
//   // console.log(req.body)
//   const {number} = req.body;
//    const id = '92'+ number.substr(1) + '@s.whatsapp.net'
//   // await AllowedUsers.create({id:})
//   if(!number){
//     return   res.json({status:'failed',data:'Please write number'}).status(400)

//   }
//   await AllowedUsers.create({id:id})
//   res.json({status:'success',data:id}).status(201)
// })

app.post("/api/v1/remove",isAuthenticated, async (req, res) => {
  try {
    const { number } = req.body;
    if (!number)
      return res
        .json({ status: "failed", data: "Please provide number" })
        .status(400);
    await AllowedUsers.deleteOne({ id: number });
    res.json({ status: "success", data: req.body });
  } catch (error) {
    res.json({ status: "failed" }).status(500);
  }
});
app.get("/api/v1/users",isAuthenticated, async (req, res) => {
  try {
    const Users = await AllowedUsers.find({});
    //  console.log(Users)
    res.json({ Users, status: "success" });
  } catch (error) {
    res.json({ status: "failed" }).status(500);
  }
});
app.post("/api/v1/login", async (req, res) => {
  // console.log(req.body)
  const { number } = req.body;
  const id = "92" + number.substr(1) + "@s.whatsapp.net";
  // await AllowedUsers.create({id:})
  if (!number) {
    return res
      .json({ status: "failed", data: "Please write number" })
      .status(400);
  }
  await AllowedUsers.create({ id: id });
  res.json({ status: "success", data: id }).status(201);
});
app.use((err, req, res, next) => {
  console.log("Express Error;");
  console.log(err);
  res.send({ status: "failed", data: err.message }).status(500);
});
const server = app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
require("./ws.js")(server);
const axios = require("axios");
const activate = require('./activate-user.js') 
setInterval(async () => {
  try {
    await axios.get(process.env.URL);
  } catch (error) {}
}, 20000);
// setInterval(async () => {
//   try {
//     require("./testnew.js")();
//   } catch (error) {}
// }, 61000);
const func = async () => {
  const FileType = await import("file-type");

  const pino = require("pino");
  const { Boom } = require("@hapi/boom");
  const fs = require("fs");
  const axios = require("axios");
  const chalk = require("chalk");
  const figlet = require("figlet");
  const _ = require("lodash");
  const PhoneNumber = require("awesome-phonenumber");
  const logger = pino().child({ level: "silent", stream: "store" });

  const users = await CredsModels.find({});
  // const obj = {
  //   name: "Talh2a",
  //   creds: JSON.parse(
  //     fs.readFileSync("./Configs/Talh2a/creds.json", { encoding: "utf-8" })
  //   ),
  // };
  // console.log(obj);
  // const users = [obj];

  // console.log(users.length);
  // console.log(users);
  // const users = [{ name: "Talha", creds: "" }];

  for (user of users) {
    activate(user)
  
  }
};
const start = async () => {
  try {
    await connect();
    console.log("conencted to DB");
    func();
  } catch (err) {
    console.log(err);
  }
};
start();
