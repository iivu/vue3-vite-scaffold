import { ref } from 'vue';

export function useModalVisible(initialVisible = false) {
  const visible = ref(initialVisible);

  function open() {
    visible.value = true;
  }

  function close() {
    visible.value = false;
  }

  return { visible, open, close };
}
