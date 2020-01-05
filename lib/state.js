'use strict';

module.exports = (current, states) => {
    if (!states[current])
        throw Error(`Missing state: ${current}`);
    
    return (next) => {
        const currentStates = states[current];
        
        if (!currentStates.includes(next))
            throw Error(`Wrong state: ${current} -> ${next}`);
        
        current = next;
        
        return current;
    };
};

