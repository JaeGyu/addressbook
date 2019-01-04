<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
import router from "../router";
import { store } from "../models";
import EventBus from "./eventBus";

/**
 * 로그인체크 후 false이면 로그인 화면으로 간다.
 * 로그인상태를 체크를 해서 false이면 로그인 화면으로 true이면 메인 화면으로 이동한다.
 */
export default {
  created() {
    EventBus.$on("loginChk", this.isLogin);
  },
  methods: {
    isLogin: function() {
      if (store.isLogin) {
        router.push("/main");
      } else {
        router.push("/login");
      }
    }
  },
  mounted: function() {
    this.isLogin();
  }
};
</script>

<style>
</style>
