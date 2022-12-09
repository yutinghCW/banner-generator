<template>
  <div class="container">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-3">
        <form
          class="form__group form__group--outlined"
          @submit.prevent="clickLogin()"
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
              'hasValue': login.password,
              'form__group--error': login.password && submitState && checkPasswordCorrect
            }"
          >
            <label class="label form__group--defalt">
              <input
                v-model="login.password"
                @input="checkTyping()"
                class="form__group__input d-block"
                type="password"
                autocomplete="current-password"
              >
              <div class="form__group__placeholder">請輸入密碼</div>
              <span
                v-if="(
                  login.password
                  && submitState
                  && checkPasswordCorrect
                )"
                class="form__group__help--strong d-block"
                :class="{
                  'form__group__help--highlight': checkPasswordCorrect
                }"
              >
                請輸入正確密碼
              </span>
            </label>
          </div>
          <button
            class="btn btn--contained mx-auto mt40 d-table"
            :disabled="!login.password"
            type="submit"
          >
            登入
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      login: {
        password: '',
      },
      verification: {},
      submitState: false,
    };
  },
  created() {
    this.getVerification();
    if (this.$router.currentRoute.value.meta.title === '登入') {
      document.body.classList.add('login-page');
    }
  },
  methods: {
    getVerification() {
      const data = 'https://opensheet.elk.sh/1akcT3aiSAHRFsprHQpb0DjeTmb-ieYwFQjmGs7TwfB8/index';
      this.$http.get(data).then((response) => {
        response.data.forEach((element) => {
          const object = {
            platform: element.platform,
            redirect: element.redirect,
          };
          this.verification[element.password] = object;
        });
      });
    },
    clickLogin() {
      if (this.verification[this.login?.password]) {
        this.cookieType = this.verification[this.login.password].platform;
        const key = `cw-banner-generator-${this.cookieType}-logged`;
        const value = 'tkyXWaXf=mM*r6PwxUd#k4=47cxW%kkMc!T..Bn9dnpgMyY6YBHT';
        const expires = 60 * 60 * 24 * 30;

        // 紀錄 Cookie: 存放 30 天
        this.$cookies.set(key, value, expires);

        // 轉址
        this.$router.push({
          path: this.verification[this.login?.password].redirect,
        });
      } else {
        this.submitState = true;
      }
    },
    checkPasswordCorrect() {
      if (this.verification[this.login?.password]) {
        return true;
      }
      return false;
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
