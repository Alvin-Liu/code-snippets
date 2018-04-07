class Mvvm {
  constructor (options = {}) {
    this.$options = options
    const data = this._data = options.data
    observer(this._data)
    
    Object.keys(data).forEach((prop) => {
      this._proxyData(prop)
    })

    this.$compile = new Compile(options.el, this)
  }
  _proxyData (prop) {
    Object.defineProperty(this, prop, {
      enumerable: true,
      get () {
        return this._data[prop]
      },
      set (newVal) {
        if (newVal === this._data[prop]) {
          return
        }
        this._data[prop] = newVal
      }
    })
  }
  $watch (key, fn) {
    new Watcher(this, key, fn)
  }
}
