const google = require('@googleapis/forms');

const getForm = async (req, keyPath) => {
    const auth = new google.auth.GoogleAuth({
        keyFilename: keyPath,
        scopes: ['https://www.googleapis.com/auth/forms.body.readonly'],
    });
    const authClient = await auth.getClient();

    const forms = await google.forms({
        version: 'v1',
        auth: authClient,
    });
    const { formId } = req.query;
    const res = await forms.forms.get({ formId });

    return res.data;
};

module.exports = getForm;
