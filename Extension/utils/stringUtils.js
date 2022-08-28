exports.middleString = (str, left, right) => {
    if (!str || !left || !right) {
        return "";
    }

    const leftLength = left.length;
    const leftPtr = str.indexOf(left);
    const rightPtr = str.indexOf(right);

    return str.substring(leftPtr + leftLength,
        rightPtr == -1 ? Number.MAX_VALUE : rightPtr);
}