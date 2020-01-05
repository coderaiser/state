# State [![License][LicenseIMGURL]][LicenseURL] [![NPM version][NPMIMGURL]][NPMURL] [![Dependency Status][DependencyStatusIMGURL]][DependencyStatusURL] [![Build Status][BuildStatusIMGURL]][BuildStatusURL] [![Coverage Status][CoverageIMGURL]][CoverageURL]

Simplest possible state machine.

## Install

```
npm i @cloudcmd/state --save
```

## How to use?

```js
const simpleState = require('@cloudcmd/state');
const states = {
    'init': ['process'],
    'process': ['error', 'ok'],
    'error': [],
    'ok': [],
};

const nextState = simpleState('init', states);

nextState('process');
// returns
'process'

nextState('hello');
// throws
Error: Wrong state: process -> hello

nextState('error');
// returns
'error'

nextState('any');
// throws
Error: Wrong state: error -> hello
```

Works great with [try-catch](https://github.com/coderaiser/try-catch).

```js
const tryCatch = require('try-catch');
const nextState = simpleState('init', states);

const [error] = nextState('hello');

if (error)
    return console.error(`Can't set that state`);
```

## Related

- [zames](https://github.com/coderaiser/zames "zames") - converts callback-based functions to Promises and apply currying to arguments.

- [currify](https://github.com/coderaiser/currify "currify") - translate the evaluation of a function that takes multiple arguments into evaluating a sequence of functions, each with a single or more arguments.

- [fullstore](https://github.com/coderaiser/fullstore "fullstore") - functional variables.

## License

MIT

[NPMIMGURL]:                https://img.shields.io/npm/v/@cloudcmd/state.svg?style=flat
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/@cloudcmd/state/master.svg?style=flat
[DependencyStatusIMGURL]:   https://img.shields.io/david/coderaiser/@cloudcmd/state.svg?style=flat
[LicenseIMGURL]:            https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]:                   https://npmjs.org/package/@cloudcmd/state "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiserstate  "Build Status"
[DependencyStatusURL]:      https://david-dm.org/coderaiser/state "Dependency Status"
[LicenseURL]:               https://tldrlegal.com/license/mit-license "MIT License"

[CoverageURL]:              https://coveralls.io/github/coderaiser/@cloudcmd/state?branch=master
[CoverageIMGURL]:           https://coveralls.io/repos/coderaiser/@cloudcmd/state/badge.svg?branch=master&service=github

