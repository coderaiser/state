'use strict';

const test = require('supertape');
const tryCatch = require('try-catch');

const simpleState = require('..');

test('simple-state', (t) => {
    const setState = simpleState('init', {
        init: ['progress'],
        progress: ['ok', 'error'],
    });
    
    const result = setState('progress');
    
    t.equal(result, 'progress');
    t.end();
});

test('simple-state: error', (t) => {
    const [error] = tryCatch(simpleState, 'xx', {
        init: ['progress'],
        progress: ['ok', 'error'],
    });
    
    t.equal(error.message, 'Missing state: xx');
    t.end();
});

test('simple-state: state: error', (t) => {
    const setState = simpleState('init', {
        init: ['progress'],
        progress: ['ok', 'error'],
    });
    
    const [error] = tryCatch(setState, 'xx');
    
    t.equal(error.message, 'Wrong state: init -> xx');
    t.end();
});

