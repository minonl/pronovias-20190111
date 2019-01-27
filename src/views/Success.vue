<template>
  <div class="success">
    <div class="wrapper">
      <div class="icon">
      </div>
      <div class="hint">
        <p>预约成功!</p>
        <p>实际预约信息请等待客服来电确认</p>
        <p>--</p>
        <p>搜索“PRONOVIAS”关注官方微信公众号</p>
        <p>了解更多信息</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'success'
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
