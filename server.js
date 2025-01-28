const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const path = require('path');
const routes = require('./routes/routes');
const bodyParser = require('body-parser');

const { feelingsData, theQuotes, users } = require('./data/data');

require('dotenv').config();
const ADMIN_USERNAME = process.env.ADMIN_USERNAME;
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;


const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(flash());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));


// session setup for authentication
app.use(session({
    secret: 'supersecretkey', 
    resave: false,
    saveUninitialized: true
}));

// middleware to check if the user is an admin
function isAdmin(req, res, next) {
    if (req.session.isAdmin) {
        return next();
    }
    res.redirect('/login'); // redirect to login if not admin
}



// error-handling middleware ... i like the one in routes.js better
// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).send('Something went wrong! Please try again later.');
// });


// app.use((req, res, next) => {
//     res.locals.error = req.flash('error');
//     res.locals.success = req.flash('success');
//     next();
// });

app.use('/', routes);
// routes

// home route - display feelings data
app.get('/', (req, res) => {
    res.render('index', { feelingsData });
});

// login page
app.get('/login', (req, res) => {
    res.render('login', { messages: req.flash('error') });
});

// login POST - authenticate admin
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        req.session.isAdmin = true;
        res.redirect('/admin');
    } else {
        req.flash('error', 'Oh dear, it appears my digital key does not unlock this particular door. These credentials are most certainly insufficient for the task at hand.');
        res.redirect('/login');
    }
});

// admin dashboard - admins only!
app.get('/admin', isAdmin, (req, res) => {
    res.render('admin', { feelingsData });
});

// rendering the thankyou page
app.get('/thankyou', (req, res) => {
    res.render('thankyou');
});

// POST route - add a new feeling
app.post('/submit', (req, res) => {
    const { name, feeling } = req.body;
    const date = new Date().toISOString().split('T')[0];
    feelingsData.push({ name, feeling: parseInt(feeling), date });
    res.redirect('/thankyou');
});

// DELETE route - delete a feeling (admin only)
app.post('/delete/:name', isAdmin, (req, res) => {
    const nameToDelete = req.params.name;
    const index = feelingsData.findIndex(entry => entry.name === nameToDelete);
    if (index !== -1) {
        feelingsData.splice(index, 1);
    }
    res.redirect('/admin');
});

// PATCH Route - update a feeling (admin only)
app.post('/update/:name', isAdmin, (req, res) => {
    const nameToUpdate = req.params.name;
    const { feeling } = req.body;
    feelingsData.forEach(entry => {
        if (entry.name === nameToUpdate) {
            entry.feeling = parseInt(feeling);
        }
    });
    res.redirect('/admin');
});

// logout route - logout the admin
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.redirect('/');
        }
        res.redirect('/');
    });
});

// set the server to listen on port 1876 - the year Anne Shirley arrived in Avonlea
const PORT = process.env.PORT || 1876;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});