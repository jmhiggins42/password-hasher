const hasher = require('./password.hasher');
require('colors');

if (process.argv.length !== 3) {
  console.error('Usage: node index <PASSWORD_TO_HASH>'.red);
  process.exit(1);
}

const cleartext = process.argv[2];

hasher(cleartext, (hash, salt) => {
  console.log('\n');
  console.log(
    ['Cleartext: '.blue + cleartext, 'Hashed password: '.green + hash, 'Salt: '.red + salt].join(
      '\n'
    )
  );
  console.log('\n');
  process.exit(0);
});
