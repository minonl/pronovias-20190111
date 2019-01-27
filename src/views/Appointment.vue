<template>
  <form class="appointment" @submit.prevent="submit">
    <yd-popup v-model="popLogin" position="center" width="90%">
      <Login ref="loginWindow"/>
    </yd-popup>
    <yd-popup v-model="popWarning" position="center" width="90%">
      <Warning ref="warningWindow"/>
    </yd-popup>
    <div class="store" :style="{'background-image': 'url('+store.poster+')'}">
      <div class="inner">
        <div class="name">{{store.name}}</div>
        <div class="address">{{store.address}}</div>
      </div>
    </div>
    <div class="title">预约申请</div>
    <yd-cell-group :class="{'active':tgContact}">
      <div class="label">
        <span class="no">1</span>联系方式<span class="toggle" :class="{'active': tgContact}" @click="tgContact=!tgContact"/>
        </div>
      <yd-cell-item>
        <input slot="right" type="text" required placeholder="姓名*" @invalid="tgContact=true"
          v-model="name">
      </yd-cell-item>
      <yd-cell-item>
        <div class="phone-input-wrapper" slot="right" @click.self="login">
          <input type="number" ref="phoneInput" required @invalid="tgContact=true" disabled="disabled" placeholder="电话*"
            v-model="phone">
        </div>
      </yd-cell-item>
      <yd-cell-item>
        <input slot="right" type="email" placeholder="邮箱" @invalid="tgContact=true"
          v-model="email">
      </yd-cell-item>
    </yd-cell-group>
    <div class='box' :class="{'active':tgDate}">
      <div class="label"><span class="no">2</span>选择预约日期<span class="toggle" :class="{'active': tgDate}" @click="tgDate=!tgDate"/></div>
      <div class="icon icon-calendar"/>
      <div class="icon icon-clock"/>
      <div v-if="!isWarned" class="first-time-warning" @click="warn"/>
      <datetime
        input-class="input"
        class="datetime"
        type="date"
        :min-datetime="minDate"
        format="yyyy-MM-dd"
        placeholder="选择日期*"
        :phrases="{ok: '确认', cancel: '取消'}"
        v-model="date"/>
      <datetime
        input-class="input"
        class="datetime"
        type="time"
        :min-datetime="minDate"
        format="hh:mm"
        placeholder="选择时间*"
        :phrases="{ok: '确认', cancel: '取消'}"
        v-model="date"/>

    </div>
    <yd-cell-group :class="{'active':tgTrail}">
      <div class="label"><span class="no">3</span>挑选你的婚纱<span class="toggle" :class="{'active': tgTrail}" @click="tgTrail=!tgTrail"/></div>
      <yd-cell-item>
        <!-- <Button class="reselect" @click.native.prevent="clearList" slot="right" >重新挑选</Button> -->
        <div slot="left">
          <div class="list">
            <ul class="cart">
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
          </div>
          <Button class="reselect" @click.native.prevent="clearList" >重新挑选</Button>
        </div>
      </yd-cell-item>
    </yd-cell-group>
    <yd-checkbox v-model="agree" color="#a89359">
      <span>
        我同意<span class="rule">PRONOVIAS 的预约规则</span>
      </span>
      <!-- <p class="line2">the make an appointment form</p> -->
    </yd-checkbox>
    <Button type="submit">提交预约</Button>
  </form>
</template>

<script>
import Button from '@/components/Button'
import Login from '@/components/Login'
import Warning from '@/components/Warning'
import { mapActions } from 'vuex'
import config from '@/config'
import { DateTime } from 'luxon'

