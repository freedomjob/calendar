let Vue
class Router {
    
    static install(_Vue) {
        Vue = _Vue
        Vue.mixin({
            beforeCreate() {
                if(this.$options.router) {
                    Vue.prototype.$flyRouter = this.$options.router
                    this.$options.router.init()
                }
            }
        })
    }
    constructor(options) {
        this.$options = options
        this.routeMaps = {}
        this.app = new Vue({
            data: {
                currentUrl: '/'
            }
        })
    }
    init() {
        this.bindEvents()
        this.generateHashMap()
        this.createComponent(Vue)
    }
    bindEvents() {
        window.addEventListener('hashchange', this.hashChangeEvent.bind(this), false)
        window.addEventListener('load', this.hashChangeEvent.bind(this), false)
    }
    hashChangeEvent(e) {
        let hash = this.getHash()
        let { from, to } = this.getFrom(e)
        let router = this.routeMaps[hash]
        if(router.beforeEnter) {
            router.beforeEnter(to, from, () => {
                this.app.currentUrl = hash
            })
        }else {
            this.app.currentUrl = hash
        }
    }
    getFrom(e) {
        let from = e.oldURL || ''
        let to = e.newURL || '/'
        return  {
            from,
            to
        }
    }
    getHash() {
        return window.location.hash.substr(1) || '/'
    }
    push(url) {
        window.location.hash = url
    }
    generateHashMap() {
        this.$options.routes.forEach(item => {
            this.routeMaps[item.path] = item.component
        })
    }
    createComponent(Vue) {
        const that = this
        Vue.component('router-link',{
            render(h) {
                return h('a', {
                        attrs: {
                            href: '#' + this.to
                        }
                    },
                    [this.$slots.default]
                )
            },
            props: {
                to: String
            }
        })
        Vue.component('router-view', {
            render(h) {
                let component = that.routeMaps[that.app.currentUrl]
                return h(component)
            }
        })
    }

}

export default Router