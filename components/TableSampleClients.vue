<script setup>
import { computed, ref } from 'vue'
import { useMainStore } from '@/stores/main'
import { useStyleStore } from '@/stores/style'
import { mdiEye, mdiTrashCan } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'

defineProps({
  checkable: Boolean
})

const styleStore = useStyleStore()

const mainStore = useMainStore()

const items = computed(() => mainStore.isSearchingClients
  ? mainStore.clientsFound
  : mainStore.clients)

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

const isModalMessagesActive = ref(false)

const perPage = ref(10)

const currentPage = ref(0)

const checkedRows = ref([])

const itemsPaginated = computed(
  () => items.value.slice(perPage.value * currentPage.value, perPage.value * (currentPage.value + 1))
)

const numPages = computed(() => Math.ceil(items.value.length / perPage.value))

const currentPageHuman = computed(() => currentPage.value + 1)

const pagesList = computed(() => {
  const pagesList = []
  for (let i = 0; i < numPages.value; i++) {
    pagesList.push(i)
  }
  return pagesList
})

const remove = (arr, cb) => {
  const newArr = []

  arr.forEach(item => {
    if (!cb(item)) {
      newArr.push(item)
    }
  })

  return newArr
}

const checked = (isChecked, client) => {
  if (isChecked) {
    checkedRows.value.push(client)
  } else {
    checkedRows.value = remove(checkedRows.value, row => row.id === client.id)
  }
}
</script>

<template>
  <CardBoxModal
    v-model="isModalActive"
    title="Sample modal"
  >
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalMessagesActive"
    title="Сообщения пользователя"
  >
    <p>Вот тут будут последние сообщения пользователя</p>
    <!-- <p>This is sample modal</p> -->
  </CardBoxModal>

  <CardBoxModal
    v-model="isModalDangerActive"
    large-title="Please confirm"
    button="danger"
    has-cancel
  >
    <p>Lorem ipsum dolor sit amet <b>adipiscing elit</b></p>
    <p>This is sample modal</p>
  </CardBoxModal>

  <div
    v-if="checkedRows.length"
    class="p-3 bg-gray-100/50 dark:bg-slate-800"
  >
    <span
      v-for="checkedRow in checkedRows"
      :key="checkedRow.id"
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700">
      {{ checkedRow.phone }}
    </span>
  </div>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <th>Имя</th>
        <th>Фамилия</th>
        <th>Отчество</th>
        <th>Дата рождения</th>
        <th>Просмотр</th>
      </tr>
    </thead>
    <tbody>
      <tr
        v-for="client in itemsPaginated"
        :key="client.id"
      >
        <TableCheckboxCell
          v-if="checkable"
          @checked="checked($event, client)"
        />
        <td data-label="Имя">
          {{ client.name.length > 0 ? client.name : '---' }}
        </td>
        <td data-label="Фамилия">
          {{ client.surname.length > 0 ? client.surname : '---' }}
        </td>
        <td data-label="Отчество">
          {{ client.patronymic.length > 0 ? client.patronymic : '---' }}
        </td>
        <td data-label="Дата рождения">
          {{ client.birthday ? client.birthday : '---' }}
        </td>
        <td data-label="Просмотр">
          <BaseButton
            color="info"
            :icon="mdiEye"
            :to="'user/'+client.id"
          />        
        </td>
      </tr>
    </tbody>
  </table>
  <div
    class="p-3 lg:px-6 border-t border-gray-100 dark:border-slate-800"
  >
    <BaseLevel>
      <BaseButtons>
        <BaseButton
          v-for="page in pagesList"
          :key="page"
          :active="page === currentPage"
          :label="page + 1"
          small
          :outline="styleStore.darkMode"
          @click="currentPage = page"
        />
      </BaseButtons>
      <small>Страница {{ currentPageHuman }} из {{ numPages }}</small>
    </BaseLevel>
  </div>
</template>
