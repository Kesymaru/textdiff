require('colors');
const Diff = require('diff');

function compare(textA, textB) {
    const diff = Diff.diffChars(textA, textB);

    const results = {
        same: diff.length === 1,
        differences: diff.length > 1 ? diff.length - 1 : 0,
        textDiff: diff.reduce((t, part) => {
            let color = part.added ? 'green' :
                part.removed ? 'red' : 'grey';
            return t + part.value[color];
        }, '')
        /*htmlDiff: diff.reduce((html, part) => {
            let color = part.added ? 'green' :
                part.removed ? 'red' : 'grey';
            return html += `<span style="color: ${color}">${part.value}</span>`;
        }, '')*/
    };

    // diff.forEach(part => console.log('part ->', part));

    let print = {...results};
    delete print.textDiff
    console.table(print);
}

const test1A = "hola mundo";
const test1B = "hola mundo test";
const test2A = "Special charts !@#$";
const test2B = "Special charts @!$#";
const test3A = "Same TeXt_!";
const test3B = "Same TeXt_!";

compare(test1A, test1B);
compare(test2A, test2B);
compare(test3A, test3B);
