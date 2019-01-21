<template>
  <div class="product-list">
    <div class="category-list">
      <yd-slider :callback="updateCurrentCategoryBySlider">
          <yd-slider-item v-for="(item, index) in categories" :key="index">
              <div class="category" :style="{'background-image': 'url('+imageBaseUrl+item.poster+')'}">
                <h2>{{item.name}}</h2>
                <p>
                  {{item.description}}
                </p>
                <button>查看系列</button>
              </div>
          </yd-slider-item>
      </yd-slider>
      <div class="navigation">
        <div class="pan pan-prev">
          <div class="arrow arrow-prev"/>
        </div>
        <div class="pan pan-next">
          <div class="arrow arrow-next"/>
        </div>
      </div>
    </div>
    <transition-group
      name="fade"
      mode="in-out"
    >
      <yd-list theme="1"
        v-for="category in currentCategory" :key="category.id">
        <yd-list-item v-for="item in products" :key="item.id"
          class="list-complete-item"
          type="link"
          :href="'/product/'+item.id">
          <img slot="img" :src="imageBaseUrl+item.photos[0]">
          <div slot="title">{{item.name}}</div>
        </yd-list-item>
      </yd-list>
    </transition-group>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import config from '@/config'

export default {
  name: 'productList',
  data () {
    return {
      currentCategoryId: -1,
      imageBaseUrl: config.imageBaseUrl
    }
  },
  computed: mapState({
    // products: state => state.products.data,
    products (state) {
      return state.products.data.filter(item => item.category_id === this.currentCategoryId)
    },
    categories: state => state.categories.data,
    currentCategory () {
      return this.categories.filter(category => category.id === this.currentCategoryId)
    }
  }),
  mounted () {
    this.listCategory()
    this.updateCurrentCategory(this.categories[0].id)
    this.listProduct()
  },
  methods: {
    ...mapActions([
      'listCategory',
      'listProduct'
    ]),
    updateCurrentCategoryBySlider (index) {
      this.updateCurrentCategory(this.categories[index].id)
    },
    updateCurrentCategory (id) {
      this.currentCategoryId = id// this.categories[id].id
    }
  }
}
</script>

<style lang="scss" scoped>
.product-list {
  // padding: .75rem;
}
.category-list {
  overflow: hidden;
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
.navigation{
  position: relative;
  z-index: 2;
  .pan {
    position: absolute;
    top: -9rem;
    width: 6rem;
    height: 6rem;
    background: rgba(255,255,255,0.45);
    border-radius: 50%;
    padding: 2rem;
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
.fade-enter-active, .fade-leave-active {
  position: absolute;
  &.fade-enter-active {
    transition: all 1s cubic-bezier(0.075, 0.32, 0.165, 1);
  }
  &.fade-leave-active {
    transition: all .5s cubic-bezier(0.6, 0.18, 0.735, 0.045);
  }
}
.fade-enter {
  opacity: 1;
  transform: translateY(100%) scale(1.05);
}
.fade-enter-to{
  opacity: 1;
  transform: translateY(0) scale(1);
}
.fade-leave-to {
  opacity: 0;
  transform: scale(0.7) translateY(-200%);
}
</style>

<style lang="scss">
@import '@/stylesheets/color.scss';

$dot-size: 6px;
.yd-slider {
  .yd-slider-wrapper {
  }
  .yd-slider-pagination {
    bottom: 1rem;
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
}
.yd-slider-pagination {
}
.yd-list {
  padding: .5rem .25rem;
  .yd-list-item {
    margin-right:0;
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
