import FormItem from 'pages/home/components/formItem';

export default function FFFForm(props) {
    const {
        googleFormData: { info, items },
        submitForm,
    } = props;
    const { description, title, responderUri } = info;
    const formItemsHtml = items.map((item, i) => (
        <FormItem item={item} i={i} itemId={item.itemId} />
    ));
    return (
        <>
            <div>{title}</div>
            <div>{description}</div>
            <form
                method="post"
                id="fffForm"
                action={responderUri}
                onSubmit={submitForm}
                className="fffForm"
            >
                {formItemsHtml}
                <button type="submit" value="Submit" style={{ margin: '10px' }}>
                    Submit
                </button>
            </form>
        </>
    );
}
