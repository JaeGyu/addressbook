<template>
  <div>
    <h1>list</h1>
    <ul>
      <li
        v-for="member in members"
        :key="member.id"
      >{{member.id}} | {{member.name}} | {{member.address}} | {{member.cellphone}} | {{member.phone}}</li>
    </ul>
    <h1 v-show="errorMsg">{{ errorMsg }}</h1>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../models";

export default {
  data() {
    return {
      members: [],
      errorMsg: ""
    };
  },
  methods: {
    getAddress: function() {
      console.log("서버에서 주소록 데이터를 가져온다.");
      console.log("token : ", store.token);
      axios
        .get("http://localhost:3000/address/members", {
          headers: {
            Authorization: store.token
            // Authorization: 'a'
          }
        })
        .then(res => {
          console.log(res.data);
          this.members = res.data;
          this.errorMsg = '';
        })
        .catch(error => {
          console.log("err :: ", error.response);
          this.errorMsg = error.response.data.message;
        });
    }
  },
  mounted() {
    this.getAddress();
  }
};
</script>

<style>
</style>