export default {
  components: {
    Button,
    Login,
    Warning
  },
  data () {
    return {
      imageBaseUrl: config.imageBaseUrl,
      tgContact: true,
      tgDate: false,
      tgTrail: true,
      popLogin: false,
      popWarning: false,
      store: {
        name: 'PRONOVIAS 恒隆广场店',
        address: '上海市静安区南京西路1266号',
        poster: require('@/assets/images/booking/store.jpg')
      },
      isWarned: false
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
      }
      // set (value) {
      //   this.updatePhone(value)
      // }
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
    },
    token () {
      return this.$store.state.login.data.token
    },
    minDate () {
      let day = new Date()
      day.setDate(day.getDate() + 1)
      day.setHours(10)
      return day.toISOString()
    }
  },
  watch: {
    booking (b) {
      if (b) {
        if (b.code === 0) {
          this.$router.push('/upload')
        } else {
          this.$dialog.toast({
            mes: b.message,
            icon: 'failure',
            timeout: 1500
          })
        }
      }
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
    warn () {
      // if (!this.isWarned) {
      this.popWarning = true
      this.isWarned = true
      // }
    },
    login () {
      this.popLogin = true
    },
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
        this.tgTrail = true
      }
      if (!this.date || !this.date.length) {
        message = '请选择预约日期'
        icon = 'failure'
        this.tgDate = true
      }
      // if (!this.email || !this.email.length) {
      //   message = '请输入邮箱地址'
      // }
      if (!this.name || !this.name.length) {
        message = '请输入姓名'
        icon = 'failure'
        this.tgContact = true
      }
      if (!this.phone || !this.phone.length > 0) {
        message = '请输入手机号'
        icon = 'failure'
        this.tgContact = true
      }
      if (icon !== 'success') {
        this.$dialog.toast({
          mes: message,
          icon: icon,
          timeout: 1500
        })
      } else {
        const postData = {
          params: {
            token: this.$store.state.login.data.token
          },
          data: {
            name: this.name,
            phone: this.phone,
            email: this.email,
            date: DateTime.fromISO(this.date).toFormat('yyyy-MM-dd HH:mm'),
            product_ids: this.cart.map(p => p.id)
          }
        }
        this.submitAppointment(postData)
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
  padding-bottom: 2rem;
  .store {
    height: 60vw;
    background-size:cover;
    background-repeat: no-repeat;
    background-position: center;
    position: relative;
    .inner {
      color: white;
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%,-50%);
      .name {
        padding: 1em 0;
        font-weight: bold;
      }
    }
  }
  .title {
    padding: .25rem;
    font-size: 1rem;
  }
  .box {
    position: relative;
    border-radius: 3px;
    border-bottom: solid 1px $rose;
    padding: 3.5rem 3em 0rem;
    background: $dirt;
    margin-bottom: 1rem;
    max-height: 3rem;
    transition: all .3s ease-in-out;
    &.active {
      max-height: 30rem;
      padding-bottom: 1rem;
      .first-time-warning {
        height: 100%;
      }
    }
    .first-time-warning {
      position: absolute;
      top: 4.5rem;
      left: 0;
      width: 100%;
      height: 0;
      background: transparent;
      z-index: 5;
      padding: 0 1rem;
    }
    overflow: hidden;
    $iconSize: 1.25rem;
    .icon {
      pointer-events: none;
      position: absolute;
      background: red;
      transform: translateY(-50%);
      width: $iconSize;
      height: $iconSize;
      right: 3.5rem;
      &-calendar {
        top: 5.8125rem;
        background: center / contain no-repeat url('~@/assets/images/booking/calendar.png');
      }
      &-clock {
        top: 9.6125rem;
        background: center / contain no-repeat url('~@/assets/images/booking/clock.png');
      }
    }
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
    .toggle {
      position: absolute;
      right: 3em;
      top: 50%;
      transform: translateY(-50%);
      width: 1.5rem;
      height: 1.5rem;
      background-image: url('~@/assets/images/booking/accordin.png');
      background-size: contain;
      background-position: center;
      filter: opacity(.3);
      transition: all .3s ease;
      &.active {
        filter: opacity(1);
      }
    }
  }
}

.reselect {
  // position: absolute;
  // top: 1rem;
  padding-left: 2em;
  padding-right: 2em;
  background: $gold;
  border-color: transparent;
  color: white;
  margin: 0 auto;
  display: block;
}
.list {
  display: flex;
}
.cart {
  width: 80vw;
  text-align: center;
  display: block;
  margin: .8vw 0;
  li {
    float: left;
    width: 25vw;
    height: 25vw;
    display: inline-block;
    text-align: center;
    background-color: white;
    margin-left: .8vw;
    margin-right: .8vw;
    margin-bottom: 1.6vw;
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
.phone-input-wrapper {
  width: 100%;
  input {
    pointer-events: none;
    width: 100% !important;
  }
}
</style>

<style lang="scss">
@import '@/stylesheets/color.scss';

.datetime {
  padding: 1rem .24rem 0 0;
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
  // &:disabled {
  //   background-color: $sand !important;
  // }
}
.yd-cell-box {
  margin-bottom: 1rem;
  &.active {
    .yd-cell {
      max-height: 30rem;
      padding-bottom: 1rem;
    }
  }
  .yd-cell {
    position: relative;
    border-radius: 3px;
    border-bottom: solid 1px $rose;
    background-color: $dirt;
    padding: 3.5rem 3em 0rem;
    margin-bottom: 1rem;
    overflow: hidden;
    max-height: 3rem;
    transition: all .3s ease-in-out;
    .yd-cell-item {
      padding: 1rem 0 0 0;
    }
  }
}
.yd-checkbox {
  display: block;
  margin-bottom: 1rem;
  &-icon {
    border-color: $rose;
    margin-right: .25rem;
  }
  &-text {
    .rule {
      color: $gold;
      padding: .25em;
      border-bottom: solid 1px $gold;
    }

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
