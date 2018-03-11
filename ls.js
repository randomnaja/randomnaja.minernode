var superchild = require('superchild');
  var child = superchild('ls -lh');
  child.on('stdout_line', function(line) {
    console.log('[stdout]: ', line);
  });
