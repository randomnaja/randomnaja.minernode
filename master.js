var assert = require('assert');
 var superchild = require('superchild');
 var child = superchild('node echo.js');
 console.log('Start child process');
child.on('stdout_line', function(line) {
    console.log('[stdout]: ', line);
  });
child.on('stderr_data', function(dataStr) {
    console.log('[stderr]: ', dataStr);
  });

console.log(JSON.stringify({
some: 'data'
}))

 child.send({
   some: 'data',
 });

 child.on('json_object', function(jsonObj) {
   console.log('on json_object ' + jsonObj)
   //assert.equal(jsonObj.some, 'data');
 });
