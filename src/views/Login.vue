<template>
  <div class="login">
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
    <Button class="try" @click.native="tryLogin">登录</Button>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import Button from '@/components/Button'

export default {
  components: {
    Button
  },
  data () {
    return {
      isCounting: false,
      code: '1234'
    }
  },
  computed: {
    phone: {
      get () {
        return this.$store.state.account.phone
      },
      set (value) {
        this.updatePhone(value)
      }
    },
    isSending () {
      return this.$store.state.pending.captcha
    },
    captcha () {
      return this.$store.state.captcha
    },
    login () {
      return this.$store.state.login
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
    },
    login (newLogin) {
      if (newLogin) {
        let message = newLogin.message
        let icon = 'success'
        if (newLogin.code === 0) {
          message = '登录成功'
          // this.$router.push('/product')
          this.$router.go(-1)
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
      'updatePhone',
      'verifyPhone',
      'loginPhone'
    ]),
    sendCode () {
      this.verifyPhone({ data: { 'phone': this.phone } })
    },
    tryLogin () {
      this.loginPhone({ data: { 'phone': this.phone, 'code': this.code } })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  text-align: center;
  padding: .5rem;
}
input {
  padding: 1em !important;
  height: 3em !important;
}
.try {
  margin-top: .5rem;
}

</style>

<style lang="scss">
.yd-cell {
  height: auto;
}
.yd-btn {
  height: 1rem;
}
</style>
