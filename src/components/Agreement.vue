<template>
  <div class="agreement">
    <div class="close"/>
    <p>预约规则很简单，也就是说，预约规则很简单，也就是说，预约规则很简单，也就是说，预约规则很简单，也就是说，预约规则很简单，也就是说，预约规则很简单，也就是说，预约规则很简单，也就是说，预约规则很简单，也就是说，预约规则很简单，也就是说，预约规则很简单，也就是说，预约规则很简单，也就是说，预约规则很简单，也就是说，预约规则很简单，也就是说，预约规则很简单，也就是说，预约规则很简单，也就是说，预约规则很简单，也就是说，预约规则很简单，也就是说，预约规则很简单，也就是说，预约规则很简单，也就是说，预约规则很简单，也就是说，真的</p>
    <Button class="try" @click.native.prevent="confirm">确认</Button>
  </div>
</template>

<script>
import Button from '@/components/Button'

export default {
  name: 'agreement',
  components: {
    Button
  },
  data () {
    return {
    }
  },
  methods: {
    confirm () {
      this.$parent.$parent.popAgreement = false
    }
  }
}
</script>

<style lang="scss" scoped>
.agreement {
  position: relative;
  text-align: center;
  padding: 2.5rem ;
  background: white;
  overflow: visible;
}

p {
  text-align: left;
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
