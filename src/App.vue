<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  name: 'APP',
  mounted () {
    console.log(process.env.NODE_ENV)
  }
})
</script>
<style>
</style>
