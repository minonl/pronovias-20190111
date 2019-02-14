<template>
  <div class="photo-upload" :style="{'height':screenHeight}">
    <yd-popup v-model="popAgreement" position="center" width="90%">
      <AgreementCampaign ref="agreementWindow"/>
    </yd-popup>
    <div class="head" :style="headBackground"/>
    <div class="frame" :style="{'background': `center / cover no-repeat url(${frameBackgroundURL})`}">
      <div class='wrapper'>
        <div class="inner">
          <div v-if="!tempDataUrl" class="upload" @click="cameraImage">
            <input ref="cameraSelector" @change="fileChange"
              type='file' accept='image/*'>
          </div>
          <v-touch class="uploaded" ref="uploaded"
            @pinchstart="onTouchPhotoPinchStart"
            @panstart="onTouchPhotoPanStart"
            @panmove="onTouchPhoto"
            @pinchmove="onTouchPhoto"
            @panend="onTouchPhotoPanEnd"
            @pinchend="onTouchPhotoPinchEnd"
            :style="[rawImageBackgroundStyle]"/>
        </div>
        <div class="mark">
          <yd-slider :show-pagination="false" :callback="updatePreset" ref="slider">
            <yd-slider-item  v-for="(item, index) in presets" :key="index">
              <p v-for="(content, key) in item.text" :key="key">{{content}}</p>
            </yd-slider-item>
          </yd-slider>
          <div class="navigation">
            <div class="pan pan-prev" @click="swipeTo(true)">
              <div class="arrow arrow-prev"/>
            </div>
            <div class="pan pan-next" @click="swipeTo(false)">
              <div class="arrow arrow-next"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="button-group">
      <Button class="reset" @click.native="resetImage">
        <div class="inner">
          <div class="icon-reset"/>
          <div class="text">重新选择</div>
        </div>
      </Button>
      <Button :disabled="agree ? null:'disabled'" class="generate" @click.native="generateImage">{{text.button1}}</Button>
    </div>
    <p class="agree-cam">
      <yd-checkbox v-model="agree" color="#a89359">我已阅读</yd-checkbox>
      <span class="rule" @click="popAgreement=true">PRONOVIAS #Marryme# 活动规则代替</span>
    </p>
  </div>
</template>

<script>
import Button from '@/components/Button'
import AgreementCampaign from '@/components/AgreementCampaign'
import { mapMutations } from 'vuex'
import EXIF from 'exif-js'
import config from '@/config'

