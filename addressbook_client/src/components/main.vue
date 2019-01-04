<template>
  <div>
    <headerbar></headerbar>
    <!-- sidebar 영역 -->
    <router-view/>
  </div>
</template>

<script>
import router from "../router";
import EventBus from "./eventBus";
import { store } from "../models";
import headerbar from "./header";

export default {
  components: {
    headerbar: headerbar
  },
  mounted() {
    router.push("main/list");
  }
};
</script>

<style>
</style>
