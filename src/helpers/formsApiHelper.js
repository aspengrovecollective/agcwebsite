const google = require('@googleapis/forms');
const fffFormConfig = require('../config/fffFormConfig.json');

export default getForm = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFilename: '../private/agc-website-373622-2d2c395346c1.json',
        // Scopes can be specified either as an array or as a single, space-delimited string.
        scopes: ['https://www.googleapis.com/auth/forms'],
    });
    const authClient = await auth.getClient();

    const forms = await google.forms({ fallback: true }).get({
        version: 'v1',
        auth: authClient,
    });

    const res = await forms.get({ formId: fffFormConfig.formId });

    console.log(res);

    return res.data;
};
