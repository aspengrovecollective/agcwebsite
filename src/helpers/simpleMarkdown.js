import reactStringReplace from 'helpers/react-string-replace';

export default function MD({ formItemText }) {
    let i = 0;
    const boldRegex = /\*\*(.+?)\*\*(?!\*)/g;
    const ulRegex = /\*([^*><]+)\*/gm;
    const newlineRegex = /\n/g;
    const boldFormItemText = reactStringReplace(formItemText, boldRegex, (match) => {
        i += 1;
        return <b key={`b${i}`}>{match}</b>;
    });
    const boldUlItemText = reactStringReplace(boldFormItemText, ulRegex, (match) => {
        i += 1;
        return <u key={`u${i}`}>{match}</u>;
    });
    const formattedFormItemText = reactStringReplace(boldUlItemText, newlineRegex, () => {
        i += 1;
        return <br key={`br${i}`} />;
    });
    // const formattedFormItemTextWithKeys = formattedFormItemText.forEach((component, i) => {
    //     component.key = i.toString();
    // });
    const safeFormattedFormItemText = formattedFormItemText.map((el) => {
        if (typeof el === 'string') return <span key={`span-${el.slice(0, 6)}`}>{el}</span>;
        return el;
    });
    return safeFormattedFormItemText;
}
