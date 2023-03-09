const createError = require('http-errors');
const express = require('express');
const logger = require('morgan')
const path = require('path');
const getForm = require('./helpers/formsApiHelper');
// const cookieParser = require('cookie-parser')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'build')));
app.disable('etag');

app.get('/api/get-form', async (req, res) => {
    res.json(await getForm());
});
app.get('*', (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.sendFile('build/index.html', { root: __dirname });
});

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// TODO: Add your own error handler here.
if (process.env.NODE_ENV === 'production') {
    // Do not send stack trace of error message when in production
    app.use((err, req, res) => {
        res.status(err.status || 500);
        res.send('Error occurred while handling the request.');
    });
} else {
    // Log stack trace of error message while in development
    app.use((err, req, res) => {
        res.status(err.status || 500);
        console.log(err);
        res.send(err.message);
    });
}

module.exports = app;