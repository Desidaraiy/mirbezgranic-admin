<script setup>
import { computed, ref } from 'vue'
import { useMainStore } from '@/stores/main'
import { useStyleStore } from '@/stores/style'
import { mdiEye, mdiTrashCan, mdiPlus } from '@mdi/js'
import CardBoxModal from '@/components/CardBoxModal.vue'
import TableCheckboxCell from '@/components/TableCheckboxCell.vue'
import BaseLevel from '@/components/BaseLevel.vue'
import BaseButtons from '@/components/BaseButtons.vue'
import BaseButton from '@/components/BaseButton.vue'
import UserAvatar from '@/components/UserAvatar.vue'
import { useRouter } from 'vue-router'
const router = useRouter()

const props = defineProps({
  checkable: Boolean,
  marketId: undefined
})

const styleStore = useStyleStore()

const mainStore = useMainStore()

const items = computed(() => mainStore.currentCats)

// console.log(mainStore.currentCats)

const isModalActive = ref(false)

const isModalDangerActive = ref(false)

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


const addSubCategory = (id) => {

  // console.log(key)

  router.push('/add_category/?id='+id)

}

const addGood = (catId) => {
  router.push('/add_good/?cat_id='+catId)
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
    v-model="isModalDangerActive"
    large-title="Please confirm"
    button="success"
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
      class="inline-block px-2 py-1 rounded-sm mr-2 text-sm bg-gray-100 dark:bg-slate-700"
    >
      {{ checkedRow.name }}
    </span>
  </div>

  <table>
    <thead>
      <tr>
        <th v-if="checkable" />
        <!-- <th /> -->
        <!-- <th>Порядок</th> -->
        <th>Название</th>
        <!-- <th>Количество товаров</th> -->
        <!-- <th>Состояние</th> -->
        <th>Вкл./Выкл.</th>
        <th>Дополнительно</th>
        <th />
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
        <!-- <td data-label="Порядок">
          {{ client.position }}
        </td> -->
        <td data-label="Название">
          {{ client.name }}
        </td>
        <!-- <td data-label="Цена">
          {{ client.prodCount }}
        </td> -->
        <!-- <td 
          data-label="Состояние"
        >
            {{ client.active === 1 ? 'Активен' : 'Неактивен' }}
        </td> -->

        <td class="before:hidden lg:w-1 whitespace-nowrap" data-label="Управление">
          <FormCheckRadio type="switch" :modelValue="client.active !== 1 ? false : true" name="activeSwitch" :inputValue="client.active !== 1 ? false : true" />         
        </td>

        <td class="before:hidden lg:w-1 whitespace-nowrap" data-label="Дополнительно">
          <BaseButtons
            type="justify-start lg:justify-end"
            no-wrap
          >

            <BaseButton
              v-if="!client.isSub"
              color="success"
              outline
              label=" + подкатегория"
              small
              @click="addSubCategory(client.category_id)"
            />
            <BaseButton
              color="success"
              outline
              label=" + товар"
              small
              @click="addGood(client.category_id)"
            />

            <!-- <BaseButton
              color="white"
              label="Приоритет"
              outline
              small
              @click="isModalDangerActive = true"
            /> -->

          </BaseButtons>
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
