'use strict';

module.exports = (it, expect, { docs, rules }) => {
	it('should have been documented...every rule should be documented', () => {
		expect(Object.keys(rules).sort()).to.eql(docs);
	})
};
