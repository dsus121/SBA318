const express = require('express');
const session = require('express-session');
const flash = require('connect-flash');
const app = express();

// initial data set for feelings
let feelingsData = [
    { name: 'Anne', feeling: 1, date: '2025-01-01' },
    { name: 'Gilbert', feeling: 2, date: '2025-01-02' },
    { name: 'Diana', feeling: 3, date: '2025-01-03' },
    { name: 'Katherine', feeling: 1, date: '2025-01-04' },
    { name: 'Marilla', feeling: 2, date: '2025-01-05' },
    { name: 'Matthew', feeling: 2, date: '2025-01-06' },
    { name: 'Rachel', feeling: 4, date: '2025-01-07' },   
    { name: 'Ruby', feeling: 5, date: '2025-01-08' },      
    { name: 'Miss Stacy', feeling: 6, date: '2025-01-09' }, 
    { name: 'Marilla', feeling: 7, date: '2025-01-10' }    
];

// admin credentials (for demo purposes)
const ADMIN_USERNAME = 'admin';
const ADMIN_PASSWORD = '1876'; 

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(flash());

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
    // simple hardcoded admin check 
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
        req.session.isAdmin = true;
        res.redirect('/admin');
    } else {
        req.flash('error', 'Invalid credentials');
        res.redirect('/login');
    }
});

// admin dashboard - admins only!
app.get('/admin', isAdmin, (req, res) => {
    res.render('admin', { feelingsData });
});

// POST route - add a new feeling
app.post('/submit', (req, res) => {
    const { name, feeling } = req.body;
    const date = new Date().toISOString().split('T')[0];
    feelingsData.push({ name, feeling: parseInt(feeling), date });
    res.redirect('/');
});

// DELETE route - delete a feeling (admin only)
app.post('/delete/:name', isAdmin, (req, res) => {
    const nameToDelete = req.params.name;
    feelingsData = feelingsData.filter(entry => entry.name !== nameToDelete);
    res.redirect('/admin');
});

// PATCH Route - update a feeling (admin only)
app.post('/update/:name', isAdmin, (req, res) => {
    const nameToUpdate = req.params.name;
    const { feeling } = req.body;
    feelingsData = feelingsData.map(entry => 
        entry.name === nameToUpdate ? { ...entry, feeling: parseInt(feeling) } : entry
    );
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
app.listen(1876, () => {
    console.log('Server running on http://localhost:1876');
});
