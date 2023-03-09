import reactStringReplace from 'react-string-replace';

const formatFormItem = (formItemText) => {
    const boldRegex = /__([^\n]+)__/gm;
    const italicRegex = /\*[^\n]+\*/gm;
    const boldFormItemText = reactStringReplace(formItemText, boldRegex, (match) => <b>{match}</b>);
    const formattedFormItemText = reactStringReplace(boldFormItemText, italicRegex, (match) => (
        <i>{match}</i>
    ));
    return formattedFormItemText;
};

export default function FormItem(props) {
    const { item, i } = props;

    if (item.type === 'hidden') {
        return <input type={item.type} name={item.name} id={`fffInp${i}`} />;
    }

    item.text = formatFormItem(item.text);

    if (item.type === 'radio') {
        const options = item.options.map((option, i2) => {
            if (i2 === 0) {
                return (
                    <div className="options">
                        <input
                            type="radio"
                            name={item.name}
                            id={`fffInp${i}_${i2}`}
                            value={option}
                            required={item.required}
                        />
                        <label htmlFor={`fffInp${i}_${i2}`} style={{ marginLeft: '.75em' }}>
                            {option}
                        </label>
                    </div>
                );
            }
            return (
                <div className="options">
                    <input type="radio" name={item.name} id={`fffInp${i}_${i2}`} value={option} />
                    <label htmlFor={`fffInp${i}_${i2}`} style={{ marginLeft: '.75em' }}>
                        {option}
                    </label>
                </div>
            );
        });
        if (item?.other?.enabled) {
            options.push(
                <div className="textInputWrapper options">
                    <input
                        type="radio"
                        name={item.name}
                        className="otherInputRadio"
                        id={`fffInp${i}_${options.length + 1}`}
                        value={`otherOption${i}`}
                    />
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor={`fffInp${i}_${options.length + 1}`} className="textInputLabel">
                        {item.other.text}
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
            <div className="formItem">
                <p>{item.text}</p>
                {options}
            </div>
        );
    }

    return (
        <div className="formItem">
            <div>
                <label htmlFor={`fffInp${i}`}>{item.title}</label>
            </div>
            <div className="textInputWrapper">
                <input
                    type="text"
                    name={item.itemId}
                    id={`fffInp${i}`}
                    className="textInput"
                    autoComplete="off"
                    required="false"
                    placeholder={item.placeholder ? item.placeholder : 'Your answer'}
                />
                <span className="bar" />
            </div>
        </div>
    );
}
