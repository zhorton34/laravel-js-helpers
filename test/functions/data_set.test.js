'use strict';

const { data_set } = require('../../dist/index.js');

module.exports = (it, expect) => {
	it('should set the nested data on an object overwriting previous value', () => {
		expect(
			data_set({
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
					brother: { name: 'tim' }
				}
			}
		})
	});

	it('should set the nested data on an object, filling in non existing first level value', () => {
		expect(
			data_set({
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
