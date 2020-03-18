const express = require('express');
const session = require('express-session');
const path = require('path');
const pageRouter = require('./routes/pages');

var url = require('url');
var fs = require('fs');

const app = express();
const port = process.env.PORT || "8000";

app.use(express.urlencoded({ extended: false }));
app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));

app.use(session({
    secret: 'hotserved',
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 60 * 1000 * 30
    }
}));


app.use('/', pageRouter);


app.use((req, res, next) => {
    var err = new Error('Page not found');
    err.status = 404;
    next(err);
})
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send(err.message);
});

app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});

module.exports = app;