import reactStringReplace from 'react-string-replace';

const formatQuestion = (questionText) => {
    const boldRegex = /__([^\n]+)__/gm;
    const italicRegex = /\*[^\n]+\*/gm;
    const boldQuestionText = reactStringReplace(questionText, boldRegex, (match) => <b>{match}</b>);
    const formattedQuestionText = reactStringReplace(boldQuestionText, italicRegex, (match) => (
        <i>{match}</i>
    ));
    return formattedQuestionText;
};

export default function Question(props) {
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
