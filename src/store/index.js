import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

/**
 * vuex特殊情况总结：
 * 1.若多个模块的state属性相同，通过this.$store.state.模块名.属性名取值。
 * 2.若多个模块的getters属性相同，会抛出vuex.esm.js?358c:757 [vuex] duplicate getter key: xxx错误，
 * 通过this.$store.getters.属性名 取到的是第一个模块(首先加载的)的getters。
 * 3.若多个模块的actions属性相同，执行dispatch后，会依次执行每个模块里的同名action
 * 4.若多个模块的mutations属性相同，执行commit后，会依次执行每个模块里的同名mutations
 * 
 * 若想让每个模块的以上内容不冲突，需要在各个模块加上namespaced属性为true
 * 此时，state和之前一样，getters取值方式变成了this.$store.getters['模块名/getter名'],
 * actions变成了this.$store.dispatch('模块名/action名',args),
 * mutations变成了this.$store.commit('模块名/mutation名',args)
 */

// require.context 的应用
let files = require.context('./modules',false,/\.js$/)
let modules = {}
files.keys().forEach(key => {
    modules[key.replace(/(\.\/|\.js)/g,'')] = files(key).default
});
const store = new Vuex.Store({
  modules
})

export default store