import Popper from 'popper.js'
export default {
    props: {
        placement: {
            type: String,
            default: 'bottom-start',
            validator: function (value) {
                return /^(auto|top|bottom|left|right)(-start|-end)?$/g.test(value)
            }
        }
    },
    data () {
        return {
            popper: null,
            popperStatus: false,
        }
    },
    methods: {
        update() {
            if (this.popper) {
                this.$nextTick(() => {
                    this.popper.update()
                    this.popperStatus = true
                })
            } else {
                this.$nextTick(() => {
                    this.popper = new Popper(this.$refs.reference, this.$refs.popper, {
                        placement: this.placement,
                        modifiers: {
                            computeStyle:{
                                gpuAcceleration: false
                            },
                            preventOverflow :{
                                boundariesElement: 'window'
                            }
                        },
                        onCreate:()=>{
                            this.resetTransformOrigin()
                            this.$nextTick(this.popper.update())
                        },
                        onUpdate:()=>{
                            this.resetTransformOrigin()
                        }
                    })
                })
            }
            
        },
        destroy() {
            if (this.popper) {
                setTimeout(() => {
                    if (this.popper && !this.popperStatus) {
                        this.popper.destroy()
                        this.popper = null
                    }
                    this.popperStatus = false
                }, 400)
            }
        },
        resetTransformOrigin() {
            let x_placement = this.popper.popper.getAttribute('x-placement')
            let placementStart = x_placement.split('-')[0]
            let placementEnd = x_placement.split('-')[1]
            const leftOrRight = x_placement === 'left' || x_placement === 'right'
            if(!leftOrRight){
                this.popper.popper.style.transformOrigin = placementStart==='bottom' || ( placementStart !== 'top' && placementEnd === 'start') ? 'center top' : 'center bottom'
            }
        }
    },
    beforeDestroy () {
        if (this.popper) {
            this.popper.destroy()
        }
    }
}
