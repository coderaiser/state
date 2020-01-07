'use strict';

const emitify = require('emitify');

module.exports = (current, states) => {
    if (!states[current])
        throw Error(`Missing state: ${current}`);
    
    const emitter = emitify();
    
    const setNext = (next) => {
        const currentStates = states[current];
        
        if (!currentStates.includes(next)) {
            emitter.emit('state-not-found', next);
            return [false];
        }
        
        emitter.emit('before-next-state', next);
        emitter.emit(`before-next-state:${next}`);
        
        current = next;
        
        emitter.emit('after-next-state', next);
        emitter.emit(`after-next-state:${next}`);
        
        emitter.emit('next-state', next);
        emitter.emit(`next-state:${next}`);
        
        return [true, current];
    };
    
    emitter.setNext = setNext;
    
    return emitter;
};

