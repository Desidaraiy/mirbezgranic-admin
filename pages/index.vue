<script setup>
import { computed, ref, reactive, onMounted } from 'vue'
import { useMainStore } from '@/stores/main'
import {
  mdiShieldAccount
} from '@mdi/js'

import SectionMain from '@/components/SectionMain.vue'
import CardBoxWidget from '@/components/CardBoxWidget.vue'
import { useRouter } from 'vue-router'

const mainStore = useMainStore()

onMounted( async () => {
  mainStore.fetchClients()
})

const isClientsEmpty = computed(() => mainStore?.clients.length == 0)


</script>

<template>
  <div>
    <NuxtLayout name="authenticated">
      <SectionMain>
      <SectionTitleLine
        :icon="mdiShieldAccount"
        title="Пользователи"
        main
      >
      </SectionTitleLine>

      <div v-if="!isClientsEmpty">
        <CardBox
          :icon="mdiShieldAccount"
          title="&nbsp;"
          has-table
          has-searchbar>
          <TableSampleClients
          :checkable="false"
        /></CardBox>
      </div>
      <div
        v-else>
        <div class="flex flex-row justify-center items-center h-96">
          <div class="text-center">
            <p class="text-gray-500 dark:text-slate-400">Нет данных</p></div>
        </div>
      </div>
    </SectionMain>
    </NuxtLayout>
  </div>

</template>
