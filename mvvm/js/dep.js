let uid = 0
class Dep {
  constructor () {
    this.id = uid++
    this.subs = []
  }
  addSub (sub) {
    if (this.subs.includes(sub)) {
      return
    }
    this.subs.push(sub)
  }
  notify () {
    this.subs.forEach((sub) => sub.update())
  }
  depend () {
    Dep.target.addDep(this)
  }
}
Dep.target = null
