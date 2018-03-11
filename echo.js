var unlogger = require('superchild').unlogger;
console.log('[child] Child started');

 unlogger().on('json_object', function(jsonObj) {
   console.log('[child] got ' + jsonObj);
   // Echo JSON object from parent back to parent.
   console.log(JSON.stringify(jsonObj));
    //unlogger().send({some:'childdata'});
   //console.log(
 });
