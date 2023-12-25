import {
  mdiAccount,
  mdiLogout,
  mdiThemeLightDark,
} from '@mdi/js'

export default [
  {
    isCurrentUser: true,
    // menu: [
    //   {
    //     icon: mdiAccount,
    //     label: 'Администраторы',
    //     to: '/admins'
    //   },
    //   {
    //     isDivider: true
    //   },
    //   {
    //     icon: mdiLogout,
    //     label: 'Выйти',
    //     isLogout: true
    //   }
    // ]
  },
  {
    icon: mdiThemeLightDark,
    label: 'Темная/Светлая тема',
    isDesktopNoLabel: true,
    isToggleLightDark: true
  },
  {
    icon: mdiLogout,
    label: 'Выйти',
    isDesktopNoLabel: true,
    isLogout: true
  }
]