<template>
  <div class="result" :style="{'height':window.innerHeight}">
    <div class="head"/>
    <img class="frame" :src="dataUrl">
    <div class="hint">
      <p>长按保存图片</p>
      <p>搜索“PRONOVIAS”关注官方微信，获取最新资讯</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'result',
  data () {
    return {
      text: {
        line1: '#Marry me',
        line3: [
          'Fantasy Of Love WIP'
        ],
        button1: '点击分享'
      }
    }
  },
  computed: {
    dataUrl () {
      return this.$store.state.dataUrl
    }
  },
  methods: {
    share () {
      this.$router.push('/success')
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('~@/assets/fonts/playfair/stylesheet.css');
@import '~@/stylesheets/color.scss';

.result {
  background: center / cover no-repeat url('~@/assets/images/photo/bg.jpg');
  height: 100vh;
  color: white;
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
  }
}
</style>
