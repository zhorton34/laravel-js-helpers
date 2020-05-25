'use strict';

module.exports = (it, expect, { rules, messages }) => {
	it('should have the same message keys as rules keys', () =>
	{
		expect(Object.keys(rules).sort()).to.eql(Object.keys(messages).sort());
	});
};
