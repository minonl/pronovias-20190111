<template>
  <div class="photo-upload">
    <!-- <div class="title">
      <h1>{{text.line1}}</h1>
    </div>
    <div class="phrase phrase-1">
      <p v-for="(line, index) in text.line2" :key="index">
        {{line}}
      </p>
    </div> -->
    <div class="head"/>
    <div class="frame">
      <div class="inner">
        <div v-if="!tempDataUrl" class="upload" @click="cameraImage">
          <input ref="cameraSelector" @change="fileChange"
            type='file' accept='image/png,image/jpeg,image/jpg'>
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
        <h1 v-for="(line, index) in text.line3" :key="index">
          {{line}}
        </h1>
      </div>
    </div>
    <Button class="generate" @click.native="generateImage">{{text.button1}}</Button>
  </div>
</template>

<script>
import Button from '@/components/Button'
import { mapMutations } from 'vuex'
import EXIF from 'exif-js'

export default {
  name: 'photoUpload',
  components: {
    Button
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
      presets: [
        {
          text: ['若你来到我心里', '就能明白自己有多美好'],
          image: require('@/assets/images/photo/1.jpg')
        },
        {
          text: ['因为你', '我更爱时间一切'],
          image: require('@/assets/images/photo/2.jpg')
        },
        {
          text: ['我一天天明白你的平凡', '却一天天更加深切地爱你'],
          image: require('@/assets/images/photo/3.jpg')
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
      }
    }
  },
  computed: {
    rawImageBackgroundStyle () {
      if (this.tempDataUrl) {
        return { background: 'center / cover no-repeat url(' + this.tempDataUrl + ') !important' }
      } else {
        return {}
      }
    }
  },
  methods: {
    ...mapMutations([
      'updateDataUrl'
    ]),
    cameraImage () {
      this.$refs.cameraSelector.click()
    },
    async fileChange (e) {
      // this.progress = 3
      if (e.target.files && e.target.files[0]) {
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
      const size = 1024
      // const qrSize = 180
      const frate = size / this.screenWidth
      let canvas = document.createElement('canvas')

      let ctx = canvas.getContext('2d')
      canvas.width = canvas.height = size

      let photo = await this.loading(this.tempDataUrl)

      ctx.save()
      ctx.translate(size / 2, size / 2)
      ctx.scale(this.photo.currentScale, this.photo.currentScale)
      ctx.translate(this.photo.currentDeltaX * frate, this.photo.currentDeltaY * frate)
      ctx.rotate(this.photo.currentRotation / 180 * Math.PI)

      let rate = Math.min(this.photo.width, this.photo.height) / this.screenWidth
      let pw = this.photo.width / rate
      let ph = this.photo.height / rate
      let pl = (pw - this.screenWidth) / 2
      let pt = (ph - this.screenWidth) / 2

      let cl = pl * rate
      let ct = pt * rate

      ctx.drawImage(photo,
        cl,
        ct,
        this.photo.width - 2 * cl,
        this.photo.height - 2 * ct,
        -size / 2,
        -size / 2,
        size,
        size)
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
          this.vibrance(0)
            .brightness(8)
            .saturation(1)
            .exposure(2)
            .sepia(0)
            // .sharpen(3)
            // .curves('rgb', [5, 0], [130, 150], [190, 220], [250, 255])
            .contrast(1)
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
      this.$router.push({ name: 'result' })
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
  background: center / cover no-repeat url('~@/assets/images/photo/1.jpg');
  height: 100vh;
  color: white;
  padding-top: .5em;
  text-align: center;
  .head {
    height: 4rem;
    width: 100%;
    background: center / contain no-repeat url('~@/assets/images/photo/info.png');
  }
  h1 {
    font-family: 'playfair_displaybold_italic', 'Playfair Display';
    font-weight: 700;
    font-style: italic;
    font-size: 1rem;
    color: white;
  }
  // .title {
  //   padding-left: 2em;
  //   text-align: left;
  // }
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
      margin-top: .25rem;
      h1 {
        padding: .5em;
        margin: .5em;
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
