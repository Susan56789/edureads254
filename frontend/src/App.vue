<template>


  <router-view>
    <PageLayout />
  </router-view>


</template>

<script>

import PageLayout from './components/PageLayout.vue';

export default {
  name: 'App',
  components: {
    PageLayout
  }
}
</script>

<style></style>
./components/HomePage.vue