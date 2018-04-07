function defineReactive (obj, prop, value) {
  const dep = new Dep()
  observer(value)
  Object.defineProperty(obj, prop, {
    enumerable: true,
    configurable: true,
    get () {
      if (Dep.target) {
        dep.depend(Dep.target)
      }
      return value
    },
    set (newVal) {
      if (newVal === value) {
        return
      }
      value = newVal
      observer(newVal)
      dep.notify()
    }
  })
}
function observer (obj) {
  if (!obj || typeof obj !== 'object') {
    return
  }
  Object.keys(obj).forEach((key) => {
    defineReactive(obj, key, obj[key])
  })
}