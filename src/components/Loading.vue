<template>
  <transition name="fade">
    <div v-if="retired" ref="loading" class="loading">
      <transition name="fade">
        <div v-if="loading" class="loader">
          <div class="logo"/>
          <div class="image"/>
          <yd-progressbar type="line"
            :progress="this.count/this.list.length"
            trail-width="1"
            class="line"
            preload
            trail-color="#ae9a64"></yd-progressbar>
        </div>
      </transition>
      <transition name="fade">
        <div v-if="loaded" class="content">
          <videoPlayer class="vjs-custom-skin"
            ref="videoPlayer"
            :options="playerOptions"
            :playsinline="true"
            @ready="initPlayer"
            @ended="close"/>
          <!-- <img class="gif" src="@/assets/images/home/loading.gif"/> -->
          <Button @click.native="close" class="skip">跳过</Button>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import Button from '@/components/Button'
import iosHeight from 'ios-inner-height'

import 'video.js/dist/video-js.css'
import '@/stylesheets/vjs-custom-skin.scss'
import { videoPlayer } from 'vue-video-player'

export default {
  components: {
    Button,
    videoPlayer
  },
  data () {
    return {
      retired: true,
      loaded: false,
      loading: true,
      durationLoading: 1500,
      // durationGif: 158000,
      list: [
        // require('@/assets/images/home/loading.gif'),
        require('@/assets/images/home/lbg.jpg'),
        require('@/assets/images/home/play.png'),
        require('@/assets/images/home/video.jpg'),
        require('@/assets/images/home/bg.jpg'),
        require('@/assets/images/home/logo.svg'),
        require('@/assets/images/home/loading.gif'),
        require('@/assets/images/product/arrow.png'),
        require('@/assets/images/booking/accordin.png'),
        require('@/assets/images/booking/calendar.png'),
        require('@/assets/images/booking/clock.png'),
        require('@/assets/images/booking/close.png'),
        require('@/assets/images/booking/warning.png'),
        require('@/assets/images/booking/store.jpg'),
        require('@/assets/images/product/arrow.png'),
        require('@/assets/images/product/head.jpg'),
        require('@/assets/images/product/product_logo.png'),
        require('@/assets/images/booking/success.png'),
        require('@/assets/images/photo/1.jpg'),
        require('@/assets/images/photo/2.jpg'),
        require('@/assets/images/photo/3.jpg')

      ],
      count: 0,
      playerOptions: {
        controls: false,
        nativeControlsForTouch: false,
        poster: require('@/assets/images/home/video.jpg'),
        preload: true,
        sources: [{
          type: 'video/mp4',
          src: require('@/assets/intro.mp4')
        }]
      }
    }
  },
  created () {
    this.list = [...this.list,
      ...this.$store.state.products.data.map(p => p.poster)]
  },
  mounted () {
    this.load()
  },
  methods: {
    initPlayer () {
      if (!this.$refs.videoPlayer) return
      const root = {
        height: iosHeight(),
        width: window.innerWidth
      }
      const player = this.$refs.videoPlayer.$el.getElementsByClassName('video-js')[0].style
      const rootRatio = root.width / root.height
      const videoRatio = 608 / 1080
      // wider than video
      if (rootRatio >= videoRatio) {
        player.width = root.width + 'px'
        player.height = player.width / videoRatio + 'px'
      } else {
        player.height = root.height + 'px'
        player.width = root.height * videoRatio + 'px'
      }
    },
    load () {
      const counter = this
      this.loading = true
      for (const item of this.list) {
        let img = new Image()
        img.src = item
        img.onload = function () {
          counter.count++
        }
      }
    },
    close () {
      this.retired = false
    }
  },
  watch: {
    count (c) {
      if (c === this.list.length) {
        const loader = this
        setTimeout(function () {
          loader.loading = false
          loader.loaded = true
          // setTimeout(function () {
          //   loader.close()
          // }, loader.durationGif)
          // loader.initPlayer()
        }, loader.durationLoading)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/stylesheets/global.scss';

.loading {
  position: fixed;
  top:0;
  left:0;
  right:0;
  bottom:0;
  width: 100%;
  height: 100%;
  z-index: 500;
  overflow: hidden;
  background: black;
}
.loader {
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .logo {
    position: absolute;
    top: 1.5rem;
    margin: 0 auto;
    width: 15rem;
    height: 3rem;
    @include inframeImage('~@/assets/images/home/logo.svg');
  }
  .image {
    width: 100vw;
    height: 115vw;
    background-image: url('~@/assets/images/home/loading.gif');
    background-size: cover;
    background-repeat: no-repeat;
  }
  .line {
    position: fixed;
    top: calc(100% - 5px);
    margin-top: -8px;
    svg {
      path:nth(0) {
        stroke: black !important;
      }
    }
  }
}
.content {
  height: 100%;
  width: 100%;
  position: relative;
}
.gif {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 100%;
  user-select: none;
  pointer-events: none;
}
.skip {
  position: absolute;
  right: 0;
  bottom: 4rem;
  color: white !important;
  border: solid 1px white !important;
  background: transparent;
  border-right: none !important;
  border-top-left-radius: 6px !important;
  border-bottom-left-radius: 6px !important;
  border-top-right-radius: 0px !important;
  border-bottom-right-radius: 0px !important;
  padding-left: 1.25em !important;
  padding-right: 1.25em !important;
  z-index: 99;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>

<style lang="scss">
.yd-progressbar {
  position: fixed;
  top: calc(100% - 5px);
  margin-top: -8px;
  svg {
    path:nth-child(1) {
      stroke: black !important;
    }
  }
}
</style>
