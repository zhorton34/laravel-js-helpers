
'use strict';

const { Collection } = require('collect.js');



/**
 * Create a collection from the given value.
 *
 * @param  value
 * @return Collection
 */
module.exports.collect = function collect(value = null) {
    return new Collection(value);
};

/**
 * Determine if the given value is "blank".
 *
 * @param  value
 * @return bool
 */
module.exports.blank = function blank(value) {

    if (typeof value === 'undefined') {
    	return true;
    }

	if (value === null || value.trim() === '') {
		return true;
	}
	
	if (Array.isArray(value)) {
	   return value.length === 0;
	}

	if (typeof value === 'object') {
	   return Object.keys(value).length === 0;
    }

    if (typeof value === 'function') {
    	return false;
    }

    if (typeof value === 'boolean') {
    	return false;
    }

    return true;

}

/**
 * Return the default value of the given value.
 *
 * @param  value
 * @return
 */
module.exports.value = function value(value)
{
	return typeof value === 'function' ? value() : value;
}

/**
 * Determine if a value is "filled".
 *
 * @param  value
 * @return bool
 */
module.exports.filled = function filled(value)
{
    return ! blank(value);
}

/**
 * Set an item on an array or object using dot notation.
 *
 * @param  target
 * @param  path
 * @param  fallback
 * @return *
 */
module.exports.data_get = function data_get(target, path, fallback) {
	let segments = Array.isArray(path) ? path : path.split('.');
	let [segment] = segments;

	let find = target;

	if (segment !== '*' && segments.length > 0) {
		if (find[segment] === null || typeof find[segment] === 'undefined') {
			find = typeof fallback === 'function' ? fallback() : fallback;
		}
		else {
			find = data_get(find[segment], segments.slice(1), fallback);
		}
	}

	else if (segment === '*') {
		const partial = segments.slice(path.indexOf('*') + 1, path.length);

		if (typeof find === 'object') {
			find = Object.keys(find).reduce((build, property) => ({
					...build,
					[property]: data_get(find[property], partial, fallback)
				}),
			{});
		}
		else {
			find = data_get(find, partial, fallback);
		}
	}


	/*-----------------------------------------------------------------------------
	 |   Arrayable Requirements
	 *-----------------------------------------------------------------------------
	 |
	 |   . All arrays are converted to objects
	 |   . For Example
	 |      #Code
	 |        Code -> data_set({ list: ['one', 'two', 'three'], 'list.*', 'update', true });
	 |
	 |      #Input
	 |         Input -> { list: ['one', 'two', 'three'] }
	 |
	 |      #During We Convert Arrays To "Indexed Objects"
	 |         During -> { list: { '1': 'one', '2': 'two', '3': 'three' } }
	 |
	 |      #Before Output we convert "Indexed Objects" Back To Arrays
	 |         From -> { list: { '1': 'update', '2': 'update', '3': 'update' } }
	 |         Into -> { list: ['update', 'update', 'update'] }
	 |
	 |   . Arrays convert into "Indexed Objects", allowing for wildcard (*) capabilities
	 |   . "Indexed Objects" are converted back into arrays before returning the updated target
	 |
	 */
	if (typeof find === 'object') {
		if (Object.keys(find).length > 0) {
			const isArrayTransformable = Object.keys(find).every(index => index.match(/^(0|[1-9][0-9]*)$/));

			return isArrayTransformable ? Object.values(find) : find;
		}
	} else {
		return find;
	}
};

/**
 * Fill in data where it's missing.
 *
 * @param  target
 * @param  key
 * @param  value
 * @return mixed
 */
module.exports.data_fill = function data_fill(target, key, value) {
	return data_set(target, key, value, false);
};

/**
 * Set an item on an array or object using dot notation.
 *
 * @param  target
 * @param  path
 * @param  value
 * @param  force
 * @return *
 */
module.exports.data_set = function data_set(target, path, value, force = true) {
	let segments = Array.isArray(path) ? path : path.split('.');
	let [segment] = segments;

	if (segments.length === 0)
	{
		target = value;
	}
	else if (segments.length === 1 && !segments.includes('*'))
	{
		target[segment] = force ? value : target[segment] || value;
	}

	else if (segment !== '*') {
		if (!target[segment]) {
			target[segment] = {};

			target = data_set(target[segment], segments.slice(1), value, force);
		}

		let inner = data_set(target[segment], segments.slice(1), value, force);

		if (Array.isArray(target[segment])) {
			if (force && target[segment].length) {
				target[segment] = [ ...target[segment] ];
			} else {
				target[segment] = [ ...inner ];
			}
		} else {
			target[segment] = force ? { ...target[segment], ...inner } : { ...inner, ...target[segment] };
		}
	}

	else if (segment === '*') {
		const partial = segments.slice(path.indexOf('*') + 1, path.length);

		if (typeof target === 'object') {
			target = Object.keys(target).reduce((build, property) => ({
					...build,
					[property]: data_set(target[property], partial, value, force)
				}),
			{});
		}
		else {
			target = data_set(target, partial, value, force);
		}
	}


	/*-----------------------------------------------------------------------------
	 |   Arrayable Requirements
	 *-----------------------------------------------------------------------------
	 |
	 |   . All arrays are converted to objects
	 |   . For Example
	 |      #Code
	 |        Code -> data_set({ list: ['one', 'two', 'three'], 'list.*', 'update', true });
	 |
	 |      #Input
	 |         Input -> { list: ['one', 'two', 'three'] }
	 |
	 |      #During We Convert Arrays To "Indexed Objects"
	 |         During -> { list: { '1': 'one', '2': 'two', '3': 'three' } }
	 |
	 |      #Before Output we convert "Indexed Objects" Back To Arrays
	 |         From -> { list: { '1': 'update', '2': 'update', '3': 'update' } }
	 |         Into -> { list: ['update', 'update', 'update'] }
	 |
	 |   . Arrays convert into "Indexed Objects", allowing for wildcard (*) capabilities
	 |   . "Indexed Objects" are converted back into arrays before returning the updated target
	 |
	 */
	const arrayable = [
		typeof target === 'object',
		Object.keys(target).length,
		Object.keys(target).every(index => index.match(/^(0|[1-9][0-9]*)$/))
	];

	if (arrayable.every(requirement => requirement === true)) {
		return Object.values(target);
	}

	return target;
};

    /**
     * Transform the given value if it is present.
     *
     * @param  value
     * @param  callback
     * @param  default
     * @return mixed|null
     */
module.exports.transform = function transform(value, callback, original = null) {
    if (typeof callback !== 'function') {
    	return console.error("transform's 2nd parameter needs to be a callback");
    }

    if (filled(value)) {
        return callback(value);
    }

    if (typeof original === 'function') {
        return original(value);
    }

    return original;
};