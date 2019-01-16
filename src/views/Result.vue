<template>
  <div class="result">
    <div class="title">
      <h1>{{text.line1}}</h1>
    </div>
    <div class="frame">
      <div class="inner">
        <div class="logo"/>
        <!-- <div class="upload"/> -->
      </div>
      <div class="mark">
        <h1 v-for="(line, index) in text.line3" :key="index">
          {{line}}
        </h1>
        <div class="qrcode"/>
      </div>
    </div>
    <button class="generate">{{text.button1}}</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      text: {
        line1: '#Marry me',
        line3: [
          'Fantasy Of Love',
          'WIP'
        ],
        button1: '点击分享'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('~@/assets/fonts/playfair/stylesheet.css');

.result {
  background: center / cover no-repeat url('~@/assets/images/photo/bg.jpg');
  height: 100vh;
  color: white;
  padding-top: .5em;
  text-align: center;
  h1 {
    font-family: 'playfair_displaybold_italic', 'Playfair Display';
    font-weight: 700;
    font-style: italic;
    font-size: 1.5rem;
  }
  .title {
    padding-left: 2em;
    text-align: left;
  }
  .phrase {
    text-align: left;
    p {
      height: 1em;
    }
    &-1 {
      padding-left: 2em;
    }
  }
  .frame {
    width: 80vw;
    height: 96vw;
    background: white;
    margin: 1rem auto;
    padding: 5vw;
    .inner {
      width: 70vw;
      height: 70vw;
      background: center / 150% no-repeat url('~@/assets/images/photo/bg.jpg');
      filter: opacity(.5);
      background-blend-mode: exclusion;
      .logo {
        margin: 0 auto;
        width: 5rem;
        height: 2rem;
        background: center / contain no-repeat url('~@/assets/images/photo/logo.png');
      }
      .upload {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 6rem;
        height: 6rem;
        background: center / contain no-repeat url('~@/assets/images/photo/camera.png');
      }
    }
    .mark {
      text-align: left;
      color: #a89359;
      margin-top: .25rem;
      position: relative;
      h1 {
        padding: 0;
        margin: 0;
      }
      .qrcode {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        height: 2.75rem;
        width: 2.75rem;
        background: black;
      }
    }
  }
  .generate {

  }
}
</style>
