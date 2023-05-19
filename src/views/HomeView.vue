<template>
  <FullBoxVue class="shadowHover">
    <hello-world />
  </FullBoxVue>

</template>

<script>
import HelloWorld from '../components/HelloWorld'
import FullBoxVue from '../components/static/FullBox.vue'
export default {
  name: 'HomeView',
  components: {
    HelloWorld,
    FullBoxVue
  }
}
</script>

<style scoped>
.home {
  background: #fff;
}
</style>