export default {
  name: 'photoupload',
  components: {
    Button,
    AgreementCampaign
  },
  data () {
    return {
      text: {
        line1: '#Marry me',
        line2: [
          '上传至美时刻',
          '赢取巴塞罗那的梦幻婚礼'
        ],
        line3: [
          'Declaration Of Love WIP'
        ],
        button1: '生成照片'
      },
      currentPresetId: 0,
      presetsRaw: [
        {
          mode: 'upload',
          text: ['若你来到我心里', '就能明白自己有多美好'],
          image: require('@/assets/images/photo/1.jpg')
        },
        {
          mode: 'upload',
          text: ['因为你', '我更爱时间一切'],
          image: require('@/assets/images/photo/2.jpg')
        },
        {
          mode: 'upload',
          text: ['我一天天明白你的平凡', '却一天天更加深切地爱你'],
          image: require('@/assets/images/photo/3.jpg')
        },
        {
          mode: 'trail',
          text: ['愿执子之手', '在亲友的祝福中走向幸福'],
          image: require('@/assets/images/trail/1.jpg')
        },
        {
          mode: 'trail',
          text: ['彼此的怀抱', '是世界上最温暖的港湾'],
          image: require('@/assets/images/trail/2.jpg')
        },
        {
          mode: 'trail',
          text: ['一袭唯美白纱', '是对婚礼最初的想象'],
          image: require('@/assets/images/trail/3.jpg')
        }

      ],
      orientation: 0,
      tempDataUrl: null,
      result: null,
      photo: {
        width: null,
        height: null,
        pinchStart: 0,
        adjustScale: 1,
        currentScale: 1,
        currentRotation: 0,
        adjustRotation: 0,
        adjustDeltaX: 0,
        adjustDeltaY: 0,
        currentDeltaX: 0,
        currentDeltaY: 0
      },
      agree: true,
      popAgreement: false
    }
  },
  computed: {
    presets () {
      switch (this.$store.state.mode) {
        // case config.mode.upload : {
        //   return this.presetsRaw.filter(item => item.mode === 'upload')
        // }
        case config.mode.trail : {
          return this.presetsRaw.filter(item => item.mode === 'trail')
        }
      }
      // return this.presetsRaw
      return this.presetsRaw.filter(item => item.mode === 'upload')
    },
    headBackground () {
      const url = this.$store.state.mode === config.mode.trail
        ? require('@/assets/images/photo/title.png')
        : require('@/assets/images/photo/info.png')
      return { background: `center / contain no-repeat url(${url})` }
    },
    rawImageBackgroundStyle () {
      if (this.tempDataUrl) {
        return { background: 'center / cover no-repeat url(' + this.tempDataUrl + ') !important' }
      } else {
        return {}
      }
    },
    frameBackgroundURL () {
      return this.presets[this.currentPresetId].image
    },
    screenWidth () {
      return window.innerWidth
    }
  },
  mounted () {
    document.getElementById('app').style.position = 'fixed'
  },
  beforeDestroy () {
    document.getElementById('app').style.position = 'relative'
  },
  methods: {
    ...mapMutations([
      'updateDataUrl'
    ]),
    resetImage () {
      this.tempDataUrl = null
    },
    screenHeight () {
      return window.innerHeight// iosHeight()
    },
    swipeTo (right) {
      if (right) {
        this.$refs.slider.touchStartHandler({
          touches: [{
            clientX: 0,
            clientY: 0
          }]
        })
        this.$refs.slider.touchMoveHandler({
          touches: [{
            clientX: 1000,
            clientY: 0
          }]
        })
        this.$refs.slider.touchEndHandler()
      } else {
        this.$refs.slider.touchStartHandler({
          touches: [{
            clientX: 1000,
            clientY: 0
          }]
        })
        this.$refs.slider.touchMoveHandler({
          touches: [{
            clientX: 0,
            clientY: 0
          }]
        })
        this.$refs.slider.touchEndHandler()
      }
    },
    updatePreset (id) {
      this.currentPresetId = id
    },
    cameraImage () {
      this.$refs.cameraSelector.click()
    },
    async fileChange (e) {
      // this.progress = 3
      if (e.target.files && e.target.files[0]) {
        this.$dialog.loading.open('载入图片中...')
        const file = e.target.files[0]
        this.getOrientationFromImage(file).then(
          ({ orientation, file }) => {
            this.orientation = orientation
            const reader = new FileReader()
            reader.onload = this.gotRawImageGlobal
            reader.readAsDataURL(file)
          }
        )
      }
    },
    getOrientationFromImage (file) {
      return new Promise(function (resolve, reject) {
        EXIF.getData(file, function () {
          const orientation = EXIF.getTag(this, 'Orientation')
          const file = this
          // console.log({orientation, file})
          resolve({ orientation, file })
        })
      })
    },
    gotRawImageGlobal (e) {
      this.$dialog.loading.close()
      this.resetOrientation(e.target.result, this.orientation, this.gotResetRawImageGlobal)
    },
    gotResetRawImageGlobal (dataUrl) {
      this.tempDataUrl = dataUrl
    },
    /*
    * The orientation of the camera relative to the scene,
    * when the image was captured. The relation of the '0th row'
    * and '0th column' to visual position is shown as below.
    *
    * Value | 0th Row     | 0th Column
    * ------+-------------+-----------
    *   1   | top         | left side
    *   2   | top         | right side
    *   3   | bottom      | right side
    *   4   | bottom      | left side
    *   5   | left side   | top
    *   6   | right side  | top
    *   7   | right side  | bottom
    *   8   | left side   | bottom
    *
    * For convenience, here is what the letter F would look like
    * if it were tagged correctly and displayed by a program
    * that ignores the orientation tag (thus showing the stored image):
    *
    * 1        2       3      4         5            6           7          8
    * 888888  888888      88  88      8888888888  88                  88  8888888888
    * 88          88      88  88      88  88      88  88          88  88      88  88
    * 8888      8888    8888  8888    88          8888888888  8888888888          88
    * 88          88      88  88
    * 88          88  888888  888888
    *
    * For more details, see http://sylvana.net/jpegcrop/exif_orientation.html
    */
    resetOrientation (srcBase64, srcOrientation, callback) {
      let img = new Image()
      img.onload = () => {
        let width = img.width
        let height = img.height
        let canvas = document.createElement('canvas')
        let ctx = canvas.getContext('2d')

        // set proper canvas dimensions before transform & export
        if (srcOrientation > 4 && srcOrientation < 9) {
          canvas.width = height
          canvas.height = width
        } else {
          canvas.width = width
          canvas.height = height
        }

        // transform context before drawing image
        switch (srcOrientation) {
          case 2: ctx.transform(-1, 0, 0, 1, width, 0); break
          case 3: ctx.transform(-1, 0, 0, -1, width, height); break
          case 4: ctx.transform(1, 0, 0, -1, 0, height); break
          case 5: ctx.transform(0, 1, 1, 0, 0, 0); break
          case 6: ctx.transform(0, 1, -1, 0, height, 0); break
          case 7: ctx.transform(0, -1, -1, 0, height, width); break
          case 8: ctx.transform(0, -1, 1, 0, 0, width); break
          default: break
        }

        // draw image
        ctx.drawImage(img, 0, 0)

        this.photo.width = canvas.width
        this.photo.height = canvas.height

        // export base64
        callback(canvas.toDataURL())
      }

      img.src = srcBase64
    },
    onTouchPhotoPinchStart (e) {
      this.photo.pinchStart = e.rotation
    },
    onTouchPhotoPanStart (e) {
      this.photo.pinchStart = 0
    },
    onTouchPhoto (e) {
      // console.log('[photo]')
      let transforms = []
      // var rotation = currentRotation + Math.round(e.rotation);
      this.photo.currentRotation = (Math.round(e.rotation - this.photo.pinchStart)) + this.photo.adjustRotation
      this.photo.currentScale = this.photo.adjustScale * e.scale
      this.photo.currentDeltaX = this.photo.adjustDeltaX + (e.deltaX / this.photo.currentScale)
      this.photo.currentDeltaY = this.photo.adjustDeltaY + (e.deltaY / this.photo.currentScale)

      transforms.push('scale(' + this.photo.currentScale + ')')
      transforms.push('translate(' + this.photo.currentDeltaX + 'px,' + this.photo.currentDeltaY + 'px)')
      transforms.push('rotate(' + this.photo.currentRotation + 'deg)')

      e.target.style.transform = transforms.join(' ')
    },
    onTouchPhotoPanEnd (e) {
      this.photo.adjustScale = this.photo.currentScale
      this.photo.adjustRotation = this.photo.currentRotation
      this.photo.adjustDeltaX = this.photo.currentDeltaX
      this.photo.adjustDeltaY = this.photo.currentDeltaY
    },
    onTouchPhotoPinchEnd (e) {
      this.photo.adjustScale = this.photo.currentScale
      this.photo.adjustRotation = this.photo.currentRotation
    },
    loading (url) {
      return new Promise((resolve, reject) => {
        var img = new Image()
        img.onload = () => {
          resolve(img)
        }
        img.src = url
      })
    },
    async generateImage () {
      if (!this.tempDataUrl) {
        this.$dialog.toast({
          mes: '请选择照片',
          icon: 'failure',
          timeout: 1500
        })
        return
      }
      this.$dialog.loading.open('生成中...')
      const size = 1024
      const heightRatio = 1.2
      const qrSize = 100
      const frate = size / this.screenWidth
      let canvas = document.createElement('canvas')

      let ctx = canvas.getContext('2d')
      canvas.width = size
      canvas.height = size * heightRatio

      let backgrond = await this.loading(this.frameBackgroundURL)
      let title = await this.loading(require('@/assets/images/photo/title.png'))
      let photo = await this.loading(this.tempDataUrl)
      let qrcode = await this.loading(require('@/assets/images/photo/qrcode.jpg'))

      let rate = Math.min(this.photo.width, this.photo.height) / this.screenWidth
      let pw = this.photo.width / rate
      let ph = this.photo.height / rate
      let pl = (pw - this.screenWidth) / 2
      let pt = (ph - this.screenWidth) / 2
      let cl = pl * rate
      let ct = pt * rate

      ctx.save()
      ctx.drawImage(backgrond, 0, 0, canvas.width, canvas.height)
      ctx.restore()

      ctx.save()
      ctx.fillStyle = 'rgba(0,0,0,0.3)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.restore()

      ctx.save()
      ctx.drawImage(title, (canvas.width - title.width * 1.5) / 2, 2 * 16, title.width * 1.5, title.height * 1.5)
      ctx.restore()

      ctx.save()
      ctx.drawImage(qrcode,
        canvas.width * 0.9 - qrSize,
        6 * 16 * frate + canvas.width * 0.8,
        qrSize,
        qrSize)
      ctx.restore()

      ctx.save()
      ctx.font = `30px PingFang SC,Helvetica Neue,Hiragino Sans GB,Segoe UI,Microsoft YaHei,微软雅黑,sans-serif`
      ctx.fillStyle = 'white'
      ctx.textAlign = 'left'
      ctx.fillText(this.presets[this.currentPresetId].text[0], canvas.width * 0.1125, canvas.height - 2.5 * 16 * frate)
      ctx.fillText(this.presets[this.currentPresetId].text[1], canvas.width * 0.1125, canvas.height - 1.25 * 16 * frate)
      ctx.restore()

      ctx.beginPath()
      ctx.rect(size * 0.1, 5 * 16 * frate, size * 0.8, size * 0.8)
      ctx.clip()

      ctx.save()
      ctx.translate(size / 2, size / 2)
      ctx.scale(this.photo.currentScale, this.photo.currentScale)
      ctx.translate(this.photo.currentDeltaX * frate, this.photo.currentDeltaY * frate)
      ctx.rotate(this.photo.currentRotation / 180 * Math.PI)

      ctx.drawImage(photo,
        cl,
        ct,
        this.photo.width - 2 * cl,
        this.photo.height - 2 * ct,
        size * 0.1 + -size / 2,
        5 * 16 * frate + -size / 2,
        size * 0.8,
        size * 0.8)
      ctx.restore()

      // document.body.appendChild(canvas)
      this.replaceHtmlWithCanvas(canvas)
        .then(this.applyEffect)
        .then(this.gotResultImageGlobal)
    },
    replaceHtmlWithCanvas (canvas) {
      return new Promise(function (resolve, reject) {
        // document.getElementById('app').removeChild(document.getElementById('gen'))
        canvas.id = 'gen'
        document.getElementById('app').appendChild(canvas)
        resolve(canvas)
      })
    },
    applyEffect (canvas) {
      return new Promise(function (resolve, reject) {
        // eslint-disable-next-line
        Caman(canvas, function () {
          this
            // .vibrance(0)
            // .brightness(8)
            // .saturation(1)
            // .exposure(2)
            // .sepia(0)
            // .sharpen(3)
            // .curves('rgb', [5, 0], [130, 150], [190, 220], [250, 255])
            // .contrast(1)
            .render(function () {
              const dataUrl = this.toBase64()
              resolve(dataUrl)
            })
        })
      })
    },
    gotResultImageGlobal (dataUrl) {
      // this.dataUrl = dataUrl
      this.updateDataUrl(dataUrl)
      document.getElementById('app').removeChild(document.getElementById('gen'))
      this.$dialog.loading.close()
      this.$router.push('/result')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/fonts/playfair/stylesheet.css';
@import '~@/stylesheets/global.scss';
@import '~@/stylesheets/color.scss';

input[type='file'] {
  display: none !important
}

.photo-upload {
  background-color: black;
  @include backgroundImage('~@/assets/images/photo/bg.jpg');
  height: calc(100vh - 0px);
  color: white;
  padding-top: 0;
  text-align: center;
  overflow: hidden;
  .head {
    position: absolute;
    height: 4rem;
    top: .75rem;
    width: 100%;
  }
  h1 {
    font-family: 'playfair_displaybold_italic', 'Playfair Display';
    font-weight: 700;
    font-style: italic;
    font-size: 1rem;
    color: white;
  }
  .frame {
    margin: 0;
    width: 100vw;
    height: 120vw;
    // background: white;
    // margin: 1rem auto;
    .wrapper {
      background: rgba(0,0,0,0.3);
      height: 100%;
      padding: 5rem 10vw 0;
    }
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
      overflow: hidden;
      .photo {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translateX(-50%);
        height: 100%;
      }
      .upload {
        position: absolute;
        z-index: 3;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 4rem;
        height: 4rem;
        background: center / contain no-repeat url('~@/assets/images/photo/camera.png');
      }
      .uploaded {
        z-index: 1;
        transform-origin: center;
        @include fullPage();
      }
    }
    .mark {
      color: #a89359;
      padding: 0;
      p {
        text-align: left;
        color: white;
        margin: .25em .5em .25em;
        &:nth-of-type(1){
          margin-top: 1rem;
        }
      }
      .navigation{
        position: relative;
        z-index: 2;
        margin-left: -15%;
        margin-right: -15%;
        .pan {
          position: absolute;
          // top: -9rem;
          top: -3.5rem;
          width: 4rem;
          height: 4rem;
          background: rgba(168,147,89,0.45);
          border-radius: 50%;
          padding: 1.25rem;
          cursor: pointer;
          .arrow {
            position: relative;
            width: 100%;
            height: 100%;
            background-repeat: no-repeat;
            background-size: contain;
            background-position: center;
            transform: translateX(-70%);
            &-prev {
              transform: scaleX(-1) translateX(-70%);
              background-image: url('~@/assets/images/product/arrow.png');
            }
            &-next {
              background-image: url('~@/assets/images/product/arrow.png');
            }
          }
          &-prev {
            left: 0;
            transform: translateX(-50%);
          }
          &-next {
            right: 0;
            transform: translateX(50%);
          }
        }
      }
    }
  }
  .button-group {
    display: flex;
    flex-direction: row;
    button {
      flex: 1;
      margin: 1rem;
      color: white;
      border: solid 1px white;
      letter-spacing: .125em;
      background-color: transparent;
      .inner {
        $icon-size: 1rem;
        .icon-reset {
          display: inline-block;
          height: $icon-size;
          width: $icon-size;
          transform:  translateY(.075rem);
          @include inframeImage('~@/assets/images/photo/reset.png');
        }
        .text {
          display: inline-block;
        }
      }
    }
  }
  .agree-cam {
    .rule {
      color: $gold;
      padding: .25em 0;
      font-size: .95rem;
      border-bottom: solid 1px $gold;
    }
  }
}
</style>

<style lang="scss">
.agree-cam {
  .yd-checkbox-text {
    color:white;
  }
}
</style>
