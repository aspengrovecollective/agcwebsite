const createError = require('http-errors');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const getForm = require('./helpers/formsApiHelper');
const {
    buildRefCodeAsync,
    getRefCodeAsync,
    updateRefCodeCountAsync,
} = require('./helpers/redisClient');
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

app.post('/api/build-ref-code', async (req, res) => {
    const { url } = req.body;
    try {
        let refCode = await getRefCodeAsync(url);
        // check is ref codes are empty
        if (refCode === null) {
            refCode = await buildRefCodeAsync(url);
            console.log(`Generated a reference code for URL: ${url}`);
        } else {
            console.log(`A reference code has already been generated for URL: ${url}`);
        }
        res.json({ success: true, result: refCode });
    } catch (err) {
        console.error(err);
        res.json({ success: false });
    }
});

app.put('/api/update-ref-code-count', async (req, res) => {
    const { url } = req.body;
    try {
        const result = await updateRefCodeCountAsync(url);

        if (result === null) {
            console.warn(`No reference code found for URL: ${url}`);
            res.json({ success: false });
            return;
        }

        console.log(`Updated the reference code count for URL: ${url}`);
        res.json({ success: true, result });
    } catch (err) {
        console.error(err);
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
