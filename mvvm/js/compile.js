class Compile {
  constructor (el, vm) {
    this.$vm = vm
    this.$el = this.isElementNode(el)
      ? el 
      : document.querySelector(el)

    if (this.$el) {
      this.$fragment = this.node2Fragment(this.$el)
      this.init()
      this.$el.appendChild(this.$fragment)
    }
  }
  init () {
    this.compileElement(this.$fragment)
  }
  node2Fragment (el) {
    const fragment = document.createDocumentFragment()
    let child
    while (child = el.firstChild) {
      fragment.appendChild(child)
    }
    return fragment
  }
  compileElement (el) {
    const childNodes = el.childNodes
    Array.from(childNodes).forEach((node) => {
      const text = node.textContent
      const reg = /\{\{((?:.|\n)+?)\}\}/g

      if (this.isTextNode(node) && reg.test(text)) {
        this.compileText(node, RegExp.$1.trim())
      }
      if (node.childNodes && node.childNodes.length) {
        this.compileElement(node)
      }
    })
  }
  compileText (node, exp) {
    let val = this.$vm
    const arr = exp.split('.')
    arr.forEach((key) => {
      val = val[key]
    })

    this.textUpdater(node, val)
    this.$vm.$watch(exp, (newValue, oldValue) => {
      this.textUpdater(node, newValue)
    })
  }
  textUpdater (node, value) {
    node.textContent = typeof value === 'undefined' 
      ? '' 
      : value
  }
  isElementNode (node) {
    return node.nodeType === 1
  }
  isTextNode (node) {
    return node.nodeType === 3
  }
}