<template>
    <div>
        <div class="upload">
            <span class="icon-add"></span>
            <input type="file" class="upload-input" @change="changeHandler" multiple>
        </div>

        <div class="img-list">
            <div class="img" v-for="(item,index) in imgList" :key="index">
                <img :src="item.url" alt="">
                <span class="icon-clear" @click="delItem(index)"></span>
            </div>
        </div>
    </div>

</template>
<script>
export default {
  name: 'upload',
  data () {
    return {
      imgList: []
    }
  },
  methods: {
    changeHandler (e) {
      const self = this
      let fileObj = {}
      let targetImg = e.target
      console.log('文件信息', targetImg.files)
      if (targetImg.files.length === 0) return
      let file = targetImg.files[0]
      fileObj.file = file
      //   document.querySelector('.img').src = URL.createObjectURL(file)
      let fr = new FileReader()
      fr.onloadend = function (e) {
        // document.querySelector('.img').src = e.target.result
        fileObj.url = e.target.result
        self.imgList.push(fileObj)
        targetImg.value = ''
        console.log('列表', self.imgList)
      }
      fr.readAsDataURL(file)
    },
    delItem (index) {
      this.imgList.splice(index, 1)
    }
  }
}
</script>
<style scoped lang="less">
    .img-list {
        display: inline-block;
        .img {
            width: 80px;
            height: 80px;
            margin-left: 20px;
            display: inline-block;
            position: relative;
            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
                position: absolute;
                top: 0;
                left: 0;
            }
            .icon-clear {
                position: absolute;
                right: -8px;
                top: -8px;
                color: @grey;
                background: white;
                border-radius: 50%;
                cursor: pointer;
            }
        }
    }
    .upload {
        position: relative;
        width: 80px;
        height: 80px;
        border: dashed 1px @border;
        display: inline-block;
        transition: .3s ease-in-out;

        &:hover {
            border-color: @purple;
            .icon-add {
                color: @purple;
            }
        }
        .icon-add {
            width: 20px;
            height: 20px;
            position: absolute;
            left: 0;
            right: 0;
            top: 0;
            bottom: 0;
            margin: auto;
            transition: .3s ease-in-out;
        }
        &-input {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            opacity: 0;
            cursor: pointer;
        }
    }
</style>
