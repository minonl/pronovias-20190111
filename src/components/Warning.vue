<template>
  <div class="warning">
    <div class="close"/>
    <div class="icon-warning"/>
    <p>实际预约时间以客服电话确认为准</p>
    <Button class="try" @click.native.prevent="confirm">确认</Button>
  </div>
</template>

<script>
import Button from '@/components/Button'

export default {
  components: {
    Button
  },
  data () {
    return {
    }
  },
  methods: {
    confirm () {
      this.$parent.$parent.popWarning = false
    }
  }
}
</script>

<style lang="scss" scoped>
.warning {
  position: relative;
  text-align: center;
  padding: 2.5rem .5rem;
  background: white;
  overflow: visible;
}

$iconSize: 3rem;
.icon-warning {
  margin: 0 auto;
  height: $iconSize;
  width: $iconSize;
  background: center / cover no-repeat url('~@/assets/images/booking/warning.png');
}

p {
  padding: 1rem 0 2rem;
}

$closeSize: 2rem;
.close {
  width: $closeSize;
  height: $closeSize;
  position: absolute;
  pointer-events: none;
  right: 0;
  top: -3.75rem;
  background: center / contain no-repeat url('~@/assets/images/booking/close.png');

}

</style>

<style lang="scss">
@import '@/stylesheets/color.scss';

.yd-popup-content {
  overflow: visible;
}

</style>
