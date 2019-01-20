<template>
  <yd-cell-group>
    <yd-cell-item>
      <yd-icon slot="icon" name="phone3" size=".45rem"></yd-icon>
      <input type="text" slot="right" placeholder="请输入手机号码">
      <yd-sendcode slot="right"
                    v-model="isSending"
                    @click.native="sendCode"
                    type="warning"
      ></yd-sendcode>
    </yd-cell-item>
    <yd-cell-item>

    </yd-cell-item>
  </yd-cell-group>
</template>

<script>
export default {
  data () {
    return {
      isSending: false
    }
  },
  computed: {

  },
  methods: {
    sendCode () {
      this.$dialog.loading.open('发送中...')
      setTimeout(() => {
        this.start1 = true
        this.$dialog.loading.close()

        this.$dialog.toast({
          mes: '已发送',
          icon: 'success',
          timeout: 1500
        })
      }, 1000)
    }
  }
}
</script>

<style>

</style>
