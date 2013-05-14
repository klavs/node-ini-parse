# Node .ini parse
## Installation
npm:

`npm install ini-parse`

## Description
Simple .ini parse with node.js(change for npm 'iniparser https://github.com/shockie/node-iniparser')

<pre>
var iniParse = require('ini-parse');
iniParse.parse('./test.ini', function(err,data){
	console.dir(data);
});

// parse sync 
var syncData = iniParse.parseSync('./test.ini');

// parse string ini format
var strData = iniParse.parseString('key=value');
</pre>


