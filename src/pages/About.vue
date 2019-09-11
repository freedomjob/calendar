<template>
    <div>
        我是about --{{flyfox}}
        <button @click="goHome">回到首页</button>
    </div>
</template>
<script>
export default {
    methods: {
        goHome() {
            this.$flyRouter.push('/')
        }
    }
}
</script>
