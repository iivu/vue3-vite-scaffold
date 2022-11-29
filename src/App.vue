<template>
  <Home/>
</template>

<script setup lang="ts">
  import { ref, onMounted } from 'vue';

  import Home from '@/views/Home.vue'
</script>

<style lang="scss">
  *,
  *:after,
  *:before {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: Inter, Avenir, Helvetica, Arial, sans-serif;
    font-size: 16px;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-text-size-adjust: 100%;
  }

  a {
    color: indianred;
    text-decoration: inherit;
  }

  a:hover {
    color: indianred;
  }

  input {
    background-color: transparent;
    border: none;
    outline: none;
  }

  #app {
    max-width: 750px;
    min-height: 100vh;
    margin: 0 auto;
  }
</style>
