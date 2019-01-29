<template>
  <div class="success">
    <div class="wrapper">
      <div class="icon">
      </div>
      <div v-if="modeTrail" class="hint">
        <p>保存成功!</p>
        <p>搜索“PRONOVIAS”关注官方微信公众号</p>
        <p>发送照片至公众号后台参与活动</p>
      </div>
      <div v-else class="hint">
        <p>保存成功！搜索“PRONOVIAS”关注官方微信公众号</p>
        <p>获取最新品牌资讯</p>
      </div>
    </div>
  </div>
</template>

<script>
import config from '@/config'
export default {
  name: 'downloaded',
  computed: {
    modeTrail () {
      return this.$store.state.mode === config.mode.trail
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/stylesheets/global.scss';

.success {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height:80vh;
  .wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    text-align:center;
    $iconSize: 4rem;
    .icon {
      margin: 1.5rem;
      height:$iconSize;
      width:$iconSize;
      @include inframeImage('~@/assets/images/booking/success.png');
    }
    p {
      padding: .125rem;
    }
  }
}
</style>
