const path = require('path');
const google = require('@googleapis/forms');
const fffFormConfig = require('../../src/config/fffFormConfig.json');

const getForm = async () => {
    const auth = new google.auth.GoogleAuth({
        keyFilename: path.resolve('private/agc-website-key.json'),
        scopes: ['https://www.googleapis.com/auth/forms.body.readonly'],
    });
    const authClient = await auth.getClient();

    const forms = await google.forms({
        version: 'v1',
        auth: authClient,
    });

    const res = await forms.forms.get({ formId: fffFormConfig.formId });

    return res.data;
};

module.exports = getForm;
