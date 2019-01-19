<template>
  <div class="product-list">
    <yd-slider>
      <yd-slider-item v-for="(item, index) in categories" :key="index">
        <div class="category" :style="{'background-image': 'url('+'http://47.104.240.204/'+item.poster+')'}">
          <h2>{{item.name}}</h2>
          <p>
            {{item.description}}
          </p>
          <button>查看系列</button>
        </div>
      </yd-slider-item>
    </yd-slider>
    <yd-list theme="1">
      <yd-list-item v-for="(item, key) in products" :key="key" type="link" :href="'/product/'+item.id">
        <img slot="img" :src="'http://47.104.240.204/'+item.photos[0]">
        <div slot="title">{{item.name}}</div>
      </yd-list-item>
    </yd-list>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

export default {
  data () {
    return {
      // categories: [
      //   {
      //     img: require('@/assets/images/home/bg.jpg'),
      //     title: '高级定制系列',
      //     desc: ['由巴塞罗那设计工作室中心手工制作',
      //       '提供优雅、创新的设计和面料以及丰富的细节'],
      //     cateId: 1
      //   }
      // ],
      // list: [
      //   { img: '//img1.shikee.com/try/2016/06/21/10172020923917672923.jpg', title: 'CELIA', id: 1 },
      //   { img: '//img1.shikee.com/try/2016/06/23/15395220917905380014.jpg', title: 'CELIA', id: 1 },
      //   { img: '//img1.shikee.com/try/2016/06/23/14381920926024616259.jpg', title: 'CELIA', id: 1 },
      //   { img: '//img1.shikee.com/try/2016/06/25/14244120933639105658.jpg', title: 'CELIA', id: 1 },
      //   { img: '//img1.shikee.com/try/2016/06/26/12365720933909085511.jpg', title: 'CELIA', id: 1 },
      //   { img: '//img1.shikee.com/try/2016/06/19/09430120929215230041.jpg', title: 'CELIA', id: 1 }
      // ]
    }
  },
  computed: mapState({
    products: state => state.products.data,
    categories: state => state.categories.data
  }),
  created () {
    this.listCategory()
    this.listProduct()
  },
  methods: {
    ...mapActions([
      'listCategory',
      'listProduct'
    ])
  }
}
</script>

<style lang="scss" scoped>
.product-list {
  // padding: .75rem;
}
.category {
  text-align: center;
  height: 13rem;
  color: white;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  padding: 2rem;
  h2 {
    margin-bottom: 1rem;
  }
  button {
    margin-top: 2rem;
    font-size: .75rem;
  }
}
</style>

<style lang="scss">
.yd-slider {
  .yd-slider-wrapper {
  }
  .yd-slider-pagination {
    bottom: 1rem;
  }
}
.yd-list {
  padding: .5rem;
  .yd-list-item {
    position: relative;
    padding: 0 .5rem .5rem !important;
    .yd-list-img {
      height: 58vw;
      & img {
        height: 58vw;
      }
    }
    .yd-list-mes {
      position: absolute;
      left: 1rem !important;
      bottom: 1rem !important;
      background: transparent;
      .yd-list-title {
        height: 1rem;
        color: white;
      }
    }
  }
}

</style>
