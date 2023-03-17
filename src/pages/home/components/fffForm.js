import FormItem from 'pages/home/components/formItem';

import MD from 'helpers/simpleMarkdown';

export default function FFFForm(props) {
    const {
        googleFormData: { info, items },
        submitForm,
    } = props;
    const { description, title, responderUri } = info;
    const titleAndDescriptionHtml = (
        <div className="formItem">
            <span className="formTitle">{title}</span>
            <p className="formDescription">
                <MD formItemText={description} />
            </p>
        </div>
    );
    // const descriptionHtml = (
    //     <div className="formItem">
    //         <p className="formDescription">{description}</p>
    //     </div>
    // );
    const formItemsHtml = items.map((item, i) => <FormItem item={item} i={i} />);
    return (
        <>
            {titleAndDescriptionHtml}
            <form method="post" id="fffForm" action={responderUri} onSubmit={submitForm}>
                {formItemsHtml}
                <button type="submit" value="Submit" style={{ margin: '10px' }}>
                    Submit
                </button>
            </form>
        </>
    );
}
