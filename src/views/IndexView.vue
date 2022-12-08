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
      group: false,
    };
  },
  components: {
    HeaderComponent,
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
