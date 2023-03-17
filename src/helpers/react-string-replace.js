const React = require('react');

/* eslint-disable vars-on-top, no-var, prefer-template */
const isRegExp = (re) => re instanceof RegExp;
const escapeRegExp = (string) => {
    const reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
    const reHasRegExpChar = RegExp(reRegExpChar.source);

    return string && reHasRegExpChar.test(string) ? string.replace(reRegExpChar, '\\$&') : string;
};
const isString = (value) => typeof value === 'string';
const flatten = (array) => {
    let newArray = [];

    array.forEach((item) => {
        if (Array.isArray(item)) {
            newArray = newArray.concat(item);
        } else {
            newArray.push(item);
        }
    });

    return newArray;
};

/**
 * Given a string, replace every substring that is matched by the `match` regex
 * with the result of calling `fn` on matched substring. The result will be an
 * array with all odd indexed elements containing the replacements. The primary
 * use case is similar to using String.prototype.replace except for React.
 *
 * React will happily render an array as children of a react element, which
 * makes this approach very useful for tasks like surrounding certain text
 * within a string with react elements.
 *
 * Example:
 * matchReplace(
 *   'Emphasize all phone numbers like 884-555-4443.',
 *   /([\d|-]+)/g,
 *   (number, i) => <strong key={i}>{number}</strong>
 * );
 * // => ['Emphasize all phone numbers like ', <strong>884-555-4443</strong>, '.'
 *
 * @param {string} str
 * @param {RegExp|str} match Must contain a matching group
 * @param {function} fn
 * @return {array|string}
 */
const replaceString = (str, match, fn) => {
    var curCharStart = 0;
    var curCharLen = 0;

    if (str === '') {
        return str;
    }
    if (!str || !isString(str)) {
        throw new TypeError(
            'First argument to react-string-replace#replaceString must be a string'
        );
    }

    let re = match;

    if (!isRegExp(re)) {
        re = new RegExp('(' + escapeRegExp(re) + ')', 'gi');
    }

    var result = str.split(re);

    // Apply fn to all odd elements
    for (var i = 1, { length } = result; i < length; i += 2) {
        /** @see {@link https://github.com/iansinnott/react-string-replace/issues/74} */
        if (result[i] === undefined || result[i - 1] === undefined) {
            console.warn(
                'reactStringReplace: Encountered undefined value during string replacement. Your RegExp may not be working the way you expect.'
            );
        } else {
            curCharLen = result[i].length;
            curCharStart += result[i - 1].length;
            result[i] = fn(result[i], i, curCharStart);
            curCharStart += curCharLen;
        }
    }

    return result;
};

module.exports = function reactStringReplace(source, match, fn) {
    // eslint-disable-next-line no-param-reassign
    if (!Array.isArray(source)) source = [source];

    return flatten(
        source.map((x) => {
            if (React.isValidElement(x)) {
                const { props } = x;
                const { children } = props;
                delete props.children;
                const replacedChildren = reactStringReplace(children, match, fn);

                return React.createElement(x.type, props, replacedChildren);
            }
            return isString(x) ? replaceString(x, match, fn) : x;
        })
    );
};
