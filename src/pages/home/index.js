import reactStringReplace from 'react-string-replace';

// @mui material components
// import Container from '@mui/material/Container';
// import Button from '@mui/material/Button';
// import Grid from '@mui/material/Grid';
// import Card from '@mui/material/Card';

// Material Kit 2 React components
import MKBox from 'components/MKBox';
// import MKTypography from 'components/MKTypography';
// import MKSocialButton from 'components/MKSocialButton';

// Material Kit 2 React examples
// import DefaultNavbar from 'examples/Navbars/DefaultNavbar';
// import DefaultFooter from 'examples/Footers/DefaultFooter';
// import FilledInfoCard from 'examples/Cards/InfoCards/FilledInfoCard';

// Presentation page sections
// import Counters from 'pages/Presentation/sections/Counters';
// import Information from 'pages/Presentation/sections/Information';
// import DesignBlocks from 'pages/Presentation/sections/DesignBlocks';
// import Pages from 'pages/Presentation/sections/Pages';
// import Testimonials from 'pages/Presentation/sections/Testimonials';
// import Download from 'pages/Presentation/sections/Download';

// Presentation page components
// import BuiltByDevelopers from 'pages/Presentation/components/BuiltByDevelopers';

// Routes
// import routes from 'routes';
// import footerRoutes from 'footer.routes';

// CSS
import 'assets/theme/style.css';

// Images
import logoImage from 'assets/images/logos/agc-logo.svg';
import { useEffect } from 'react';

// getForm
// import getForm from '../../helpers/formsApiHelper';

const fffFormConfig = require('../../config/fffFormConfig.json');

const formatQuestion = (questionText) => {
    const boldRegex = /__([^\n]+)__/gm;
    const italicRegex = /\*[^\n]+\*/gm;
    const boldQuestionText = reactStringReplace(questionText, boldRegex, (match) => <b>{match}</b>);
    const formattedQuestionText = reactStringReplace(boldQuestionText, italicRegex, (match) => (
        <i>{match}</i>
    ));
    return formattedQuestionText;
};

function Question(props) {
    const { question, i } = props;

    if (question.type === 'hidden') {
        return <input type={question.type} name={question.name} id={`fffInp${i}`} />;
    }

    question.text = formatQuestion(question.text);

    if (question.type === 'radio') {
        const options = question.options.map((option, i2) => {
            if (i2 === 0) {
                return (
                    <div className="options">
                        <input
                            type="radio"
                            name={question.name}
                            id={`fffInp${i}_${i2}`}
                            value={option}
                            required={question.required}
                        />
                        <label htmlFor={`fffInp${i}_${i2}`} style={{ marginLeft: '.75em' }}>
                            {option}
                        </label>
                    </div>
                );
            }
            return (
                <div className="options">
                    <input
                        type="radio"
                        name={question.name}
                        id={`fffInp${i}_${i2}`}
                        value={option}
                    />
                    <label htmlFor={`fffInp${i}_${i2}`} style={{ marginLeft: '.75em' }}>
                        {option}
                    </label>
                </div>
            );
        });
        if (question?.other?.enabled) {
            options.push(
                <div className="textInputWrapper options">
                    <input
                        type="radio"
                        name={question.name}
                        className="otherInputRadio"
                        id={`fffInp${i}_${options.length + 1}`}
                        value={`otherOption${i}`}
                    />
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor={`fffInp${i}_${options.length + 1}`} className="textInputLabel">
                        {question.other.text}
                    </label>
                    <div className="otherTextWrapper">
                        <input
                            type="text"
                            name={`otherOption${i}`}
                            className="textInput otherInputText"
                            id={`otherOption${i}`}
                            autoComplete="off"
                        />
                        <span className="bar barOther" />
                    </div>
                </div>
            );
        }
        return (
            <div className="question">
                <p>{question.text}</p>
                {options}
            </div>
        );
    }

    return (
        <div className="question">
            <div>
                <label htmlFor={`fffInp${i}`}>{question.text}</label>
            </div>
            <div className="textInputWrapper">
                <input
                    type={question.type}
                    name={question.name}
                    id={`fffInp${i}`}
                    className="textInput"
                    autoComplete="off"
                    required={question.required}
                    placeholder={question.placeholder ? question.placeholder : 'Your answer'}
                />
                <span className="bar" />
            </div>
        </div>
    );
}

function FFFForm() {
    const questions = fffFormConfig.questions.map((question, i) => (
        <Question question={question} i={i} key={question.name} />
    ));
    return (
        <form method="post" id="fffForm" action={fffFormConfig.actionUrl} className="fffForm">
            {questions}
            <button type="submit" value="Submit" style={{ margin: '10px' }}>
                Submit
            </button>
        </form>
    );
}

function Home() {
    // getForm();
    useEffect(() => {
        const form = document.querySelector('#fffForm'); // form element

        // populating input data
        const getInputData = function () {
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

        form.addEventListener('submit', (e) => {
            e.preventDefault();

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
        });
    });

    return (
        <>
            <MKBox minHeight="20vh" width="100%" style={{ padding: '10px' }}>
                <img
                    src={`${logoImage}`}
                    alt="Aspen Grove Collective Logo"
                    style={{
                        display: 'block',
                        maxWidth: '100%',
                        height: '30vh',
                        margin: '0 auto',
                    }}
                />
            </MKBox>
            <MKBox
                sx={{
                    display: 'block',
                    maxWidth: '100%',
                    margin: '0 auto',
                }}
            >
                <FFFForm />
            </MKBox>
        </>
    );
}

export default Home;
