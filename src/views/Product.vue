<template>
  <transition name="fade" mode="out-in">
    <div class="product">
      <div class="wrapper">
        <!-- <ul class="product-slider"> -->
          <!-- <li class="product-slider-item"  v-for="item in allProducts" :key="item.id"> -->
            <yd-slider>
              <yd-slider-item  v-for="(photo, index) in product.photos" :key="index">
                <div class="preview" :style="{'background-image': 'url('+imageBaseUrl+photo+')'}"/>
              </yd-slider-item>
            </yd-slider>
          <!-- </li> -->
        <!-- </ul> -->
        <div class="navigation">
          <div class="inner">
            <div class="pan pan-prev" @click="swipeTo(true)">
              <div class="arrow arrow-prev"/>
            </div>
            <div class="pan pan-next" @click="swipeTo(false)">
              <div class="arrow arrow-next"/>
            </div>
          </div>
        </div>
      </div>
      <h2>{{product.name}}</h2>
      <p>{{product.description}}</p>
      <Button @click.native="addToList">预约试穿</Button>
    </div>
  </transition>
</template>

<script>
import Button from '@/components/Button'
import { mapState, mapActions } from 'vuex'
import config from '@/config'

export default {
  name: 'product',
  components: {
    Button
  },
  data () {
    return {
      imageBaseUrl: config.imageBaseUrl
    }
  },
  computed: {
    ...mapState({
      allProducts (state) {
        return state.products.data
      }
    }),
    product () {
      return this.$store.getters.productById(this.$route.params.id)
    },
    brotherProductIds () {
      let nextId = -1

      let lastId = -1
      for (const [index, p] of this.allProducts.entries()) {
        if (p.id === this.product.id) {
          if (index === this.allProducts.length - 1) {
            nextId = this.allProducts[0].id
            lastId = this.allProducts[index - 1].id
          } else if (index === 0) {
            nextId = this.allProducts[1].id
            lastId = this.allProducts[this.allProducts.length - 1].id
          } else {
            nextId = this.allProducts[index + 1].id
            lastId = this.allProducts[index - 1].id
          }
        }
      }
      return { nextId, lastId }
    }
  },
  created () {
  },
  methods: {
    ...mapActions([
      'addTrailProduct'
    ]),
    addToList () {
      this.addTrailProduct(this.product.id)
      this.$router.push({ path: '/appointment' })
    },
    swipeTo (toRight) {
      let nextId = -1
      if (toRight) {
        nextId = this.brotherProductIds.nextId
      } else {
        nextId = this.brotherProductIds.lastId
      }
      this.$router.push(`/product/${nextId}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import url('~@/assets/fonts/playfair/stylesheet.css');
@import url('~@/stylesheets/color.scss');

.product {
  padding: 1rem 0;
  text-align: center;
  h2 {
    font-family: 'playfair_displayregular', 'Playfair Display';
    font-style: normal;
    font-weight: normal;
    font-size: 1.2rem;
    padding: 1rem;
  }
  p {
    padding: 0 1rem 1rem;
  }
  button {
    margin-top: 1rem;
  }
  .wrapper {
    position: relative;
    overflow: hidden;
  }
}
.preview {
  height: calc(100vw);
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
}

.product-slider {
  &-item {
    // display: inline-block;
  }
}

$panSize: 6rem;
.navigation{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  .inner {
    position: relative;
    width: 100vw;
    height: $panSize;
    .pan {
      position: absolute;
      top: 0;
      width: $panSize;
      height: $panSize;
      background: rgba(168,147,89,0.45);
      border-radius: 50%;
      padding: 2.125rem;
      cursor: pointer;
      .arrow {
        position: relative;
        width: 100%;
        height: 100%;
        background-repeat: no-repeat;
        background-size: contain;
        background-position: center;
        transform: translateX(-80%);
        &-prev {
          transform: scaleX(-1) translateX(-80%);
          background-image: url('~@/assets/images/product/arrow.png');
        }
        &-next {
          background-image: url('~@/assets/images/product/arrow.png');
        }
      }
      &-prev {
        left: 0;
        transform: translateX(-66%);
      }
      &-next {
        right: 0;
        transform: translateX(66%);
      }
    }
  }
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
