<script setup>
import {
  mdiForwardburger,
  mdiBackburger,
  mdiMenu
} from '@mdi/js'
import { useRouter } from 'vue-router'
import menuAside from '@/configs/menuAside.js'
import menuNavBar from '@/configs/menuNavBar.js'
import { useMainStore } from '@/stores/main.js'
import { useLayoutStore } from '@/stores/layout.js'
import { useStyleStore } from '@/stores/style.js'
import BaseIcon from '@/components/BaseIcon.vue'
import FormControl from '@/components/FormControl.vue'
import NavBar from '@/components/NavBar.vue'
import NavBarItemPlain from '@/components/NavBarItemPlain.vue'
import AsideMenu from '@/components/AsideMenu.vue'
import FooterBar from '@/components/FooterBar.vue'
import { apiBaseUrl } from '@/configs/fetchBaseUrl'
const etoken = useCookie('uToken', {sameSite: 'None', secure: true})

const layoutAsidePadding = 'xl:pl-60'

const styleStore = useStyleStore()

const layoutStore = useLayoutStore()

const router = useRouter()

// router.beforeEach((to, from) => {
//   layoutStore.isAsideMobileExpanded = false
//   layoutStore.isAsideLgActive = false
// })

const menuClick = (event, item) => {
  if (item.isToggleLightDark) {
    styleStore.setDarkMode()
  }

  if (item.isLogout) {
  //   const token = etoken.value
  //   const data = { token }
  //   const path = apiBaseUrl+'log-out'
  //   $fetch(path, {
  //     method: 'POST',
  //     body: data
  //   }).then(r => {
  //     r = JSON.parse(r)
  //     const resp = r.message
  //     if(resp === 'ok'){ 
        etoken.value = ''
        router.push('/login')     
    //   }
    // });
  }
}
</script>

<template>
  <div :class="{ 'dark': styleStore.darkMode, 'overflow-hidden lg:overflow-visible': layoutStore.isAsideMobileExpanded }">
    <div
      :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': layoutStore.isAsideMobileExpanded }]"
      class="pt-14 min-h-screen w-screen transition-position lg:w-auto bg-gray-50 dark:bg-slate-800 dark:text-slate-100"
    >
      <NavBar
        :menu="menuNavBar"
        :class="[layoutAsidePadding, { 'ml-60 lg:ml-0': layoutStore.isAsideMobileExpanded }]"
        @menu-click="menuClick"
      >
        <NavBarItemPlain
          display="flex lg:hidden"
          @click.prevent="layoutStore.asideMobileToggle()"
        >
          <BaseIcon
            :path="layoutStore.isAsideMobileExpanded ? mdiBackburger : mdiForwardburger"
            size="24"
          />
        </NavBarItemPlain>
        <NavBarItemPlain
          display="hidden lg:flex xl:hidden"
          @click.prevent="layoutStore.isAsideLgActive = true"
        >
          <BaseIcon
            :path="mdiMenu"
            size="24"
          />
        </NavBarItemPlain>
        <!-- <NavBarItemPlain use-margin>
          <FormControl
            placeholder="Search (ctrl+k)"
            ctrl-k-focus
            transparent
            borderless
          />
        </NavBarItemPlain> -->
      </NavBar>
      <AsideMenu
        :menu="menuAside"
        @menu-click="menuClick"
      />
      <slot />
      <FooterBar />
    </div>
  </div>
</template>
