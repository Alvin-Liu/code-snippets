class Watcher {
  constructor (vm, expOrFn, cb) {
    expOrFn = expOrFn.trim()
    this.vm = vm
    this.expOrFn = expOrFn
    this.cb = cb
    this.depIds = {}
    this.getter = typeof expOrFn === 'function'
      ? expOrFn
      : this.parseGetter(expOrFn)
    this.value = this.get()
  }
  addDep (dep) {
    if (!this.depIds.hasOwnProperty(dep.id)) {
      dep.addSub(this)
      this.depIds[dep.id] = dep
    }
  }
  update () {
    this.run()
  }
  run () {
    const newValue = this.get()
    const oldValue = this.value
    if (newValue === oldValue) {
      return
    }
    this.value = newValue
    this.cb.call(this.vm, newValue, oldValue)
  }
  get () {
    Dep.target = this  // 将当前订阅者指向自己
    // const value = this.vm._data[this.expOrFn] // 触发getter，将自身添加到dep中
    const value = this.getter.call(this.vm, this.vm); // 触发getter，将自身添加到dep中
    Dep.target = null  // 添加完成 重置
    return value
  }
  parseGetter (exp) {
    if (/[^\w.$]/.test(exp)) {
      return
    }
    const exps = exp.split('.')
    return (obj) => {
      for (let i = 0, len = exps.length; i < len; i++) {
        if (!obj) {
          return
        }
        obj = obj[exps[i]]
      }
      return obj
    }
  }
}
