<script setup>
import { mdiCog } from '@mdi/js'
import { useMainStore } from '@/stores/main'
import { computed } from 'vue'
import Icon from '@/components/Icon.vue'

const props = defineProps({
  title: {
    type: String,
    default: null
  },
  hTitle: {
    type: String,
    default: null
  },
  hTitleStyle: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: null
  },
  headerIcon: {
    type: String,
    default: null
  },
  rounded: {
    type: String,
    default: 'md:rounded'
  },
  hasTable: Boolean,
  empty: Boolean,
  form: Boolean,
  hoverable: Boolean,
  modal: Boolean
})

const emit = defineEmits(['header-icon-click', 'submit'])

const is = computed(() => props.form ? 'form' : 'div')

const mainStore = useMainStore()

const lightBorderStyle = computed(() => mainStore.lightBorderStyle)

const componentClass = computed(() => {
  const base = [
    props.rounded,
    lightBorderStyle.value,
    props.modal ? 'dark:bg-gray-900' : 'dark:bg-gray-900/70'
  ]

  if (props.hoverable) {
    base.push('hover:shadow-lg transition-shadow duration-500')
  }
  return base
})

const computedHeaderIcon = props.hTitle === null ? computed(() => props.headerIcon ?? mdiCog) : false

const headerIconClick = () => {
  emit('header-icon-click')
}

const submit = e => {
  emit('submit', e)
}
</script>

<template>
  <component
    :is="is"
    :class="componentClass"
    class="bg-white border dark:border-gray-800"
    @submit="submit"
  >
    <header
      v-if="title"
      :class="lightBorderStyle"
      class="flex items-stretch border-b dark:border-gray-800"
    >
      <p
        class="flex items-center py-3 grow font-bold"
        :class="[ icon ? 'px-4' : 'px-6' ]"
      >
        <icon
          v-if="icon"
          :path="icon"
          class="mr-3"
        />
        {{ title }}
      </p>
      <a
        v-if="computedHeaderIcon"
        href="#"
        class="flex items-center py-3 px-4 justify-center ring-blue-700 focus:ring"
        aria-label="more options"
        @click.prevent="headerIconClick"
      >
        <icon :path="computedHeaderIcon" />
      </a>
      <span
        v-else
        class="py-3 px-4 font-light"
      >{{ hTitle }}</span>
    </header>
    <div
      v-if="empty"
      class="text-center py-24 text-gray-500 dark:text-gray-400"
    >
      <p>Nothing's here…</p>
    </div>
    <div
      v-else
      :class="{'p-6':!hasTable}"
    >
      <slot />
    </div>
  </component>
</template>
