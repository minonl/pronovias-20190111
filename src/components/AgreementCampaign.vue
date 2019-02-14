<template>
  <div class="agreement">
    <!-- <div class="close"/> -->
    <!-- <iframe v-if="$parent.$parent.popAgreement" width="100%" class="content" src="/pdp.html"/> -->
    <div class="content">
      <h3>#Marryme# Pronovias活动规则</h3>
      <h3>活动时间</h3>
      <p>2019年2月14日-2019年3月25日</p>
      <h3>奖品设置</h3>
      <p>上海至巴塞罗那双人往返机票+Pronovias巴塞罗那时装周门票两张</p>
      <h3>参与流程</h3>
      <ul>
        <li>1）在Pronovias恒隆旗舰店试穿婚纱并拍照；</li>
        <li>2）关注Pronovias官方微信公众号；</li>
        <li>3）将照片上传至导购提供的入口，生成海报</li>
        <li>4）分享至朋友圈，并将海报发至Pronovias微信后台。</li>
      </ul>
      <h3>照片上传截止时间</h3>
      <p>2019年3月20日中午12:00  </p>
      <h3>开奖时间 </h3>
      <p>2019年3月25日中午12:00。</p>
      <p>在Pronovias 微信公众号（WeChat ID：PronoviasOfficial）公布中奖用户，敬请关注“Pronovias”官方微信。</p>
      <h3>注意事项(Notes)</h3>
      <ul>
        <li>1）本次活动由Pronovias发起，仅限20岁以上用户参加。参加者默认Pronovias拥有使用其照片的权利。</li>
        <li>2）活动资格不可转让或替代，奖品不可折现。</li>
        <li>3）Pronovias品牌方将提供中奖者巴塞罗那签证相关材料。签证费用、出发以及前往城市的住宿、餐饮、保险及其他相关费用由中奖者本人负担。</li>
        <li>4）具体出发日期服从Pronovias品牌方安排。</li>
        <li>5）中奖者需提供不少于五张巴塞罗那时装周活动相关照片及视频，并授权Pronovias使用这些照片及视频用于宣传。中奖者保证其所提供照片及视频不侵犯第三人的知识产权或其他合法权利。</li>
      </ul>
      <h3>最终解释权归Pronovias 品牌方所有。</h3>
    </div>
    <Button class="try" @click.native.prevent="confirm">确认</Button>
  </div>
</template>

<script>
import Button from '@/components/Button'

export default {
  name: 'agreementcampaign',
  components: {
    Button
  },
  data () {
    return {}
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
  padding: 2.5rem 1rem;
  background: white;
  color: black;
  overflow: visible;
}

p {
  text-align: left;
  padding: 1rem 0 2rem;
}

.content {
  width: 100%;
  margin-bottom: 2rem;
  height: 70vw;
  overflow-y: scroll;
  border: none;
  text-align: left;
}

$closeSize: 2rem;
.close {
  width: $closeSize;
  height: $closeSize;
  position: absolute;
  pointer-events: none;
  right: 0;
  top: -3.75rem;
  background: center / contain no-repeat
    url("~@/assets/images/booking/close.png");
}
</style>

<style lang="scss">
@import "@/stylesheets/color.scss";

.yd-popup-content {
  overflow: visible;
}
</style>
