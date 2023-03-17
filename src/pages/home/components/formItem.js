import MD from 'helpers/simpleMarkdown';

export default function FormItem(props) {
    const { item, i } = props;
    const itemTitle = <MD formItemText={item.title} />;
    let inputId = `fffInp${i}`;

    if (item.imageItem) {
        const { image } = item.imageItem;
        return (
            <div className="formItem">
                <div>
                    <p>
                        <MD formItemText={itemTitle} />
                    </p>
                </div>
                <div className="formImageWrapper">
                    <img
                        src={image.contentUri}
                        alt={image.altText}
                        align={image.properties.alignment.toLowerCase()}
                        width={`${image.properties.width}px`}
                    />
                </div>
            </div>
        );
    }

    if (item.questionItem) {
        const { question } = item.questionItem;
        if (question.choiceQuestion) {
            const { options: itemOptions } = question.choiceQuestion;
            if (question.choiceQuestion.type === 'RADIO') {
                const options = itemOptions.map((option, i2) => {
                    inputId = `fffInp${i}_${i2}`;
                    if (i2 === 0) {
                        return (
                            <div className="options">
                                <input
                                    type="radio"
                                    name={item.itemId}
                                    id={inputId}
                                    value={option.value}
                                    required={Boolean(question.required)}
                                />
                                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                <label htmlFor={inputId} style={{ marginLeft: '.75em' }}>
                                    <MD formItemText={option.value} />
                                </label>
                            </div>
                        );
                    }
                    if (option.isOther) {
                        return (
                            <div className="textInputWrapper options">
                                <input
                                    type="radio"
                                    name={item.itemId}
                                    className="otherInputRadio"
                                    id={inputId}
                                    value={`otherOption${i}`}
                                />
                                {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                                <label htmlFor={inputId} className="textInputLabel">
                                    Other:
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
                        <div className="options">
                            <input
                                type="radio"
                                name={item.itemId}
                                id={inputId}
                                value={option.value}
                            />
                            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                            <label htmlFor={inputId} style={{ marginLeft: '.75em' }}>
                                <MD formItemText={option.value} />
                            </label>
                        </div>
                    );
                });
                return (
                    <div className="formItem">
                        <p>
                            <MD formItemText={itemTitle} />
                        </p>
                        {options}
                    </div>
                );
            }
        }

        if (question.textQuestion) {
            return (
                <div className="formItem">
                    <div>
                        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                        <label htmlFor={inputId}>
                            <MD formItemText={itemTitle} />
                        </label>
                    </div>
                    <div className="textInputWrapper">
                        <input
                            type="text"
                            name={item.itemId}
                            id={inputId}
                            className="textInput"
                            autoComplete="off"
                            required={false}
                            placeholder={item.placeholder ? item.placeholder : 'Your answer'}
                        />
                        <span className="bar" />
                    </div>
                </div>
            );
        }
    }
}
