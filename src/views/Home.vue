<template>
  <div class="home">
    <videoPlayer class="vjs-custom-skin"
      :options="playerOptions"/>
    <div class="content">
      <div class="phrase phrase-1">
        <p v-for="(line, index) of text.line1" :key="index">
          {{line}}
        </p>
      </div>
      <div class="phrase phrase-2">
        <p v-for="(line, index) of text.line2" :key="index">
          {{line}}
        </p>
      </div>
      <button class="start">{{text.button1}}</button>
    </div>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'
import '@/stylesheets/vjs-custom-skin.scss'
import { videoPlayer } from 'vue-video-player'

export default {
  name: 'home',
  components: {
    videoPlayer
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
      },
      text: {
        line1: ['Pronovias是世界领先的时尚婚纱品牌',
          '始创于1922年的巴塞罗那',
          '经过近百年的发展',
          '现已成为覆盖105个国家的国际品牌'],
        line2: ['让Pronovias带你',
          '进入如梦如幻的婚纱世界吧！'],
        button1: '即刻在线选纱'
        // button2: '上传试纱照片'
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
  background-position-y: 15vw;
  height: 100vh;
  color: white;
  .content {
    height: calc(100% - 100/16*9vw);
    background: rgba(0,0,0,.3);
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
        text-align: left;
        padding-top: 2em;
        padding-left: 3em;
      }
      &-2 {
        text-align: center;
      }
    }
    .start {
      margin: 1em auto;
    }
  }
}
</style>
