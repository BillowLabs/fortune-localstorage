# fortune-localstorage
A plug-in for using local storage as a DB

# Browser Support
Browsers need to support Local Storage for changes to be persistent.
- IE 8<
- Firefox 31<
- Chrome 31<
- Safari 7<
- iOS Safari 7.1<
- Android Browser 4.1<
- Chrome for Android 42<

# Local Storage
When Browsers or Node do not support Local Storage, you can provide a substitute through the adapter options.
For Example:

```javascript
const fortune = require('fortune')
const adapter = require('fortune-localstorage')
const store = fortune( {/* your model */}, { adapter: [ adapter, { localStorage: /* your substitute */ } ] })
```

If Local Storage is not available, this adapter will fall back to the default in-memory adapter and changes will not be
persistent.

# Logging
This adapter implements [loglevel](https://github.com/pimterry/loglevel) for logging.  It is compatible in both Node and
web browsers.  You can set the log level through the options for the adapter.  For Example:

```javascript
const fortune = require('fortune')
const adapter = require('fortune-localstorage')
const store = fortune( {/* your model */}, { adapter: [ adapter, { loglevel: 'trace' } ] })
```

Valid options are:
- trace
- debug
- info
- warn
- error

For more information see the [loglevel documentation](https://github.com/pimterry/loglevel).
