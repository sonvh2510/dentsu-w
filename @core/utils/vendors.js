const { readFileSync } = require('fs');

exports.readVendors = (url) => {
	return JSON.parse(readFileSync(url));
};
