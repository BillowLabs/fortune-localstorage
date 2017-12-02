const assert = require('chai').assert

describe('USER: index', () => {

  it('should CRUD with local storage', () => {

    var adapter = require.main.require('./src')

    var options = { localStorage: null, loglevel: 'silent' }
    if (typeof localStorage === 'undefined') {
      var LocalStorage = require('node-localstorage').LocalStorage
      options.localStorage = new LocalStorage('./scratch')
    }
    else {
      /* eslint-disable no-undef */
      options.localStorage = localStorage
      /* eslint-enable no-undef */
    }

    const fortune = require('fortune')
    const store = fortune({ item: { name: String, value: Number } }, { adapter: [adapter, options] })
    const type = 'item'

    options.localStorage.clear()

    return store
      // CREATE Test
      .create(type, [{ name: 'test', value: 10 }, { name: 'test again', value: 20 }])
      .then(result => {
        let item = result.payload.records[0]
        assert.notEqual(item, null)
        assert.equal(item.name, 'test')
        assert.equal(store.adapter.inMemory(), false)
        return item
      })
      // ALT READ Test
      .then(() => {
        return store
          .find(type, null, { offset: 1, limit: 1, sort: { value: true } })
          .then(result => {
            assert.equal(result.payload.records.length, 1)
            let item = result.payload.records[0]
            assert.notEqual(item, null)
            assert.equal(item.name, 'test')
            assert.equal(store.adapter.inMemory(), false)
            return item
          })
      })
      // READ Test
      .then(item => {
        return store
          .find(type, item.id)
          .then(result => {
            let item = result.payload.records[0]
            assert.notEqual(item, null)
            assert.equal(item.name, 'test')
            assert.equal(store.adapter.inMemory(), false)
            return item
          })
      })
      // UPDATE Test
      .then(item => {
        return store
          .update(type, { id: item.id, replace: { name: 'test two' } })
          .then(() => { return store.find('item', item.id) })
          .then(result => {
            let items = result.payload.records
            assert.equal(items.length, 1)
            assert.equal(items[0].name, 'test two')
            assert.equal(store.adapter.inMemory(), false)
            return items[0]
          })
      })
      // DELETE Test
      .then(item => {
        return store
          .delete(type, [item.id])
          .then(() => { return store.find('item', [item.id]) })
          .then(result => {
            let items = result.payload.records
            assert.equal(items.length, 0)
            assert.equal(store.adapter.inMemory(), false)
          })
      })
  })


  // it('should CRUD with memory', () => {
  //   var adapter = require.main.require('./src')
  //
  //   const fortune = require('fortune')
  //   const store = fortune({ item: { name: String } }, { adapter: [adapter, { loglevel: 'silent' }] })
  //   const type = 'item'
  //
  //   return store
  //     // CREATE Test
  //     .create(type, { name: 'test' })
  //     .then(result => {
  //       let item = result.payload.records[0]
  //       assert.notEqual(item, null)
  //       assert.equal(item.name, 'test')
  //       assert.equal(store.adapter.inMemory(), true)
  //       return item
  //     })
  //     // READ Test
  //     .then(item => {
  //       return store
  //         .find(type, item.id)
  //         .then(result => {
  //           let item = result.payload.records[0]
  //           assert.notEqual(item, null)
  //           assert.equal(item.name, 'test')
  //           assert.equal(store.adapter.inMemory(), true)
  //           return item
  //         })
  //     })
  //     // UPDATE Test
  //     .then(item => {
  //       console.log('ITEM', item)
  //       return store
  //         .update(type, { id: item.id, replace: { name: 'test two' } })
  //         .then(() => { return store.find('item') })
  //         .then(result => {
  //           let items = result.payload.records
  //           assert.equal(items.length, 1)
  //           assert.equal(items[0].name, 'test two')
  //           assert.equal(store.adapter.inMemory(), true)
  //           return items[0]
  //         })
  //     })
  //     // DELETE Test
  //     .then(item => {
  //       return store
  //         .delete(type, [item.id])
  //         .then(() => { return store.find('item', [item.id]) })
  //         .then(result => {
  //           let items = result.payload.records
  //           assert.equal(items.length, 0)
  //           assert.equal(store.adapter.inMemory(), true)
  //         })
  //     })
  // })


  beforeEach(() => {
    // NOTE: this is intentionally left blank
  })

  afterEach(() => {
    // NOTE: this is intentionally left blank
  })

})
