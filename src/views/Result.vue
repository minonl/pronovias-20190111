<template>
  <div class="result">
    <div class="title">
      <h1>{{text.line1}}</h1>
    </div>
    <div class="frame">
      <div class="inner" :style="[rawImageBackgroundStyle]">
        <!-- <div class="logo"/> -->
        <!-- <div class="upload"/> -->
      </div>
      <div class="mark">
        <h1 v-for="(line, index) in text.line3" :key="index">
          {{line}}
        </h1>
        <div class="qrcode"/>
      </div>
    </div>
    <Button class="generate" @click.native="share">{{text.button1}}</Button>
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
    rawImageBackgroundStyle () {
      if (this.$store.state.dataUrl) {
        return { background: 'center / cover no-repeat url(' + this.$store.state.dataUrl + ') !important' }
      } else {
        return {}
      }
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
  background: center / cover no-repeat url('~@/assets/images/photo/1.jpg');
  height: 100vh;
  color: white;
  padding-top: .5em;
  text-align: center;
  h1 {
    font-family: 'playfair_displaybold_italic', 'Playfair Display';
    font-weight: 700;
    font-style: italic;
    font-size: 1.5rem;
    padding: .95rem 0;
    color: white;
  }
  .title {
  //   padding-left: 2em;
  //   text-align: left;
  }
  // .phrase {
  //   text-align: left;
  //   p {
  //     height: 1em;
  //   }
  //   &-1 {
  //     padding-left: 2em;
  //   }
  // }
  .frame {
    width: 80vw;
    height: 96vw;
    // background: white;
    margin: 1rem auto;
    // padding: 5vw;
    .inner {
      width: 80vw;
      height: 80vw;
      position: relative;
      background: rgba(255,255,255,0.3);
      // filter: opacity(.5);
      background-blend-mode: exclusion;
      // .logo {
      //   margin: 0 auto;
      //   width: 5rem;
      //   height: 2rem;
      //   background: center / contain no-repeat url('~@/assets/images/photo/logo.png');
      // }
      .upload {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 4rem;
        height: 4rem;
        background: center / contain no-repeat url('~@/assets/images/photo/camera.png');
      }
    }
    .mark {
      color: #a89359;
      margin-top: .25rem;
      position: relative;
      h1 {
        padding: .5em;
        margin: .5em;
        font-size: 1rem;
      }
      .qrcode {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        height: 2rem;
        width: 2rem;
        background: black;
      }
    }
  }
  .generate {
    color: white;
    border-color: transparent;
    background-color: $gold;
  }
}
</style>
