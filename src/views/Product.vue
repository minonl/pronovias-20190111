<template>
  <div class="product">
    <div class="wrapper">
      <yd-slider>
        <yd-slider-item  v-for="(item, index) in product.imgs" :key="index">
          <div class="preview" :style="{'background-image': 'url('+item+')'}"/>
        </yd-slider-item>
      </yd-slider>
    </div>
    <h2>{{product.title}}</h2>
    <p v-for="(line, key) in product.desc" :key="key">
      {{line}}
    </p>
    <Button @click.native="addToList">预约试穿</Button>
  </div>
</template>

<script>
import Button from '@/components/Button'
import { mapGetters } from 'vuex'

export default {
  components: {
    Button
  },
  data () {
    return {
      product: {
        imgs: [
          require('@/assets/placeholder/cassie.png'),
          require('@/assets/images/photo/bg.jpg'),
          require('@/assets/images/home/bg.jpg')
        ],
        title: 'CASSIE',
        desc: ['光彩夺目而又性感撩人，妩媚诱惑而又精致高贵',
          '公主风长裙，低腰设计，上身为裹身设计',
          '边缘不对称剪裁更添几分俏皮'],
        catId: 1,
        id: 1
      }
    }
  },
  created () {
    this.product = this.productById(this.$params.id)
  },
  methods: {
    ...mapGetters([
      'productById'
    ]),
    addToList () {
      console.log('111')
      // TODO
      this.$router.push({ path: '/appointment' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('~@/assets/fonts/playfair/stylesheet.css');

.product {
  padding-left: 1rem;
  padding-right: 1rem;
  // padding-top: 1rem;
  text-align: center;
  .wrapper {
  }
  h2 {
    font-family: 'playfair_displayregular', 'Playfair Display';
    font-style: normal;
    font-weight: normal;
    font-size: 1.2rem;
    padding: 1rem;
  }
  button {
    margin-top: 1rem;
  }
}
.preview {
  height: calc(100vw - 2rem);
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
}
</style>

<style lang="scss">

$dot-size: 6px;
.yd-slider-pagination {
  &-item {
    width: $dot-size;
    height: $dot-size;
    margin: 0 $dot-size/2;
    background-color: white !important;
    &-active {
      background-color: #a89359 !important;
      width: $dot-size !important;
    }
  }
}
</style>
