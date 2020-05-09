function Demo(name) {
  return new Test(name)
}

class Test {
  p
  t
  flag = false
  fnList = []
  constructor(name) {
    this.name = name
    const fn = () => {
      return new Promise((r, j) => {
        this.t = setTimeout(() => {
          console.log(name)
          r()
        }, 0)
      })
    }
    this.p = fn()
    this.fnList = [fn]
  }

  sleep(time) {
    const fn = () => {
      return new Promise((r, j) => {
        setTimeout(() => {
          r()
        }, time * 1000)
      })
    }
    if (!this.flag) {
      this.p = this.p.then(fn)
    }
    this.fnList.push(fn)
    return this
  }

  eat(food) {
    const fn = () => {
      return new Promise((r, j) => {
        console.log(food)
        r()
      })
    }
    if (!this.flag) {
      this.p = this.p.then(fn)
    }
    this.fnList.push(fn)
    return this
  }

  sleepFirst(time) {
    clearTimeout(this.t)
    this.flag = true
    this.p = new Promise((r, j) => {
      this.t = setTimeout(() => {
        // 延迟执行所有的fnlist
        setTimeout(() => {
          let p1 = Promise.resolve()
          for (let i = 0; i < this.fnList.length; i++) {
            const fn = this.fnList[i]
            p1 = p1.then(() => {
              return fn()
            })
          }
          this.fnList = []
        }, 0)
        r()
      }, time * 1000)
    })
    return this
  }
}
