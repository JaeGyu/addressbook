<template>
  <div>
    <b-container>
      <h1 class="mt-3 mb-5">주소록</h1>
      <b-row>
        <b-col>
          <b-form-select v-model="searchType" :options="options" class="mb-3"/>
        </b-col>
        <b-col cols="9">
          <b-form-input v-model="searchValue" type="text"></b-form-input>
        </b-col>
        <b-col>
          <b-button @click="search">검색</b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col>
          <b-button @click="showModalOfDeleteConfirm">삭제</b-button>
        </b-col>
        <b-col cols="6">&nbsp;</b-col>
        <b-col>
          <!-- <b-button @click="excelDownload">Excel</b-button> -->
        </b-col>
        <b-col>
          <!-- <b-button @click="pdfDownload">PDF</b-button> -->
        </b-col>
      </b-row>
      <b-table class="mt-3" striped hover :items="members" :fields="fields">
        <template slot="delete" slot-scope="data">
          <b-form-checkbox :id="data.item.id.toString()" :value="data.item.id" v-model="deleteChk"></b-form-checkbox>
        </template>
        <template slot="update" slot-scope="data">
          <b-button @click="update(data.item.id)">수정</b-button>
        </template>
      </b-table>
    </b-container>

    <!-- 삭제 여부 모달 -->
    <b-modal ref="deleteConfirm" centered id="deleteConfirm" title="경고">
      <p class="my-4">삭제하시겠습니까?</p>
      <div slot="modal-footer" class="w-100">
        <b-btn class="float-right" variant="primary" @click="okOfDeleteConfirm">삭제</b-btn>
        <b-btn class="float-right mr-2" @click="cancelOfDeleteConfirm">취소</b-btn>
      </div>
    </b-modal>

    <!--수정을 위한 모달-->
    <b-form @submit.prevent="up">
      <b-modal ref="update" centered id="update" title="변경">
        <b-container>
          <b-form-group horizontal label="이름:" label-class="text-sm-right" label-for="name">
            <b-form-input
              v-model="updateData.name"
              id="name"
              placeholder="성함을 입력하세요"
              autofocus
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group horizontal label="주소:" label-class="text-sm-right" label-for="address">
            <b-form-input v-model="updateData.address" id="address" placeholder="주소를 입력하세요"></b-form-input>
          </b-form-group>
          <b-form-group horizontal label="휴대폰:" label-class="text-sm-right" label-for="cellphone">
            <b-form-input v-model="updateData.cellphone" id="cellphone" placeholder="휴대폰 번호를 입력하세요"></b-form-input>
          </b-form-group>
          <b-form-group horizontal label="집전화:" label-class="text-sm-right" label-for="phone">
            <b-form-input v-model="updateData.phone" id="phone" placeholder="집 전화번호를 입력하세요"></b-form-input>
          </b-form-group>
          <b-form-group horizontal label="우편번호:" label-class="text-sm-right" label-for="zipcode">
            <b-form-input v-model="updateData.zipcode" id="zipcode" placeholder="우편번호를 입력하세요"></b-form-input>
          </b-form-group>
        </b-container>

        <div slot="modal-footer">
          <b-btn type="submit" class="float-right" variant="primary">저장</b-btn>
          <b-btn class="float-right mr-2" @click="cancelOfUpdateModal">취소</b-btn>
        </div>
      </b-modal>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";
import { store } from "../models";

// const codeForDeleteAll = `<input type="checkbox" value="true" v-model="deleteAllChk" @click="pdfDownload()">`;
const codeForDeleteAll = "";
// const codeForDeleteAll = `<b-form-checkbox id="all" v-model="deleteAllChk" value="true"></b-form-checkbox>`;

export default {
  data() {
    return {
      searchType: "name",
      searchValue: "",
      deleteChk: [],
      deleteAllChk: "",
      options: [
        { value: "name", text: "성명" },
        { value: "address", text: "주소" }
      ],
      fields: [
        { key: "delete", label: codeForDeleteAll },
        { key: "name", label: "이름" },
        { key: "address", label: "주소" },
        { key: "cellphone", label: "휴대폰" },
        { key: "phone", label: "집전화" },
        { key: "zipcode", label: "우편번호" },
        { key: "update", label: "수정" }
      ],
      members: [],
      errorMsg: "",
      updateData: {}
    };
  },
  methods: {
    showModalOfUpdate: function() {
      this.$refs.update.show();
    },
    showModalOfDeleteConfirm: function() {
      if (this.deleteChk.length == 0) {
        return;
      }
      this.$refs.deleteConfirm.show();
    },
    hideModalOfDeleteConfirm: function() {
      this.$refs.deleteConfirm.hide();
    },
    okOfDeleteConfirm: function() {
      this.hideModalOfDeleteConfirm();
      this.destroy();
    },
    cancelOfDeleteConfirm: function() {
      this.hideModalOfDeleteConfirm();
    },
    hideModalOfUpdate: function() {
      this.$refs.update.hide();
    },
    cancelOfUpdateModal: function() {
      this.hideModalOfUpdate();
    },
    update: function(data) {
      const result = this.members.filter(mem => {
        return data === mem.id;
      });
      this.updateData = result[0];
      this.showModalOfUpdate();
    },
    up: function() {
      axios
        .put(
          "http://localhost:3000/address/members/" + this.updateData.id,
          this.updateData
        )
        .then(res => {
          console.log(res);
          this.hideModalOfUpdate();
        })
        .catch(error => {
          console.error(error);
        });
    },
    pdfDownload: function() {
      console.log("pdf 다운 로드 입니다.");
    },
    excelDownload: function() {
      console.log("엑셀 다운 로드 입니다.");
    },
    destroy: function() {
      axios
        .delete("http://localhost:3000/address/members", {
          params: {
            ids: this.deleteChk
          },
          headers: {
            Authorization: store.token
          }
        })
        .then(res => {
          this.deleteChk = [];
          this.getAddress();
        })
        .catch(error => {
          console.error(error);
        });
    },
    search: function() {
      axios
        .get("http://localhost:3000/address/members/search", {
          params: {
            searchType: this.searchType,
            searchValue: this.searchValue
          },
          headers: {
            Authorization: store.token
          }
        })
        .then(res => {
          this.members = res.data;
          this.errorMsg = "";
        })
        .catch(error => {
          console.log("err :: ", error.response);
          this.errorMsg = error.response.data.message;
        });
    },
    getAddress: function() {
      axios
        .get("http://localhost:3000/address/members", {
          headers: {
            Authorization: store.token
          }
        })
        .then(res => {
          this.members = res.data;
          this.errorMsg = "";
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
