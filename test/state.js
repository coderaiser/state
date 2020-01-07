'use strict';

const test = require('supertape');
const tryCatch = require('try-catch');

const simpleState = require('..');

test('simple-state', (t) => {
    const {setNext} = simpleState('init', {
        init: ['progress'],
        progress: ['ok', 'error'],
    });
    
    const [, result] = setNext('progress');
    
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
    const {setNext} = simpleState('init', {
        init: ['progress'],
        progress: ['ok', 'error'],
    });
    
    const [status] = setNext('xx');
    
    t.notOk(status);
    t.end();
});

test('simple-state: state: error: event', (t) => {
    const emitter = simpleState('init', {
        init: ['progress'],
        progress: ['ok', 'error'],
    });
    
    emitter.on('next-state', () => {
        t.fail('should not emit next-state');
        t.end();
    });
    
    emitter.on('state-not-found', () => {
        t.pass('should emit state not found');
        t.end();
    });
    
    emitter.setNext('abc');
});

test('simple-state: state: event', (t) => {
    const emitter = simpleState('init', {
        init: ['progress'],
        progress: ['ok', 'error'],
    });
    
    emitter.on('next-state', (name) => {
        t.equal(name, 'progress');
        t.end();
    });
    
    emitter.on('state-not-found', () => {
        t.fail('should not emit state not found');
        t.end();
    });
    
    emitter.setNext('progress');
});

test('simple-state: state: event: name', (t) => {
    const emitter = simpleState('init', {
        init: ['progress'],
        progress: ['ok', 'error'],
    });
    
    emitter.on('next-state:progress', () => {
        t.pass('should emit next-state:progress');
        t.end();
    });
    
    emitter.on('state-not-found', () => {
        t.fail('should not emit state not found');
        t.end();
    });
    
    emitter.setNext('progress');
});

test('simple-state: state: event: before:name', (t) => {
    const emitter = simpleState('init', {
        init: ['progress'],
        progress: ['ok', 'error'],
    });
    
    emitter.on('before-next-state:progress', () => {
        t.pass('should emit before-next-state:progress');
        t.end();
    });
    
    emitter.on('state-not-found', () => {
        t.fail('should not emit state not found');
        t.end();
    });
    
    emitter.setNext('progress');
});

test('simple-state: state: event: after:name', (t) => {
    const emitter = simpleState('init', {
        init: ['progress'],
        progress: ['ok', 'error'],
    });
    
    emitter.on('after-next-state:progress', () => {
        t.pass('should emit after-next-state:progress');
        t.end();
    });
    
    emitter.on('state-not-found', () => {
        t.fail('should not emit state not found');
        t.end();
    });
    
    emitter.setNext('progress');
});

test('simple-state: state: event: before', (t) => {
    const emitter = simpleState('init', {
        init: ['progress'],
        progress: ['ok', 'error'],
    });
    
    emitter.on('before-next-state', (name) => {
        t.ok(name, 'progress');
        t.end();
    });
    
    emitter.on('state-not-found', () => {
        t.fail('should not emit state not found');
        t.end();
    });
    
    emitter.setNext('progress');
});

test('simple-state: state: event: after', (t) => {
    const emitter = simpleState('init', {
        init: ['progress'],
        progress: ['ok', 'error'],
    });
    
    emitter.on('after-next-state', (name) => {
        t.ok(name, 'progress');
        t.end();
    });
    
    emitter.on('state-not-found', () => {
        t.fail('should not emit state not found');
        t.end();
    });
    
    emitter.setNext('progress');
});
