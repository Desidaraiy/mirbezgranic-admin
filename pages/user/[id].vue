<script setup>
import { computed, ref, reactive, onMounted } from 'vue'
import { useMainStore } from '@/stores/main'
import {
  mdiChevronLeft
} from '@mdi/js'

import SectionMain from '@/components/SectionMain.vue'
import { useRouter } from 'vue-router'

import CardBox from '@/components/CardBox.vue'

const router = useRouter()
const mainStore = useMainStore()
const client = computed(() => mainStore.currentClient)

onMounted(() => {
  mainStore.setCurrentClient(router.currentRoute.value.params.id)
})
</script>

<template>
  <div>
    <NuxtLayout name="authenticated">
      <SectionMain>
      <SectionTitleLine
        :icon="mdiChevronLeft"
        :title="'Пользователь / ' + $route.params.id"
        :back="true"
        main
      >
      </SectionTitleLine>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <CardBox title="Информация">
            <p>Имя: {{ client.name }}</p>
            <p>Фамилия: {{ client.surname }}</p>
            <p>Отчество: {{ client.patronymic }}</p>
            <p>Дата рождения: {{ client.birthday }}</p>
            <p>Страна: {{ client.country }}</p>
            <p>E-mail: {{ client.email }}</p>
            <p>Пол: {{ client.sex }}</p>
          </CardBox>
          <CardBox title="Документы">
            <p>Дата прибытия: {{ client.documentsDateOfArrival }}</p>
            <p>Окончание визы: {{ client.documentsDateOfVisaExpiring }}</p>
            <p>Окончание паспорта: {{ client.documentsDateOfPassportExpiring }}</p>
          </CardBox>
          <CardBox title="Образование">
            <p>Год поступления: {{ client.universityYearOfEntry }}</p>
            <p>Курс обучения: {{ client.universityCourse }}</p>
            <p>Учебное подразделение: {{ client.universityAcademicUnit }}</p>
            <p>Институт: {{ client.universityUnit }}</p>
            <p>Направление: {{ client.univeristyFaculty }}</p>
          </CardBox>
          <CardBox title="Контактное лицо">
            <p>Фамилия: {{ client.contactPersonSurname }}</p>
            <p>Имя: {{ client.contactPersonName }}</p>
            <p>Отчество: {{ client.contactPersonPatronymic }}</p>
            <p>E-mail: {{ client.contactPersonEmail }}</p>
            <p>Номер телефона: {{ client.contactPersonPhone }}</p>
            <p>Кем приходится: {{ client.contactPersonIsForMe }}</p>
          </CardBox>
        </div>
    </SectionMain>
    </NuxtLayout>
  </div>

</template>
