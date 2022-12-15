<template>
  <div class="container">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-3">
        <form
          class="form__group form__group--outlined"
          @submit.prevent="changePassword()"
        >
          <div class="form__group--defalt d-none">
            <label class="label form__group--defalt">
              <input
                class="form__group__input d-block"
                type="text"
                autocomplete="current-username"
              >
              <div class="form__group__placeholder">請輸入帳號</div>
            </label>
          </div>
          <div
            class="form__group--defalt mb20"
            :class="{
              'hasValue': password.default,
              'form__group--error': password.default && submitState
            }"
          >
            <label class="label form__group--defalt">
              <input
                v-model="password.default"
                @input="checkTyping()"
                class="form__group__input d-block"
                type="password"
                autocomplete="current-password"
              >
              <div class="form__group__placeholder">請輸入原密碼</div>
              <span
                v-if="(
                  password.default
                  && submitState
                )"
                class="form__group__help--strong d-block"
              >
                請輸入正確密碼
              </span>
            </label>
          </div>
          <div
            class="form__group--defalt mb20"
            :class="{
              'hasValue': password.change,
              'form__group--error': password.change && submitState
            }"
          >
            <label class="label form__group--defalt">
              <input
                v-model="password.change"
                @input="checkTyping()"
                class="form__group__input d-block"
                type="password"
                autocomplete="current-password"
              >
              <div class="form__group__placeholder">請輸入新密碼</div>
              <span
                v-if="(
                  password.change
                  && submitState
                )"
                class="form__group__help--strong d-block"
              >
                請輸入正確密碼
              </span>
            </label>
          </div>
          <div
            class="form__group--defalt mb20"
            :class="{
              'hasValue': password.check,
              'form__group--error': password.check && submitState
            }"
          >
            <label class="label form__group--defalt">
              <input
                v-model="password.check"
                @input="checkTyping()"
                class="form__group__input d-block"
                type="password"
                autocomplete="current-password"
              >
              <div class="form__group__placeholder">再次輸入新密碼</div>
              <span
                v-if="(
                  password.check
                  && submitState
                )"
                class="form__group__help--strong d-block"
              >
                請輸入正確密碼
              </span>
            </label>
          </div>
          <button
            class="btn btn--contained mx-auto mt40 d-table"
            :disabled="!password.default"
            type="submit"
          >
            確定送出
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import $ from 'jquery';

export default {
  data() {
    return {
      password: {
        default: '',
        change: '',
        check: '',
      },
      verification: {},
      type: {},
      submitState: false,
    };
  },
  created() {
    this.getVerification();
    document.body.classList.add('login-page');
  },
  methods: {
    getVerification() {
      const data = 'https://opensheet.elk.sh/1akcT3aiSAHRFsprHQpb0DjeTmb-ieYwFQjmGs7TwfB8/test';
      this.$http.get(data).then((response) => {
        response.data.forEach((element) => {
          const object = {
            platform: element.platform,
            redirect: element.redirect,
            email: element.email,
          };
          this.verification[element.password] = object;
        });
      }).then(() => {
        console.log(this.verification);
      });
    },
    changePassword() {
      if (this.verification[this.password.default]) {
        this.type = this.verification[this.password.default];
        let data = {};
        if (this.type.platform === 'advertising') {
          console.log('我是廣告');
          data = {
            editorial: '',
            advertising: this.password.check,
          };
        } else if (this.type.platform === 'editorial') {
          console.log('我是編輯');
          data = {
            editorial: this.password.check,
            advertising: '',
          };
        }
        // 呼叫 send ajax function 把資料送到 Google Sheet
        this.send(data);
      } else {
        this.submitState = true;
      }
    },
    send(value) {
      $.ajax({
        type: 'get',
        url: 'https://script.google.com/macros/s/AKfycbxH30V1QtGmENDrWd_Xd8RtCv4bqi-ZbtqJZ6DoUuJmD0ci290LBef3DkBoiXrfnCC5Dg/exec',
        data: value,
        dataType: 'JSON',
        success: this.sendEmail(this.verification[this.password.default].email),
      });
    },
    sendEmail(mail) {
      console.log(mail);
    },
    checkTyping() {
      this.submitState = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.form__group {
  max-width: none;
}
label span.label__radio__txt {
  white-space: nowrap;
}
</style>

<style lang="scss">
.login-page main {
  margin-bottom: 0;
  height: calc(100vh - 65px);
  min-height: calc(100vh - 65px);
  > div {
    height: 100%;
    min-height: 100%;
    > div {
      height: 100%;
      min-height: 100%;
    }
  }
}
</style>
