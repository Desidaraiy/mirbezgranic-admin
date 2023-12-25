<script setup>
import { computed } from 'vue'
import { containerMaxW } from '@/configs/config.js';
import BaseLevel from '@/components/BaseLevel.vue'

const year = computed(() => new Date().getFullYear())
</script>

<template>
  <footer
    class="py-2 px-6"
    :class="containerMaxW"
  >
    <BaseLevel>
      <div class="text-center md:text-left">
        <b>&copy;{{ year }}, <a
          href="#"
          target="_blank"
        >Мир без границ</a>.</b>
        <a
          href=""
          target="_blank"
          class="text-blue-600"
        > Пользовательское соглашение</a>
      </div>
    </BaseLevel>
  </footer>
</template>
