
'use strict';

const { data_fill } = require('../../dist/index.js');

module.exports = (it, expect) => {
	it('should not set the nested data on an object when attempting to fill in a value at a location that already has a value', () => {
		expect(
			data_fill({
					family: {
						members: {
							brother: { name: 'sam' }
						}
					}
				}, 'family.members.brother.name',
				'tim'
			)
		).to.eql({
			family: {
				members: {
					brother: { name: 'sam' }
				}
			}
		})
	});

	it('should fill the nested data on an object if no value previously exists at the given location', () => {
		expect(
			data_fill({
					family: {
						members: {
							brother: { name: 'sam' }
						}
					}
				}, 'family.members.brother.email',
				'sam@gmail.com'
			)
		).to.eql({
			family: {
				members: {
					brother: { name: 'sam', email: 'sam@gmail.com' }
				}
			}
		})
	});
};
