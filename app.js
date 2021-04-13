const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const path = require('path');
const cookieParser = require('cookie-parser');

const app = express();

// const addspRoutes = require('./routes/add-sp.routes');
const homespRoutes = require('./routes/index-sp.routes');
const {getHomePage} = require('./controllers/homesp.controller');
const {getMemberPage} = require('./controllers/home-member.controller');
const {addPlayerPage, addPlayer, deletePlayer, editPlayer, editPlayerPage} = require('./controllers/add-sp.controller');
const {addMemberPage, addMember, deleteMember, editMember, editMemberPage} = require('./controllers/add-member.controller');
const {getLogin, postLogin} = require('./routes/login');
const validate = require('./validate/user.validate');
const {getLogout} = require('./routes/logout');

const port = 8000;


const db = mysql.createConnection ({
    host: 'localhost',
    user: 'root',
    password: null,
    database: 'quanlychdientu'
});


// connect to database
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Connected to database');
});
global.db = db;

// configure middleware
app.set('port', process.env.port || port); // set express to use this port
app.set('views', __dirname + '/views'); // set express to look in this folder to render our view
app.set('view engine', 'ejs'); // configure template engine
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json()); // parse form data client
app.use(express.static(path.join(__dirname, 'public'))); // configure express to use public folder
app.use(fileUpload()); // configure fileupload
app.use(cookieParser());


app.get('/login', getLogin);
app.post('/login', postLogin)
app.use(validate.postLogin);
// app.use('/', homespRoutes);

app.get('/', getHomePage);
app.get('/add', addPlayerPage);
app.get('/edit/:masp', editPlayerPage);
app.get('/delete/:masp', deletePlayer);
app.get('/logout', getLogout);

app.post('/add', addPlayer);
app.post('/edit/:masp', editPlayer);

app.get('/homemb', getMemberPage);
app.get('/addmb', addMemberPage);
app.get('/editmb/:mamb', editMemberPage);
app.get('/deletemb/:mamb', deleteMember);

app.post('/addmb', addMember);
app.post('/editmb/:mamb', editMember);




// app.use('/',homespRoutes);
// app.use('/search',homespRoutes);
// app.use('/addsp', addspRoutes);
app.get('*', function(req, res, next){
    res.status(404);

    res.render('404.ejs', {
        title: "Page Not Found",
    });

});


// set the app to listen on the port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});