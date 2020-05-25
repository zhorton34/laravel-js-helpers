[![Travis](https://img.shields.io/travis/zhorton34/laravel-js-helpers/master.svg?style=flat-square)](https://travis-ci.org/zhorton34/laravel-js-helpers/builds)
[![npm license](https://img.shields.io/npm/l/laravel-js-helpers.svg?style=flat-square)](http://badge.fury.io/js/laravel-js-helpers)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg?style=flat-square)](http://makeapullrequest.com)
[![dependencies](https://img.shields.io/badge/dependencies-none-brightgreen.svg?style=flat-square)](https://github.com/zhorton34/laravel-js-helpers/blob/master/package.json)
[![npm version](https://img.shields.io/npm/v/laravel-js-helpers.svg?style=flat-square)](http://badge.fury.io/js/laravel-js-helpers)
[![HitCount](http://hits.dwyl.com/zhorton34/laravel-js-helpers.svg)](http://hits.dwyl.com/zhorton34/laravel-js-helpers)
[![Open Source Love svg1](https://badges.frapsoft.com/os/v1/open-source.svg?v=103)](https://github.com/ellerbrock/open-source-badges/)
[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/Naereen/StrapDown.js/graphs/commit-activity)


---

# Laravel JS Helpers

---

> _"Laravel Helper Methods In Javascript"_

- [data_get, data_set, and data_fill for dot notation -- wildcards ("*") available -- deep object access](#playground-examples)
= [@See Laravel data_set, data_get, & data_fill docs (Powerful functions we've got in js now)](https://laravel.com/docs/7.x/helpers#method-data-fill)
- [@See Laravel Helper Functions](https://github.com/illuminate/support/blob/master/helpers.php)
- [@See Collect.js Collections (Utilized for our "collect" function)](https://github.com/ecrmnn/collect.js)


---

## <img src='https://api.github.com/images/icons/emoji/point_down.png' height="50" width='50' alt='coffee icon installation section title'/> Installation



### NPM

```bash
npm install --save-dev laravel-js-helpers
```

### Yarn

```bash
yarn add laravel-js-helpers --save
```

### CDN

```html
<script src='https://unpkg.com/laravel-js-helpers@latest/build/index.min.js'></script>
```


---

## Playground Examples

---
Curious, but not 100% on whether this is what you're looking for? 

- [Data Get With Wild Card](https://codepen.io/zhorton34/pen/jObRLdM)


---

## Utilization

---

---

**Data Get**

---

**Data Get Simple**
```js
data_get(family, 'family.members.brother.name');
```
**Data Get Output**
```
"drew"
```


**Data Get Wildcard**__("*")__
```js
data_get(family, 'family.members.*.age'); 
```

**Data Get Wildcard Output**
```
[17, 25, 'thats not polite', 50];
```

---

**Data Set**

---

**Data Set Simple**
```js
data_set(family, 'members.brother.age', 21);
data_set(family, 'members.brother.name', 'Everett');
```

**Data Set Wildcard**__("*")__
```js
data_set(family, 'members.*.last_name', 'Smith');
```

**Data Set Output**
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

**Data Fill Simple**
```js
data_fill(family, 'members.brother.age', 23); // wont do anything
data_fill(family, 'members.brother.name', 'Zak'); // wont do anything
data_fill(family, 'members.brother.birthday', 'April 22'); // will do something
```

**Data Fill Wildcard**__("*")__
```js 
data_fill(family, 'members.*.last_name', 'Horton'); // wont do anything
data_fill(family, 'members.*.nickname', 'Hortonion'); // will do something
```

**Data Fill Output**
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







---

## Contribute

---

PRs are welcomed to this project.
If you want to improve the laravel-js-helpers library, add
functionality or improve the docs please feel free to submit a PR.


---

## Security Vulnerabilities

---

If you discover a security vulnerability within Clean Code Studio Packages Or Specifically within 
laravel-js-helpers, please send an e-mail to Zachary Horton via zak@cleancode.studio. All security vulnerabilities will be promptly addressed.


---

## Change Log

---
- [Release 1.0.3 (Minor)](#release-103)
- [Release 1.0.2 (Major)](#release-102)
- [Release 1.0.1](#release-101)
- [Release 1.0.0](#release-100)



### Release 1.0.3

---


- CDN
- Tests
- Change Log
- Documentation
- Travis Continuous Build Integration


 

---

### Release 1.0.2

---

- data_get
- data_set
- data_fill
- transform
- value
- blank
- filled
- collect


---

### Release 1.0.1

---

- Initial Simple Documentation Setup

---

### Release 1.0.0

---

- Initial Setup


---

## Versioning

---

> Semantic Versioning

|Code Status|Stage|Rule|Example Version|
|---|---|---|---|
|First release|New Product|Start with 1.0.0|1.0.0|
|Backward compatible bug fixes|Patch Release|Increment the third digit|1.0.1|
|Backward compatible new features|Minor Release|Increment the middle digit and reset last digit to zero|1.1.0|
|Changes that break backward compatibility|Major Release|Increment the first digit and reset middle and last digits to zero|2.0.0|

- [Learn More About Semantic Versioning](https://docs.npmjs.com/about-semantic-versioning)


---

## License

---

MIT © [Zachary Horton (Clean Code Studio)](https://www.youtube.com/channel/UCq0m4ebGqurYQLwD-1aYsvg)
