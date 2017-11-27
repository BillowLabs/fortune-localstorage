const LocalStorageDB = require('localstoragedb')
const log = require('loglevel')

module.exports = function (Adapter) {
  var MemoryAdapter = Adapter.DefaultAdapter
  var storage

  function LocalStorageAdapter (properties) {
    // Default the properites if none were provided
    properties = properties || { }

    // Default the options if none were provided
    properties.options = properties.options || { }

    // Default localStorage if none was provided
    // NOTE: when running in an environment like Node or an older browser, this will be null
    /* eslint-disable no-undef */
    properties.options.localStorage = properties.options.localStorage || (typeof localStorage === 'undefined' ? null : localStorage)
    /* eslint-enable no-undef */

    if (properties.options.loglevel) {
      log.setLevel(properties.options.loglevel)
    }

    // If localStorage exists, create the database in localStorage for later use
    if (properties.options.localStorage) {
      storage = new LocalStorageDB('fortune', properties.options.localStorage)
      Object.getOwnPropertyNames(properties.recordTypes).forEach(recordType => {
        let fields = Object.getOwnPropertyNames(properties.recordTypes[recordType])
        if (storage.tableExists(recordType)) return
        storage.createTable(recordType, fields)
      })
    }
    else {
      log.warn('Local Storage not available. Defaulting to Memory Adapter.')
    }

    return MemoryAdapter.call(this, properties)
  }

  LocalStorageAdapter.prototype = Object.create(MemoryAdapter.prototype)

  LocalStorageAdapter.prototype.connect = function () {
    log.info('Fortune Local Storage Adapter', 'CONNECT')
    if(!storage) return MemoryAdapter.prototype.connect.call(this)
    return new Promise(resolve => { return resolve() })
  }

  LocalStorageAdapter.prototype.disconnect = function () {
    log.info('Fortune Local Storage Adapter', 'DISCONNECT')
    if (!storage) return MemoryAdapter.prototype.disconnect.call(this)
    return new Promise((resolve) => { return resolve() })
  }

  LocalStorageAdapter.prototype.create = function (type, records) {
    log.info('Fortune Local Storage Adapter', 'CREATE')
    log.debug(type, records)

    if (!storage) return MemoryAdapter.prototype.create.call(this, type, records)

    return new Promise(resolve => {
      records.forEach(record => {
        record.id = storage.insert(type, record)
      })
      storage.commit()
      resolve(records)
    })
  }

  LocalStorageAdapter.prototype.find = function (type, ids, options) {
    log.info('Fortune Local Storage Adapter', 'FIND')
    log.debug(type, ids, options)

    if (!storage) return MemoryAdapter.prototype.find.call(this, type, ids, options)

    return new Promise(resolve => {
      let found = storage.queryAll(type)
      // Some forms of storage (node-localstorage for example) use capital ID for records
      // while fortune requires a lower case id.
      found.forEach(record => {
        record.id = record.id||record.ID
      })

      // TODO: make find a LOT BETTER
      resolve(found)
    })
  }

  LocalStorageAdapter.prototype.update = function (type, updates) {
    log.info('Fortune Local Storage Adapter', 'UPDATE')
    log.debug(type, updates)

    if (!storage) return MemoryAdapter.prototype.update.call(this, type, updates)

    return new Promise(resolve => {
      var items = storage.update(type, {id: updates[0].id}, function(row) {
        // TODO: make this update a LOT better
        row.name = updates[0].replace.name
        return row
      })

      storage.commit()
      resolve(items)
    })
  }

  LocalStorageAdapter.prototype.delete = function (type, ids) {
    log.info('Fortune Local Storage Adapter', 'DELETE')
    log.debug(type, ids)

    if (!storage) return MemoryAdapter.prototype.delete.call(this, type, ids)
    return new Promise(resolve => {
      let deleted = storage.deleteRows(type, {id: ids[0]})
      storage.commit()
      resolve(deleted)
    })
  }

  LocalStorageAdapter.prototype.inMemory = function () {
    return !storage
  }

  return LocalStorageAdapter
}
