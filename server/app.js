const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const getForm = require('./helpers/formsApiHelper');
const { saveUrl } = require('./helpers/redisClient');
// const cookieParser = require('cookie-parser')

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, 'build')));
app.disable('etag');

app.get('/api/get-form', async (req, res) => {
    const keyPath = path.resolve(__dirname, 'private/agc-website-key.json');
    const form = await getForm(req, keyPath);
    res.json(form);
});

app.get('/api/save-url', async (req, res) => {
    const { url } = req.query;
    try {
        await saveUrl(url);
        res.json({ success: true });
    } catch (err) {
        res.json({ success: false });
    }
});

app.get('*', (req, res) => {
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
