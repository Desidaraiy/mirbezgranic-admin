export default defineNuxtPlugin(() => {
    addRouteMiddleware('global-test', (to, from) => {

        const etoken = useCookie('uToken', {sameSite: 'None', secure: false})
        
        switch (to.fullPath) {
            case '/login':
                break
            default:
            const token = etoken.value
            const data = { token }
            $fetch('https://api.mirbezgranic-novsu.ru/admin/checkAuth', {
                method: 'POST',
                body: data
            }).then(r => {
                // r = JSON.parse(r)
                const resp = r.success
                if (!resp) {
                    return navigateTo('/login')
                }
            });
        }
    }, { global: true })
  })