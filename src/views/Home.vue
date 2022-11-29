<template>
  <button @click="t">Toast</button>
  <button @click="validate">validate</button>
</template>

<script setup lang="ts">
  import { showToast,validateIDCard } from '@iivu/utils';

  const t = () => showToast('1111')
  const validate = () => console.log(validateIDCard('1111111'))
</script>
