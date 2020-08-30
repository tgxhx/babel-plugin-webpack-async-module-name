# babel-plugin-webpack-async-module-name

> This plugin use custom identifier to named webpack dynamic import modules, supports single or multiple modules.

## Installation
``` shell
npm i -D babel-plugin-webpack-async-module-name
```

## Test
``` shell
npm run test
```

## Usage

Add the plugin to [babelrc](https://babeljs.io/docs/usage/babelrc/):
``` json
{
  "plugins": [
    "webpack-async-module-name"
  ]
}
```

Use in code:

``` javascript
importName('./a.js')

importName('./a.js', 'name-a')

importName(['./a.js', './b.js'])

importName(['./a.js', './b.js'], 'name-a-b')
```

It will be transformed to:

``` javascript
import('./a.js');

import( /*webpackChunkName: 'name-a'*/'./a.js');

Promise.all([import('./a.js'), import('./b.js')]);

Promise.all([import( /*webpackChunkName: 'name-a-b'*/'./a.js'), import( /*webpackChunkName: 'name-a-b'*/'./b.js')]);
```

## License
[MIT](https://opensource.org/licenses/mit-license.php)
