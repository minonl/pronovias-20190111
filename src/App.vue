<template>
  <div id="app">
    <!-- <div id="nav">
      <i>links</i> :
      <router-link to="/">Home</router-link> |
      <router-link to="/login">Login</router-link> |
      <router-link to="/appointment">Appointment</router-link> |
      <router-link to="/product">Product List</router-link> |
      <router-link to="/upload">Upload Photo</router-link> |
      <router-link to="/result/1">Result</router-link>
    </div> -->
    <Loading/>
    <transition name="fade" mode="out-in">
      <router-view :key="key"/>
    </transition>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Loading from '@/components/Loading'

export default {
  components: {
    Loading
  },
  computed: {
    isLoading () {
      return true
    },
    key () {
      return this.$route.path
    }
  },
  created () {
    if (!localStorage.getItem('__v__')) {
      this.reportVisit()
      localStorage.setItem('__v__', 1)
    }
    this.listCategory()
    this.listProduct()
  },
  mounted () {
    document.getElementsByTagName('body')[0].style.height = window.innerHeight
  },
  methods: {
    ...mapActions([
      'listCategory',
      'listProduct',
      'reportVisit'
    ])
  }
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  position: absolute;
  width: 100%;
  &.fade-enter-active {
    transition: all 1s cubic-bezier(0.075, 0.32, 0.165, 1);
  }
  &.fade-leave-active {
    transition: all .5s cubic-bezier(0.6, 0.18, 0.735, 0.045);
  }
}
.fade-enter {
  opacity: 0;
  transform: translateY(0) scale(1);
  // transform: translateY(100%) scale(1.05);
}
.fade-enter-to{
  opacity: 1;
  transform: translateY(0) scale(1);
}
.fade-leave-to {
  opacity: 0;
  transform: translateY(0) scale(1);
  // transform: scale(0.7) translateY(-200%);
}
</style>
