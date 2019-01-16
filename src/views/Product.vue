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
    <button>预约试穿</button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      product: {
        imgs: [
          require('@/assets/placeholder/cassie.png'),
          require('@/assets/photo/bg.jpg'),
          require('@/assets/home/bg.jpg')
        ],
        title: 'CASSIE',
        desc: ['光彩夺目而又性感撩人，妩媚诱惑而又精致高贵',
          '公主风长裙，低腰设计，上身为裹身设计',
          '边缘不对称剪裁更添几分俏皮'],
        cateId: 1
      }
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
