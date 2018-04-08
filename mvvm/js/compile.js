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
    const vm = this.$vm
    Array.from(childNodes).forEach((node) => {
      const text = node.textContent
      const reg = /\{\{((?:.|\n)+?)\}\}/g

      if (this.isTextNode(node) && reg.test(text)) {
        const compileText = () => {
          const value = text.replace(reg, (matched, placeholder) => {
            placeholder = placeholder.trim()
            vm.$watch(placeholder, compileText)
            return placeholder.split('.').reduce((val, key) => {
              return val[key]
            }, vm)
          })
          node.textContent = typeof value === 'undefined' ? '' : value
        }
        compileText()
      }

      if (this.isElementNode(node)) {
        const nodeAttr = node.attributes
        Array.from(nodeAttr).forEach((attr) => {
          const name = attr.name
          const exp = attr.value
          if (name.includes('v-')) {
            node.value = vm[exp]

            vm.$watch(exp, (newVal) => {
              node.value = newVal
            })
            
            node.addEventListener('input', (e) => {
              let newVal = e.target.value
              vm[exp] = newVal  
            })
          }
        })
      }

      if (node.childNodes && node.childNodes.length) {
        this.compileElement(node)
      }
    })
  }
  isElementNode (node) {
    return node.nodeType === 1
  }
  isTextNode (node) {
    return node.nodeType === 3
  }
}