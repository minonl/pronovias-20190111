<template>
  <yd-cell-group>
    <yd-cell-item>
      <yd-icon slot="icon" name="phone3" size=".45rem"></yd-icon>
      <input type="text" slot="right" placeholder="请输入手机号码"
        v-model="phone">
      <yd-sendcode slot="right"
                    v-model="isCounting"
                    @click.native="sendCode"
                    type="warning"
      ></yd-sendcode>
    </yd-cell-item>
    <yd-cell-item>
      <input type="text" slot="right" placeholder="请输入短信验证码"
        v-model="code">
    </yd-cell-item>
  </yd-cell-group>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  data () {
    return {
      isCounting: false,
      phone: '',
      code: '1234'
    }
  },
  computed: {
    isSending () {
      return this.$store.state.pending.captcha
    },
    captcha () {
      return this.$store.state.captcha
    }
  },
  watch: {
    isSending (toggle) {
      if (toggle) {
        this.$dialog.loading.open('发送中...')
      } else {
        this.$dialog.loading.close()
      }
    },
    captcha (newCap) {
      const captcha = newCap
      if (captcha) {
        let message = captcha.message
        let icon = 'success'
        if (captcha.code === 0) {
          message = '已发送'
          this.isCounting = true
        } else {
          icon = 'failure'
        }
        this.$dialog.toast({
          mes: message,
          icon: icon,
          timeout: 1500
        })
      }
    }
  },
  methods: {
    ...mapActions([
      'verifyPhone',
      'login'
    ]),
    sendCode () {
      this.verifyPhone({ data: { 'phone': this.phone } })
      setTimeout(() => {

      }, 1000)
    }
  }
}
</script>

<style>

</style>
