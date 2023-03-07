const fffFormConfig = require('config/fffFormConfig.json');

const submitForm = (e) => {
    e.preventDefault();

    const getInputData = () => {
        const dataToPost = new FormData();
        const formInputs = document.querySelectorAll('[id^=fffInp]');

        // fill name attributes to corresponding values
        formInputs.forEach((input) => {
            if (input.value.startsWith('otherOption') && input.checked) {
                const otherValue = document.getElementById(input.value).value;
                dataToPost.append(input.name, '__other_option__');
                dataToPost.append(`${input.name}.other_option_response`, otherValue);
            } else if (input.type === 'radio' && input.checked) {
                dataToPost.append(input.name, input.value);
            } else if (input.type !== 'radio') {
                dataToPost.append(input.name, input.value);
            } else {
                console.log(input.value);
            }
        });

        return dataToPost;
    };

    fetch(fffFormConfig.actionUrl, {
        method: 'POST',
        mode: 'no-cors',
        header: {
            'Content-Type': 'application/json',
        },
        body: getInputData(),
    })
        .then((data) => {
            console.log(data);
            alert('Form Submitted');
        })
        .catch((err) => console.error(err)); // promise based
};

module.exports = submitForm;
