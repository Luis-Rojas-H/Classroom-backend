const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('passport');

const lib = require('./Test/TestData/Users');

// Iniciamos Express
const app = express();

//settings
app.set('port', process.env.PORT || 5000);
app.use(cors({ origin: "http://localhost:3000", credentials: true })); // <-- modificado para conectar con react

//middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(session({ 
  secret: "mysecretsession", 
  resave: true, 
  saveUninitialized: true
})
);
app.use(passport.initialize());
app.use(passport.session());
require('./Passport/passportConfig');

//RUTAS
const userRoutes = require('./Routes/User/userRoute');
const courseRoutes = require('./Routes/Course/courseRoute');
const homeworkRoutes = require('./Routes/Homework/homeworkRoute');
const announcementRoutes = require('./Routes/Announcement/announcementRoute');
const examRoutes = require('./Routes/Exam/examRoute');

app.use('/api/user', userRoutes);
app.use('/api/course', courseRoutes);
app.use('/api/homework', homeworkRoutes);
app.use('/api/announcement', announcementRoutes);
app.use('/api/exam', examRoutes);

// //settings2
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser("secretcode"));


// //Agregado*****************************
// const authRoutes = require('./Routes/Auth-routes/auth-routes');
// const passportSetup = require('../config/passport-setup')
// const keys = require('../config/keys')
// const cookieSession = require('cookie-session')
// // set view engine
// app.set('view engine', 'ejs');
// // usando Cookies
// app.use(cookieSession({
//   maxAge: 24*60*60*1000,
//   keys: [keys.session.cookieKey]
// }))
// //*****************************






// //Agregado**********************
// // set up routes
// app.use('/auth', authRoutes);

// // create home route
// app.get('/', (req, res) => {
//     res.render('home');
// });
// //*****************************


//DATABASE
mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://hasser:eo8ENRtR8lnASuv8@cluster0.9awkq.mongodb.net/classroom', { useNewUrlParser: true }).then(db => console.log('db is connected')).catch(err => console.log(err));

//start server
app.listen(app.get('port'), () => {
  // try { lib.createUsers(); } catch (e) { console.log(e) }

  //  console.log('server on port',app.get('port'));
  //  cron.schedule('*/1 * * * *', () => {
  //     lib.getData();
  //      console.log("Running task");
  //   });


});