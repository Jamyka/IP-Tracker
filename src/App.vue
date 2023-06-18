<template>
  <transition name="fade">
    <Loader />
  </transition>
  <TrackingPage />
</template>

<script>
import '../src/css/styles.scss'
import TrackingPage from './components/TrackingPage.vue';
import Loader from './components/loader.vue';

export default {
  name: 'App',
  components: {
    TrackingPage,
    Loader
  },
}
</script>
