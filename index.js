/**
 * @fileoverview Entry Point of Embark Plugin
 * @author Eric Mastro <ericmastro@status.im>
 */

"use strict";


module.exports = Embark => {

  Embark.events.on('outputDone', () => {
    Embark.events.emit('runcode:register', '_', require('lodash'), false, () => {
      Embark.events.request("runcode:eval", "_.head(['a', 'b', 'c', 'd']);", (err, result) => {
        if (err) return console.error('========> error: ' + err);
        console.log('========> ' + result);
      });
    });
  });

  Embark.events.on('runcode:ready', () => {
    Embark.events.emit('runcode:register', 'generateClass', require('eth-contract-class'), false);

    Embark.registerCustomContractGenerator(contract => {
      return `
        ${contract.className} = generateClass(${JSON.stringify(contract.abiDefinition)}, '${contract.code}');
        ${contract.className}Instance = new ${contract.className}(web3, '${contract.deployedAddress}');
        `;
    });
  });
  Embark.events.once('contracts:deploy:afterAll', () => {
    Embark.events.request('runcode:eval', 'SimpleStorageInstance', (err, SimpleStorageInstance) => {
      if(err) return console.error(err);
      SimpleStorageInstance.get().then((result) => {
        console.log(`=====> SimpleStorageInstance.get(): ${result}`);
      });
    });
  });
};
