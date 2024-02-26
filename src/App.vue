<template>
  <LayoutVue />
  <router-view />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import LayoutVue from "./Layouts/Layout.vue";

export default defineComponent({
  components: {
    LayoutVue
  },
  data() {
    return {
      userExists: false
    };
  },
  created() {
    this.userExists = !!localStorage.getItem('user');
  }
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
