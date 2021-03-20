<template>
  <div class="home"></div>
</template>

<script lang="ts">
import Vue from 'vue'
import request from '@/utils/request'
export default Vue.extend({
  name: 'Test',
  mounted () {
    request({
      method: 'GET',
      url: '/getUserInfo'
    }).then(res => {
      this.$store.commit('user/SET_TOKEN', res.data.data.token)
    })
  }
})
</script>

<style lang="scss">
</style>
