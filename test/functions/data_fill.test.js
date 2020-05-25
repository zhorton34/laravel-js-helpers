
'use strict';

const { data_fill } = require('../../dist/index.js');

module.exports = (it, expect) => {
	it('should fill nested data', () => {
		let family = {
			meta: { count: 3, last_name: 'horton' },
			members: [{ name: 'zak' }, { name: 'ash' }, { name: 'dre' }, { name: 'ezy' }]
		};

		expect(data_fill(family, 'meta.city', 'kc')).to.eql({
			meta: { count: 3, last_name: 'horton', city: 'kc' },
			members: [{ name: 'zak' }, { name: 'ash' }, { name: 'dre' }, { name: 'ezy' }]
		})
	});

	it("should only fill data if value isn't previously set'", () =>
	{
		let family = {
			meta: { count: 3, last_name: 'horton' },
			members: [{ name: 'zak' }, { name: 'ash' }, { name: 'dre' }, { name: 'ezy' }]
		};

		family = data_fill(family, 'members.0.name', 'sam');

		expect(family).to.eql({
			meta: { count: 3, last_name: 'horton' },
			members: [{ name: 'zak' }, { name: 'ash' }, { name: 'dre' }, { name: 'ezy' }]
		})
	});
};
