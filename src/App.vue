<template>
  <Layout />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Layout from './Layouts/_layout.vue';

export default defineComponent({
  components: {
    Layout
  },

});
</script>

<style lang="scss">
nav {

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
