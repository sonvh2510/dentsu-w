const del = require('del');

const clean = (folder) => del(folder);

module.exports = {
	clean,
};
