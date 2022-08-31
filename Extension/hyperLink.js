const formatTable = {
    'markdown': '[{title}]({url})\n',
    'html': '<a href="{url}">{title}</a>\n',
    'latex': '\\href{{url}}{{title}}\n'
}

/**
 * 
 * @param {string} languageId 
 * @param {string} title 
 * @param {string} url 
 * @returns {string}
 */
exports.getHyperLinkByLanguage = (languageId, title, url) => {
    let formatString = formatTable[languageId];

    if (!formatString) {
        return false;
    }

    formatString = formatString.replace('{title}', title);
    formatString = formatString.replace('{url}', url);

    return formatString;
}

/**
 * 
 * @returns {string[]}
 */
exports.getSupportedLangeage = () =>
    Object.keys(formatTable);