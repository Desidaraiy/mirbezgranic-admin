<script setup>
import { mdiCog } from '@mdi/js'
import { computed, useSlots } from 'vue'
import BaseIcon from '@/components/BaseIcon.vue'
import { useMainStore } from '@/stores/main'
const props = defineProps({
  title: {
    type: String,
    default: null
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
    default: 'rounded-xl'
  },
  flex: {
    type: String,
    default: 'flex-col'
  },
  hasTable: Boolean,
  hasSearchbar: Boolean,
  empty: Boolean,
  form: Boolean,
  hoverable: Boolean,
  modal: Boolean
})
const mainStore = useMainStore()

const controller = reactive({
  query: '',
  searching: false
})

const emit = defineEmits(['header-icon-click', 'submit'])

const is = computed(() => props.form ? 'form' : 'div')

const slots = useSlots()

const footer = computed(() => slots.footer && !!slots.footer())

const componentClass = computed(() => {
  const base = [
    props.rounded,
    props.flex,
    props.modal ? 'dark:bg-slate-900' : 'dark:bg-slate-900/70'
  ]

  if (props.hoverable) {
    base.push('hover:shadow-lg transition-shadow duration-500')
  }

  return base
})

const searchController = () => {
  mainStore.setSearchingClients(controller.query !== '' ? true : false)
  mainStore.setSearchingClientsQuery(controller.query);
}

const computedHeaderIcon = computed(() => props.headerIcon ?? mdiCog)

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
    class="bg-white flex"
    @submit="submit"
  >
    <header
      v-if="title"
      class="flex items-stretch border-b border-gray-100 dark:border-slate-800"
    >
      <div
        class="flex items-center py-3 grow font-bold"
        :class="[ icon ? 'px-4' : 'px-6' ]"
      >
        <BaseIcon
          v-if="icon"
          :path="icon"
          class="mr-3"
        />
        {{ title }}
      </div>
      <div class="searchbar_wrapper py-2 px-2 " v-if="hasSearchbar">
        <input 
          type="text" 
          class="py-2 px-2 rounded-md text-sm text-black-700" 
          placeholder="Поиск..."
          v-model="controller.query"
          @keyup="searchController"
          />
      </div>
      <button
        class="flex items-center py-3 px-4 justify-center ring-blue-700 focus:ring"
        @click="headerIconClick"
      >
        <BaseIcon :path="computedHeaderIcon" />
      </button>
    </header>
    <div
      v-if="empty"
      class="text-center py-24 text-gray-500 dark:text-slate-400"
    >
      <p>Nothing's here…</p>
    </div>
    <div
      v-else
      class="flex-1"
      :class="{'p-6':!hasTable}"
    >
      <slot />
    </div>
    <div
      v-if="footer"
      class="p-6 border-t border-gray-100 dark:border-slate-800"
    >
      <slot name="footer" />
    </div>
  </component>
</template>
