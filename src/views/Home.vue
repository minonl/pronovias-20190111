<template>
  <div class="home">
    <!-- <videoPlayer class="vjs-custom-skin"
      :options="playerOptions"/> -->
    <div class="content">
      <div class="phrase phrase-1">
        国际奢侈婚纱品牌PRONOVIAS<br>
        已将优雅与浪漫带到105个国家<br>
        并在上海恒隆广场<br>
        开启了中国首家PRONOVIAS旗舰店
      </div>
      <div class="bottom">
        <div class="phrase phrase-2">
          即刻在线选纱<br>
          领取专属精美礼物<br>
          更有机会赢取巴塞罗那梦幻之旅
        </div>
        <router-link to="/product">
          <Button class="start">即刻在线选纱</Button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
// import 'video.js/dist/video-js.css'
// import '@/stylesheets/vjs-custom-skin.scss'
// import { videoPlayer } from 'vue-video-player'

import Button from '@/components/Button'

export default {
  name: 'home',
  components: {
    // videoPlayer,
    Button
  },
  data () {
    return {
      playerOptions: {
        // controls: true,
        // nativeControlsForTouch: true,
        poster: require('@/assets/images/home/video.jpg'),
        preload: true,
        sources: [{
          type: 'video/mp4',
          src: 'https://vjs.zencdn.net/v/oceans.mp4'
        }, {
          type: 'video/webm',
          src: 'https://vjs.zencdn.net/v/oceans.webm'
        }]
      }
    }
  },
  mounted () {
  }
}
</script>

<style lang="scss" scoped>
.home {
  background: center / cover no-repeat url('~@/assets/images/home/bg.jpg');
  height: 100vh;
  color: white;
  .content {
    height: calc(100% - 100/16*9vw);
    // background: rgba(0,0,0,.3);
    text-align: center;
    .phrase {
      padding: 1em;
      font-size: .75rem;
      @media screen and (min-width: 370px){
        font-size: .85rem;
      }
      p {
        padding: .75em;
        height: 1em;
      }
      &-1 {
        padding-top: 2em;
      }
      &-2 {
        text-align: center;
      }
    }
    .start {
      margin: 2em auto;
      color: white;
      border-color: white;
    }
  }
  .bottom {
    position: absolute;
    bottom: 2rem;
    width: 100%;
    left: 50%;
    transform: translateX(-50%);
  }
}
</style>
