<template>
  <div>
    <b-navbar toggleable="md" type="dark" variant="info">
      <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
      <b-navbar-brand href="#">Address Book</b-navbar-brand>

      <b-collapse is-nav id="nav_collapse">
        <b-navbar-nav>
          <b-nav-item to="/main/create">입력</b-nav-item>
          <b-nav-item to="/main/list">조회</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-navbar-nav class="mr-3">
            <b-nav-text>{{user.id}}님 안녕하세요</b-nav-text>
          </b-navbar-nav>

          <b-nav-form>
            <b-button size="sm" @click="logout">로그아웃</b-button>
          </b-nav-form>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
import { store } from "../models";
import EventBus from "./eventBus";

export default {
  methods: {
    logout: function() {
      store.isLogin = false;
      EventBus.$emit("loginChk");
    }
  },
  data() {
    return {
      user: ""
    };
  },
  mounted() {
    this.user = store.userInfo;
  }
};
</script>

<style>
</style>
