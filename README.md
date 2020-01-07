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

const stateMachine = simpleState('init', states);

stateMachine.on('state-not-found', (name) => {
    console.error('state not found:', name);
})

stateMachine.on('before-next-state', (name) => {
    console.log(`before next state: ${name}`);
})

stateMachine.on('next-state', (name) => {
    console.log(`next state: ${name}`);
})

stateMachine.on('after-next-state', (name) => {
    console.log(`after next state: ${name}`);
})

stateMachine.on('before:next-state:init') => {
    console.log('before some kind of init');
})

stateMachine.on('next-state:init') => {
    console.log('some kind of init');
});

stateMachine.on('after:next-state:init') => {
    console.log('after some kind of init');
})

const {setNext} = stateMachine;

const [status, processName] = setNext('process');
// returns
[true, 'process']

const [status] = setNext('hello');
// returns
[false];

setNext('error');
// returns
[true, 'error']
```

## Related

- [zames](https://github.com/coderaiser/zames "zames") - converts callback-based functions to Promises and apply currying to arguments.

- [currify](https://github.com/coderaiser/currify "currify") - translate the evaluation of a function that takes multiple arguments into evaluating a sequence of functions, each with a single or more arguments.

- [fullstore](https://github.com/coderaiser/fullstore "fullstore") - functional variables.

## License

MIT

[NPMIMGURL]:                https://img.shields.io/npm/v/@cloudcmd/state.svg?style=flat
[BuildStatusIMGURL]:        https://img.shields.io/travis/coderaiser/state/master.svg?style=flat
[DependencyStatusIMGURL]:   https://img.shields.io/david/coderaiser/state.svg?style=flat
[LicenseIMGURL]:            https://img.shields.io/badge/license-MIT-317BF9.svg?style=flat
[NPMURL]:                   https://npmjs.org/package/@cloudcmd/state "npm"
[BuildStatusURL]:           https://travis-ci.org/coderaiser/state  "Build Status"
[DependencyStatusURL]:      https://david-dm.org/coderaiser/state "Dependency Status"
[LicenseURL]:               https://tldrlegal.com/license/mit-license "MIT License"

[CoverageURL]:              https://coveralls.io/github/coderaiser/state?branch=master
[CoverageIMGURL]:           https://coveralls.io/repos/coderaiser/state/badge.svg?branch=master&service=github

