import Vue from 'vue'
import Router from '@/utils/router'

import Home from '@/pages/Home.vue'
import About from '@/pages/About.vue'

Vue.use(Router)

export default new Router({
    routes: [
       {
           path: '/',
           component: Home
       },
       {
            path: '/about',
            component: About,
            beforeEnter: (to,from,next) => {
                console.log('输出',to,from)
                setTimeout(() => {
                    next()
                }, 3000)
            }
       }
    ]
})