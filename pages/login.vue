<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { mdiAccount, mdiAsterisk, mdiDoor} from '@mdi/js'
import SectionFullScreen from '@/components/SectionFullScreen.vue'
import CardBox from '@/components/CardBox.vue'
import FormCheckRadio from '@/components/FormCheckRadio.vue'
import FormField from '@/components/FormField.vue'
import FormControl from '@/components/FormControl.vue'
import BaseButton from '@/components/BaseButton.vue'
import BaseButtons from '@/components/BaseButtons.vue'
// import LayoutGuest from '@/layouts/LayoutGuest.vue'
import { useMainStore } from '@/stores/main.js'
import { apiBaseUrl } from '@/configs/fetchBaseUrl'

const form = reactive({
  login: '',
  password: ''
})

const mainStore = useMainStore()
const router = useRouter()

const etoken = useCookie('uToken', {sameSite: true, secure: true})

const submit = async () => {
  const path = apiBaseUrl+'admin/login'
  await $fetch(path, {
    method: 'POST',
    body: form
  }).then(r => {
    const resp = r.success
    if(resp){ 
      etoken.value = r.token
      mainStore.setUserName(r.name)
      router.push('/')       
    }else{
      alert(resp)
    }
  });

}
</script>

<template>

  <div>
    <NuxtLayout>
      <SectionFullScreen
      v-slot="{ cardClass }"
      bg="greenIndigo"
    >
      <CardBox
        :class="cardClass"
        class="max-h-screen overflow-y-auto"
        form
        title="Кабинет администратора - вход"
        :headerIcon="mdiDoor"
        @submit.prevent="submit"
      >
        <FormField
          label="Логин"
          help="Введите свой логин"
        >
          <FormControl
            v-model="form.login"
            :icon="mdiAccount"
            name="login"
          />
        </FormField>

        <FormField
          label="Пароль"
          help="Введите свой пароль"
        >
          <FormControl
            v-model="form.password"
            :icon="mdiAsterisk"
            type="password"
            name="password"
          />
        </FormField>
        <template #footer>

          <BaseButtons>
            <BaseButton
              type="submit"
              color="success"
              small
              label="Войти"
            />
          </BaseButtons>
        </template>
      </CardBox>
    </SectionFullScreen>
    </NuxtLayout>
  </div>

</template>
