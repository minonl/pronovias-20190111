<template>
  <div class="result" :style="{'height':height}">
    <div class="head"/>
    <img class="frame" :src="dataUrl">
    <div v-if="isSafari" class="hint">
      <p>长按保存图片</p>
      <p>搜索“PRONOVIAS”关注官方微信，获取最新资讯</p>
    </div>
    <div v-else class="hint">
      <Button class="save" @click.native="saveImage">保存图片</Button>
    </div>
  </div>
</template>

<script>
import Button from '@/components/Button'
export default {
  name: 'result',
  components: {
    Button
  },
  data () {
    return {
      isSafari:
        ((/SAMSUNG/.test(navigator.userAgent) ||
        /Safari/.test(navigator.userAgent) ||
        /iPhone/.test(navigator.userAgent)) &&
        !/Chrome/.test(navigator.userAgent)) ||
        (/Android/.test(navigator.userAgent) && /MicroMessenger/.test(navigator.userAgent))
    }
  },
  computed: {
    dataUrl () {
      return this.$store.state.dataUrl
    },
    height () {
      return window.innerHeight// iosHeight()
    }
  },
  methods: {
    share () {
      this.$router.push('/success')
    },
    dataURIToBlob (dataUrl) {
      const binStr = atob(dataUrl.split(',')[1])
      const len = binStr.length
      const arr = new Uint8Array(len)
      for (var i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i)
      }
      return new Blob([arr])
    },
    saveImage () {
      if (!this.isSafari) {
        let link = document.createElement('a')
        // open in now windows/tab
        link.targe = '_blank'
        link.rel = 'noopener noreferrer'
        const blob = this.dataURIToBlob(this.dataUrl)
        link.href = URL.createObjectURL(blob)
        link.download = 'MyPicture.png'
        link.click()
      }
      this.$router.push('/downloaded')
    }
  },
  mounted () {
    document.getElementById('app').style.position = 'fixed'
  },
  beforeDestroy () {
    document.getElementById('app').style.position = 'relative'
  }
}
</script>

<style lang="scss" scoped>
@import url('~@/assets/fonts/playfair/stylesheet.css');
@import '~@/stylesheets/color.scss';

.result {
  background-color: black;
  background: center / cover no-repeat url('~@/assets/images/photo/bg.jpg');
  color: white;
  height: calc(100vh - 0px);
  padding-top: .5em;
  text-align: center;
  padding-top: 0;

  .frame {
    padding-top: 0;
    width: 100vw;
    height: 120vw;
  }
  .hint {
    margin-top: 1rem;
    p {
      padding: .25em;
    }
    .save {
      border: solid 1px white;
      color: white;
      padding: .75em 4em;
      background: transparent;
    }
  }
}
</style>
