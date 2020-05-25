
# Laravel JS Helpers

---

> _"Laravel Helper Methods In Javascript"_


---

### Install

---

**Npm**
```
npm install laravel-js-helpers --save
```

**Yarn**
```
yarn add laravel-js-helpers
```

---

### Available Laravel Methods

---

- [Data Get](https://laravel.com/docs/7.x/helpers#method-data-get)
- [Data Set](https://laravel.com/docs/7.x/helpers#method-data-set)
- [Data Fill](https://laravel.com/docs/7.x/helpers#method-data-fill)
- [Blank](https://laravel.com/docs/7.x/helpers#method-blank)
- [Filled](https://laravel.com/docs/7.x/helpers#method-filled)
- [Transform](https://laravel.com/docs/7.x/helpers#method-transform)
- [Value](https://laravel.com/docs/7.x/helpers#method-value)
- [Collect (@See Collect.js Package)](https://laravel.com/docs/7.x/helpers#method-collect)
- **NOTE** _collect_ method uses [Collect.js](https://github.com/ecrmnn/collect.js/)

---

### Quick Overview

---

```js
const { data_get, data_set, data_fill } = require('laravel-js-helpers');


let family = {
	members: {
		brother: {
			age: 17,
			name: 'drew',
			hobbies: ['football', '"chillin"', 'video games']
		},
		sister: {
			age: 25,
			name: 'ash',
			hobbies: ['mothering babies', 'fitness', 'nutrition', '']
		},
		mother: {
			name: 'amy',
			age: 'thats not polite',
			hobbies: ['cleaning', 'nursing', 'hiking']
		},
		father: {
			age: 50,
			name: 'jon',
			hobbies: ['reading', 'sports', 'talking for seemingly ever', 'providing useful insights']
		},
	}
}

```

---

**Data Get**

---

```js
data_get(family, 'family.members.brother.name'); // "drew"

/** Wildcard Get **/
data_get(family, 'family.members.*.age'); // [17, 25, 'thats not polite', 50];
```

---

**Data Set**

---

```js
data_set(family, 'members.brother.age', 21);
data_set(family, 'members.brother.name', 'Everett');

/** Wildcard Set **/
data_set(family, 'members.*.last_name', 'Smith');
```
```
{
	members: {
		brother: {
			age: 21,
			name: 'Everett',
			last_name: 'Smith',
			hobbies: ['football', '"chillin"', 'video games']
		},
		sister: {
			age: 25,
			name: 'ash',
			last_name: 'Smith',
			hobbies: ['mothering babies', 'fitness', 'nutrition', '']
		},
		mother: {
			name: 'amy',
			last_name: 'Smith',
			age: 'thats not polite',
			hobbies: ['cleaning', 'nursing', 'hiking']
		},
		father: {
			age: 50,
			name: 'jon',
			last_name: 'Smith',
			hobbies: ['reading', 'sports', 'talking for seemingly ever', 'providing useful insights']
		},
	}
}
```

---

**Data Fill**

---
```js
data_fill(family, 'members.brother.age', 23); // wont do anything
data_fill(family, 'members.brother.name', 'Zak'); // wont do anything
data_fill(family, 'members.brother.birthday', 'April 22'); // will do something

/** Wildcard Fill **/
data_fill(family, 'members.*.last_name', 'Horton'); // wont do anything
data_fill(family, 'members.*.nickname', 'Hortonion'); // will do something

```
```
{
	members: {
		brother: {
			age: 21,
			name: 'Everett',
			last_name: 'Smith',
			birthday: 'April 22',
			nickname: 'Hortonion',
			hobbies: ['football', '"chillin"', 'video games']
		},
		sister: {
			age: 25,
			name: 'ash',
			last_name: 'Smith',
			nickname: 'Hortonion',
			hobbies: ['mothering babies', 'fitness', 'nutrition', '']
		},
		mother: {
			name: 'amy',
			last_name: 'Smith',
			nickname: 'Hortonion',
			age: 'thats not polite',
			hobbies: ['cleaning', 'nursing', 'hiking']
		},
		father: {
			age: 50,
			name: 'jon',
			last_name: 'Smith',
			nickname: 'Hortonion',
			hobbies: ['reading', 'sports', 'talking for seemingly ever', 'providing useful insights']
		},
	}
}

```


