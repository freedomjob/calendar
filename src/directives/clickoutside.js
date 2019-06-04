export default {
  install: (Vue, options) => {
    Vue.directive('click-outside', {
      bind (el, binding, vnode, oldVnode) {
        el.clickEvent = (e) => {
          if (!el.contains(e.target)) {
            // binding.expression && binding.value(e) 和下面的等价
            vnode.context[binding.expression](e)
          }
        }
        document.addEventListener('click', el.clickEvent)
      },
      unbind (el) {
        document.removeEventListener('click', el.clickEvent)
        delete el.clickEvent
      }
    })
  }
}
