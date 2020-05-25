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





