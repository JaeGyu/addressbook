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
          <b-button @click="destroy">삭제</b-button>
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
          <b-button @click="update(data.index)">수정</b-button>
        </template>
      </b-table>
    </b-container>

    <!-- 삭제 여부 모달 -->
    <b-modal ref="deleteConfirm" centered id="deleteConfirm" title="경고">
      <p class="my-4">삭제하시겠습니까?</p>
    </b-modal>

    <!--수정을 위한 모달-->

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
        // { value: null, text: "조회 조건을 선택하세요" },
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
      errorMsg: ""
    };
  },
  methods: {
    showModalOfDeleteConfirm: function(){
      this.$refs.deleteConfirm.show();
    },
    update: function(data) {
      console.log(data);
      console.log(this.deleteChk);
    },
    pdfDownload: function() {
      console.log("pdf 다운 로드 입니다.");
    },
    excelDownload: function() {
      console.log("엑셀 다운 로드 입니다.");
    },
    destroy: function() {
      if (this.deleteChk.length == 0) {
        return;
      }

      this.showModalOfDeleteConfirm();
      return;

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
            // Authorization: 'a'
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
