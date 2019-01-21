<template>
  <form class="appointment" @submit.prevent="submit">
    <div class="title">预约申请</div>
    <yd-cell-group>
      <div class="label"><span class="no">1</span>联系方式</div>
      <yd-cell-item>
        <input slot="right" type="text" required placeholder="姓名*"
          v-model="name">
      </yd-cell-item>
      <yd-cell-item>
        <input slot="right" type="number" required disabled="disabled" placeholder="电话*"
          v-model="phone">
      </yd-cell-item>
      <yd-cell-item>
        <input slot="right" type="email" placeholder="邮箱"
          v-model="email">
      </yd-cell-item>
    </yd-cell-group>
    <div class='box'>
      <div class="label"><span class="no">2</span>选择预约日期</div>
      <datetime
        input-class="input"
        class="datetime"
        type="date"
        :phrases="{ok: '确认', cancel: '取消'}"
        v-model="date"/>
      <datetime
        input-class="input"
        class="datetime"
        type="time"
        :phrases="{ok: '确认', cancel: '取消'}"
        v-model="date"/>
    </div>
    <yd-cell-group>
      <div class="label"><span class="no">3</span>挑选你的婚纱</div>
      <yd-cell-item>
        <Button class="reselect" @click="clearList" slot="left" >重新挑选</Button>
        <ul class="cart" slot="right" >
          <li class="product" v-for="item in cart" :key="item.id" :style="{'background-image': 'url('+imageBaseUrl+item.photos[0]+')'}">
          </li>
          <li class="product-add">
            <router-link to='/product'>
              <div class="inner">
                <div class="plus"/>
              </div>
            </router-link>
          </li>
        </ul>
      </yd-cell-item>
    </yd-cell-group>
    <yd-checkbox v-model="agree" color="#a89359">
      我同意 PRONOVIAS 的预约规则
      <!-- <p class="line2">the make an appointment form</p> -->
    </yd-checkbox>
    <Button type="submit">提交预约</Button>
  </form>
</template>

<script>
import Button from '@/components/Button'
import { mapActions } from 'vuex'
import config from '@/config'

export default {
  components: {
    Button
  },
  data () {
    return {
      imageBaseUrl: config.imageBaseUrl
    }
  },
  computed: {
    cart () {
      return this.$store.state.appointment.trailProducts
    },
    name: {
      get () {
        return this.$store.state.appointment.name
      },
      set (value) {
        this.updateName(value)
      }
    },
    phone: {
      get () {
        return this.$store.state.account.phone
      },
      set (value) {
        this.updatePhone(value)
      }
    },
    email: {
      get () {
        return this.$store.state.appointment.email
      },
      set (value) {
        this.updateEmail(value)
      }
    },
    date: {
      get () {
        return this.$store.state.appointment.date
      },
      set (value) {
        this.pickDatetime(value)
      }
    },
    agree: {
      get () {
        return this.$store.state.appointment.agree
      },
      set (value) {
        this.updateAgree(value)
      }
    },
    booking () {
      return this.$store.state.booking
    }
  },
  watch: {
    booking (b) {
      // if (b)
    }
  },
  methods: {
    ...mapActions([
      'removeAllTrailProducts',
      'updateName',
      'updateEmail',
      'pickDatetime',
      'updateAgree',
      'submitAppointment'
    ]),
    clearList () {
      this.removeAllTrailProducts()
    },
    submit () {
      let message = '预约成功'
      let icon = 'success'
      if (!this.agree) {
        message = '请先同意预约规则'
        icon = 'failure'
      }
      if (!this.cart || !this.cart.length) {
        message = '请挑选你的婚纱'
        icon = 'failure'
      }
      if (!this.date || !this.date.length) {
        message = '请选择预约日期'
        icon = 'failure'
      }
      // if (!this.email || !this.email.length) {
      //   message = '请输入邮箱地址'
      // }
      if (!this.name || !this.name.length) {
        message = '请输入姓名'
        icon = 'failure'
      }
      if (icon !== 'success') {
        this.$dialog.toast({
          mes: message,
          icon: icon,
          timeout: 1500
        })
      } else {
        this.submitAppointment({
          headers: {
            'TOKEN': this.$store.state.login.data.token
          },
          params: {
            name: this.name,
            phone: this.phone,
            email: this.email,
            date: this.date,
            product_ids: this.cart
          }
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/assets/fonts/monsterrat_alternates/stylesheet.css';
@import '~@/stylesheets/color.scss';

.appointment {
  text-align: center;
  padding: 1rem 0;
  .title {
    padding: .25rem;
    font-size: 1rem;
  }
  .box {
    position: relative;
    border-radius: 3px;
    border-bottom: solid 1px $rose;
    padding: 4rem 3em .5rem;
    background: $dirt;
    margin-bottom: 1rem;
  }
  .label {
    text-align: left;
    font-size: .9rem;
    background-color: $sand;
    border-top: solid 1px $rose;
    border-bottom: solid 1px $rose;
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    padding: 1em 2.25rem;
    .no {
      font-size: 1.25rem;
      padding-right: .5em;
      font-family: 'Montserrat Alternates', 'montserrat_alternates_mediuRg';
    }
  }
}

.reselect {
  position: absolute;
  top: 1rem;
}
.cart {
  li {
    width: 25vw;
    height: 25vw;
    background-color: white;
    margin-bottom: 1rem;
    display: block;
    background-size: cover;
    background-position: center;
    &.product {
      &-add {
        background-image: url('~@/assets/placeholder/cassie.png');
        .inner {
          width: 100%;
          height: 100%;
          background: rgba(255,255,255,.5);
          position: relative;
          .plus {
            width: 1.5rem;
            height: 1.5rem;
            border-radius: 50%;
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            background: #a89359;
            &:before {
              content: '+';
              color: white;
              font-size: 1.25rem;
              position: absolute;
              left: 50%;
              top: 50%;
              transform: translate(-50%, calc(-50% - .125rem));
            }
          }
        }
      }
    }
  }
}
</style>

<style lang="scss">
@import '@/stylesheets/color.scss';

.datetime {
  padding: .5rem .24rem .5rem 0;
}
.vdatetime{
  &-popup__header,
  &-calendar__month__day--selected > span > span,
  &-calendar__month__day--selected:hover > span > span {
    background: #a89359;
  }

  &-year-picker__item--selected,
  &-time-picker__item--selected,
  &-popup__actions__button {
    color: #a89359;
  }
}

input, .input {
  background: white !important;
  padding: 1em;
  height: 3em !important;
  border: solid 1px $rose !important;
  font-size: .9rem !important;
  width: 100%;
}
.yd-cell-box {
  margin-bottom: 1rem;
  .yd-cell {
    position: relative;
    border-radius: 3px;
    border-bottom: solid 1px $rose;
    background-color: $dirt;
    padding: 4rem 3em .5rem;
    .yd-cell-item {
      padding: .5rem 0;
    }
  }
}
.yd-checkbox {
  display: block;
  margin-bottom: 1rem;
  &-icon {
    border-color: $rose;
  }
  &-text {
    padding-left: .5rem;
  //   transform: translate(.5em, -.5em);
  //   text-align: left;
  //   position: relative;
  //   display: inline-block;
  //   .line2 {
  //     position: absolute;
  //     left: 0;
  //   }
  }
}
</style>
