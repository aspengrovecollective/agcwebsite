import Question from 'pages/home/components/question';

export default function FFFForm(props) {
    const { googleFormData, submitForm } = props;
    const { responderUri, items: questions } = googleFormData;
    const questionsHtml = questions.map((question, i) => (
        <Question question={question} i={i} key={question.name} />
    ));
    return (
        <form
            method="post"
            id="fffForm"
            action={responderUri}
            onSubmit={submitForm}
            className="fffForm"
        >
            {questionsHtml}
            <button type="submit" value="Submit" style={{ margin: '10px' }}>
                Submit
            </button>
        </form>
    );
}
