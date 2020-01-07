

/**
 * @description Conver camelCase to Sentense, Ex: 'currentlyReading' to 'Currently Reading'
 * @param {string} shelftype
 */
export const getSentense = (camelCaseWord) => {
	if (!camelCaseWord) return;
	const isUpper = (ch) => {
		if (ch >= 'A' && ch <= 'Z') {
			return true;
		} else if (ch >= 'a' && ch <= 'z') {
			return false;
		}
	}
	let str = "";
	for (let chr of camelCaseWord) {
		if (isUpper(chr)) {
			str += " " + chr
		} else {
			str += chr;
		}
	}
	return str.replace(str[0], str[0].toUpperCase());
};


export const noop = () => { };