<template>
    <span :style="{ fontSize: `${scaledFontSize}${props.unit}` }"><slot /></span>
  </template>
  
  <script setup lang="ts">
    import { ref, computed } from 'vue';
    import { isWeixinBrowser, isIOS } from '@iivu/utils';
  
    type Props = {
      fontSize: number;
      unit?: string;
    };
  
    const props = withDefaults(defineProps<Props>(), { unit: 'rem' });
  
    const scaledFontSize = computed(() => {
      const winWidth = Math.min(window.innerWidth, 750);
      const size = (winWidth * 100) / 750;
      if (!isWeixinBrowser() && !isIOS()) {
        const realSize = parseFloat(window.getComputedStyle(window.document.documentElement).fontSize);
        const ratio = size / realSize;
        return props.fontSize * ratio;
      } else {
        return props.fontSize;
      }
    });
  </script>
  