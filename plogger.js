/* ========================================== Logger ========================================== */
//                                                                     _________     __    __
//   ________        __________         ________         _______      |    __   |   |  |  |  |
//  |   ___  \      /   __     \       |   ___  \      /   __   \     |   |__|  |   |  |__|  |
//  |  |   \  \    |   |  \  |\ \      |  |   \  \    |   |  \   \    |    __   |   |_____   |
//  |  \___|  |    \   \__|  |\  \     |  \___|  |    \   \__|   |    |   |__|  |         |  |
//  |   _____/      \_______/ |__|     |   _____/      \________/     |_________|         |__|
//  |  |                               |  |
//  |__|                               |__|

/* ========================================== Logger ========================================== */

const util = require('util');

//  Log type enums
global.logLevel = {
    DEBUG: "debug",
    INFO: "info",
    WARNING: "warning",
    ERROR: "error",
    FATAL: "fatal",
    properties: {
        0: {name: "debug", value: "debug", code: "D", color: '\x1b[36m'},
        1: {name: "info", value: "info", code: "I", color: '\x1b[37m'},
        2: {name: "warning", value: "warning", code: "W", color: '\x1b[33m'},
        3: {name: "error", value: "error", code: "E", color: '\x1b[31m'},
        4: {name: "fatal", value: "fatal", code: "F", color: '\x1b[41m'}
    }
};

//  Get the file, line of the file, function and if it is Exception or not where the log was triggered
Object.defineProperty(global, '__logInfo', {
  get: function() {
    var orig = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack) {
        return stack;
    };
    var err = new Error;
    Error.captureStackTrace(err, arguments.callee);
    var stack = err.stack;
    Error.prepareStackTrace = orig;
    stack;
    return {
      file: stack[2].getFileName(),
      line:stack[2].getLineNumber(),
      function: stack[2].getFunctionName()
    }
  }
})

global.logtypes = Object.keys(global.logLevel);
global.logtypes.pop();                              //  Remove the properties element

var log = function(message, level) {
  var logInfo = __logInfo;
  logInfo.message = (message.message) ? message.message : message;  //  message.message is a JSON object, message is a simple string message
  logInfo.level = getLevel(level);
  logInfo.isException = (message.toString().startsWith('ReferenceError:')) ? true : false;
  console.log(getLevelColor(logInfo.level) + '%s\x1b[0m', util.inspect(logInfo, false, null));
}

var getLevel = function(level) {
  if(!level)                                                    //  No level defined
    return 'info';
  if(global.logtypes.indexOf(level.toUpperCase()) != -1)       //  Level properly defined to a correct value
    return level.toLowerCase();
  return 'info'                                                //  Level not defined correctly
}

var getLevelColor = function(level) {
  return global.logLevel.properties[Object.keys(global.logLevel).indexOf(level.toUpperCase())].color;
}

module.exports = {
  log:log
}
