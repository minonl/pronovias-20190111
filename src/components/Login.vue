<template>
  <div class="login">
    <div class="close"/>
    <yd-cell-group class="inputs">
      <yd-cell-item>
        <yd-icon slot="icon" name="phone3" size=".45rem"></yd-icon>
        <input class="phone" type="text" slot="right" placeholder="请输入手机号码"
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
    <Button class="try" @click.native.prevent="tryLogin">登录</Button>
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
      code: ''
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
          message = '验证成功'
          this.$parent.$parent.popLogin = false
          // this.$router.push('/appointment')
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
      this.loginPhone({ data: { 'phone': this.phone, 'captcha': this.code } })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  position: relative;
  text-align: center;
  padding: 2.5rem .5rem;
  background: white;
  overflow: visible;
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
input {
  padding: 1em !important;
  height: 3em !important;
}
.try {
  margin-top: .5rem;
}
.phone {
  width: 100%;
  padding-left: 2rem !important;
}

</style>

<style lang="scss">
@import '@/stylesheets/color.scss';

.yd-popup-content {
  overflow: visible;
}

.inputs {
  .yd-cell {
    border: none !important;
    background: white !important;
    padding-top: 0 !important;
    max-height: none !important;
    &::after {
      height: 0;
    }
    .yd-cell-item {
      &::after {
        height: 0;
      }
      .yd-cell-icon {
        position: absolute;
        left: .75rem;
      }
      .yd-btn {
        position: absolute;
        right: 1rem;
        background: $gold;
        padding: .25em .5em;
        height: 1.5em;
        &-disabled {
          background: grey;
        }
      }
    }
  }
}
</style>
