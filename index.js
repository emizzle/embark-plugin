/**
 * @fileoverview Entry Point of Embark Plugin
 * @author Eric Mastro <ericmastro@status.im>
 */

"use strict";


module.exports = Embark => {

    Embark.events.on('outputDone', () => {
        Embark.events.emit('runcode:register', '_', require('lodash'), false);

        Embark.events.request("runcode:eval", "_.head(['a', 'b', 'c', 'd']);", (err, result) => {
            if(err) return console.log('========> error: ' + err);
            console.log('========> ' + result);
        });
    });

};
