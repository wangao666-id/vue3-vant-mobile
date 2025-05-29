<script setup lang="ts">
// import useRouteCache from '@/stores/modules/routeCache'

useHead({
  title: '浦东青年夜校春季班',
  meta: [
    {
      name: 'description',
      content: 'An mobile web apps template based on the Vue 3 ecosystem',
    },
    {
      name: 'theme-color',
      content: () => isDark.value ? '#00aba9' : '#ffffff',
    },
  ],
  link: [
    {
      rel: 'icon',
      type: 'image/svg+xml',
      href: () => preferredDark.value ? '/favicon-dark.svg' : '/favicon.svg',
    },
  ],
})

// const keepAliveRouteNames = computed(() => {
//   return useRouteCache().routeCaches as string[]
// })
// const mode = computed(() => {
//   return isDark.value ? 'light' : 'light'
// })
</script>

<template>
  <van-config-provider theme="light">
    <nav-bar />
    <router-view v-slot="{ Component, route }">
      <section class="app-wrapper">
        <keep-alive :include="['Home']">
          <component :is="Component" :key="route.name" />
        </keep-alive>
      </section>
    </router-view>
<!--    <tab-bar />-->
  </van-config-provider>
</template>

<style scoped>
.app-wrapper {
  width: 100%;
  position: relative;
}
</style>
