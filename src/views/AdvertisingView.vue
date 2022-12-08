<template>
  <div>
    <HeaderComponent
      :emit-type="title"
      :emit-group="group"
    />
    <main class="py40">
      <router-view/>
    </main>
  </div>
</template>

<script>
import HeaderComponent from '@/components/HeaderComponent.vue';

export default {
  data() {
    return {
      title: '',
      group: 'advertising',
    };
  },
  components: {
    HeaderComponent,
  },
  created() {
    if (!this.$cookies.get('cw-banner-generator-advertising-logged')) {
      this.$router.push({
        path: '/',
      });
    }
  },
  mounted() {
    this.title = this.$route.meta.title;
  },
  watch: {
    $route(to) {
      this.title = to.meta.title;
    },
  },
};
</script>
