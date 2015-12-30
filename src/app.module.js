require('./old/old.js')();
require('./home/app-home.module')();
require('./contacts/app-contacts.module')();

if (NODE_ENV === 'dev') {
  console.log('app loaded | mode: ' + NODE_ENV);
}

exports.NODE_ENV = NODE_ENV;