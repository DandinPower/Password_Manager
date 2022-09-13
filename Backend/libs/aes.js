const aes256 = require('aes256');

let key = '891225'
var password = 'cs383838';
var encrypted = aes256.encrypt(key, password);
var decrypted = aes256.decrypt(key, encrypted);

console.log(encrypted)