const fs = require('fs');
const path = require('path');
const {NodeSSH} = require('node-ssh');
const ssh = new NodeSSH();
 
// Para o deploy na AWS (WEB):
// 1 - Tem que mudar para branch master
// 2 - Rodar o yarn e gerar o build local
// 3 - Upar esse build na nuvem (CDN? Cloudfront? como?)
// 4 - Conectar no servidor AWS
// 5 - Entrar na pasta configurada e baixar o arquivo do build local
// 6 - Feito!

console.log(process.env);

// ssh.connect({
//   host: 'criatech.me',
//   username: 'criatech',
//   password: 'criatechpnz77',
// //   privateKey: '/home/steel/.ssh/id_rsa'
// }).then(function() {
//     console.log('Connected');
// });
