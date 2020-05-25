'use strict';

const { data_get } = require('../../dist/index.js');


module.exports = (it, expect) => {
	it('should get the nested data from an object', () => {
		expect(
			data_get({
					family: {
						members: {
							brother: { name: 'sam' }
						}
					}
				}, 'family.members.brother.name'
			)
		).to.eql('sam')
	});
};
