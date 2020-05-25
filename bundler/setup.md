---

## Setup

---

**Data Get, Data Set, & Data Fill (Simple & Wild Card Examples)**

---

### Node & Webpack Setup

---

```js
const { data_get, data_set, data_fill } = require('laravel-js-helpers');

let family = {
    members: {
        brother: { age: 17, name: 'drew', hobbies: ['football', '"chillin"', 'video games'] },
        sister: { age: 25, name: 'ash', hobbies: ['mothering babies', 'fitness', 'nutrition', ''] },
        mother: { name: 'amy', age: 'thats not polite', hobbies: ['cleaning', 'nursing', 'hiking'] },
        father: { age: 50, name: 'jon', hobbies: ['reading', 'sports', 'talking for seemingly ever', 'providing useful insights'] },
    }
};

data_get(family, 'members.*.name');
data_set(family, 'members.*.name', 'tyson');
data_fill(family, 'members.*.last_name', 'smith');

```

### CDN & Browser Setup

```html
<script src="https://unpkg.com/laravel-js-helpers@latest/build/index.min.js"></script>

<script>
    const { data_get, data_set, data_fill } = laravelJsHelpers;
    
    let family = {
        members: {
            brother: { age: 17, name: 'drew', hobbies: ['football', '"chillin"', 'video games'] },
            sister: { age: 25, name: 'ash', hobbies: ['mothering babies', 'fitness', 'nutrition', ''] },
            mother: { name: 'amy', age: 'thats not polite', hobbies: ['cleaning', 'nursing', 'hiking'] },
            father: { age: 50, name: 'jon', hobbies: ['reading', 'sports', 'talking for seemingly ever', 'providing useful insights'] },
        }
    };
    
    data_get(family, 'members.*.name');
    data_set(family, 'members.*.name', 'tyson');
    data_fill(family, 'members.*.last_name', 'smith');
</script>
```
