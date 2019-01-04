<template>
  <div>
    <b-container>
      <h1>로그인</h1>
      <b-form @submit.prevent="login">
        <b-form-group id="idGroup"
                    label="아이디"
                    label-for="id">
        <b-form-input id="id"
                      type="text"
                      v-model="id"
                      required
                      autofocus
                      placeholder="아이디를 입력 하세요">
        </b-form-input>
      </b-form-group>
      <b-form-group id="passwordGroup" 
                    label="패스워드" 
                    label-for="password">
        <b-form-input id="password" 
                      type="password" 
                      required 
                      v-model="password"
                      placeholder="패스워드를 입력하세요"></b-form-input>
      </b-form-group>

      <b-alert variant="danger"
             dismissible
             :show="showDismissibleAlert"
             @dismissed="showDismissibleAlert=false">
        {{ errorMsg }}
      </b-alert>

      <b-button type="submit" class="btn-block" variant="primary">로그인</b-button>
      </b-form>
    </b-container>
  </div>
</template>

<script>
import { store } from "../models";
import EventBus from "./eventBus";
import axios from "axios";

export default {
  data() {
    return {
      id: "",
      password: "",
      showDismissibleAlert: false,
      errorMsg: ""
    };
  },
  methods: {
    created: function() {
      EventBus.$on();
    },
    async getToken() {
      try {
        const res = await axios.post(
          "http://localhost:3000/auth/login",
          this.$data
        );
        store.token = res.data.token;
        store.isLogin = true;
      } catch (error) {
        console.log(error.response);
        this.id = "";
        this.password = "";
        this.errorMsg = error.response.data.message;
        this.showDismissibleAlert = true;
      }
    },
    async getUserInfo() {
      try {
        const res = await axios.get("http://localhost:3000/auth/me", {
          headers: {
            Authorization: store.token
          }
        });
        store.userInfo = res.data.info;
      } catch (error) {
        console.log("유저 정보 획득 에러");
        console.log(error.response);
      }
    },
    async login() {
      await this.getToken();
      await this.getUserInfo();
      EventBus.$emit("loginChk");
    }
  }
};
</script>

<style>
</style>
