// routes.js
const express = require('express');
const router = express.Router();
const { theQuotes } = require('../data/data');

// middleware to check if user is authenticated
// function isAuthenticated(req, res, next) {
//     if (req.session.user) {
//         return next();
//     } else {
//         res.redirect('/login');
//     }
// }

// route to filter theQuotes data
router.get('/filter-quotes', (req, res) => {
    const { character, feelingNum } = req.query;
    let filteredQuotes = theQuotes;

    if (character) {
        filteredQuotes = filteredQuotes.filter(quote => quote.character.toLowerCase() === character.toLowerCase());
    }

    if (feelingNum) {
        filteredQuotes = filteredQuotes.filter(quote => quote.feelingNum === parseInt(feelingNum));
    }

    if (filteredQuotes.length === 0) {
        return res.status(404).json({ message: 'No quotes found matching the criteria.' });
    }

    res.json({ filteredQuotes });
});

// try --   http://localhost:1876/filter-quotes?character=Gilbert%20Blythe
//          http://localhost:1876/filter-quotes?feelingNum=7
//          http://localhost:1876/filter-quotes?character=Anne%20Shirley&feelingNum=7
 

router.get('/userLogin', (req, res) => {
    res.send(`<h1 style="color: #3a5b3a;">Sorry, this route is still under construction</h1>`);
});

router.get('/userDashboard', (req, res) => {
    res.send(`<h1 style="color: #3a5b3a;">Sorry, this route is still under construction</h1>`);
});

router.get('/register', (req, res) => {
    res.send(`<h1 style="color: #3a5b3a;">Sorry, this route is still under construction</h1>`);
});

// error-handling middle-earth catchall route for 404
router.use((req, res) => {
    res.status(404).send(`404 Error: The page ${req.originalUrl} isn't available. Please check the URL or come back later.`);
});





// router.get('/register', (req, res) => {
//     res.render('register');
// });

// router.post('/register', (req, res) => {
//     const { username, password } = req.body;
//     const userExists = users.some(u => u.username === username);
//     if (userExists) {
//         req.flash('error', 'Username already exists');
//         res.redirect('/register');
//     } else {
//         users.push({ username, password, role: 'user' });
//         req.flash('success', 'Registration successful');
//         res.redirect('/login');
//     }
// });

// router.get('/dashboard', isAuthenticated, (req, res) => {
//     res.render('dashboard', { user: req.session.user });
// });



module.exports = router;