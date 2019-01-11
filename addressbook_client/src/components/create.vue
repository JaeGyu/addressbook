<template>
  <div>
    <b-container class="mt-3">
      <b-card bg-variant="light">
        <b-form @submit.prevent="save">
          <b-form-group
            horizontal
            breakpoint="lg"
            label="주소록 입력"
            label-size="lg"
            label-class="font-weight-bold pt-0"
            class="mb-0"
          >
            <b-form-group horizontal label="이름:" label-class="text-sm-right" label-for="name">
              <b-form-input
                v-model="member.name"
                id="name"
                placeholder="성함을 입력하세요"
                autofocus
                required
              ></b-form-input>
            </b-form-group>
            <b-form-group horizontal label="주소:" label-class="text-sm-right" label-for="address">
              <b-form-input v-model="member.address" id="address" placeholder="주소를 입력하세요"></b-form-input>
            </b-form-group>
            <b-form-group horizontal label="휴대폰:" label-class="text-sm-right" label-for="cellphone">
              <b-form-input v-model="member.cellphone" id="cellphone" placeholder="휴대폰 번호를 입력하세요"></b-form-input>
            </b-form-group>
            <b-form-group horizontal label="집전화:" label-class="text-sm-right" label-for="phone">
              <b-form-input v-model="member.phone" id="phone" placeholder="집 전화번호를 입력하세요"></b-form-input>
            </b-form-group>
            <b-form-group horizontal label="우편번호:" label-class="text-sm-right" label-for="zipcode">
              <b-form-input v-model="member.zipcode" id="zipcode" placeholder="우편번호를 입력하세요"></b-form-input>
            </b-form-group>
            <b-form-group horizontal>
              <b-button type="submit">저장</b-button>
              <b-button type="reset" variant="danger" @click="reset">초기화</b-button>
            </b-form-group>
          </b-form-group>
        </b-form>
      </b-card>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../models";

export default {
  data() {
    return {
      member: {
        name: "",
        address: "",
        cellphone: "",
        phone: "",
        zipcode: ""
      }
    };
  },
  methods: {
    async save() {
      try {
        const res = await axios.post(
          "http://localhost:3000/address/members",
          this.$data,
          {
            headers: {
              Authorization: store.token
            }
          }
        );

      } catch (error) {
        console.error(error);
      }
    },
    reset: function() {
      this.member.name = "";
      this.member.address = "";
      this.member.cellPhone = "";
      this.member.phone = "";
      this.member.zipcode = "";
    }
  }
};
</script>

<style>
</style>
