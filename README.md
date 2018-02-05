# plogger

### Description

node log package to log message to console with colors based on the message type

### Installation

```
$ npm install plogger
```

### Usage

```
global.logger = require('plogger').log;

logger('debug', logLevel.DEBUG)
logger('info', logLevel.INFO)
logger('warning', logLevel.WARNING)
logger('error', logLevel.ERROR)
logger('fatal', logLevel.FATAL)

var initTest = function() {
  try {
    throw Exception('bad call');
  } catch (e) {
    logger(e);
  } finally {
    logger('done!');
  }
}
initTest();
```

