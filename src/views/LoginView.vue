<template>
  <div class="container">
    <div class="row justify-content-center align-items-center">
      <div class="col-md-3">
        <form
          class="form__group form__group--outlined"
          @submit.prevent="getVerification(selected)"
        >
          <div
            class="form__group--defalt mb20"
            :class="{
              'hasValue': login.account,
              'form__group--error':
              login.account && submitState && login.account !== verification.account,
            }"
          >
            <label class="label form__group--defalt">
              <input
                v-model="login.account"
                @input="checkTyping()"
                class="form__group__input d-block"
                type="text"
                autocomplete="current-password"
              >
              <div class="form__group__placeholder">請輸入帳號</div>
              <span
                v-if="(login.account && submitState && login.account !== verification.account)"
                class="form__group__help--strong d-block"
                :class="{
                  'form__group__help--highlight':
                  login.account && submitState && login.account !== verification.account
                }"
              >
                請輸入正確帳號
              </span>
            </label>
          </div>
          <div
            class="form__group--defalt mb20"
            :class="{
              'hasValue': login.password,
              'form__group--error':
              login.password && submitState && login.password !== verification.password,
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
                  && login.password !== verification.password
                )"
                class="form__group__help--strong d-block"
                :class="{
                  'form__group__help--highlight':
                  login.password && submitState && login.password !== verification.password
                }"
              >
                請輸入正確密碼
              </span>
            </label>
          </div>
          <div class="d-flex">
            <label class="d-block me-3">
              <span class="label--radio">
                <input type="radio"
                  v-model="selected"
                  :checked="selected === '編輯部'"
                  name="部門"
                  value="編輯部"
                >
                <span class="label__radio__mark"></span>
                <span class="label__radio__txt">編輯部</span>
              </span>
            </label>
            <label class="d-block me-3">
              <span class="label--radio">
                <input
                  type="radio"
                  v-model="selected"
                  :checked="selected === '廣告部'"
                  name="部門"
                  value="廣告部"
                >
                <span class="label__radio__mark"></span>
                <span class="label__radio__txt">廣告部</span>
              </span>
            </label>
          </div>
          <button
            class="btn btn--contained mx-auto mt40 d-table"
            :disabled="!(login.account && login.password)"
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
        account: '',
        password: '',
      },
      selected: '編輯部',
      cookieType: 'editorial',
      verification: {},
      submitState: false,
    };
  },
  created() {
    if (this.$router.currentRoute.value.meta.title === '登入') {
      document.body.classList.add('login-page');
    }
  },
  methods: {
    getVerification(type) {
      const data = `https://opensheet.elk.sh/1akcT3aiSAHRFsprHQpb0DjeTmb-ieYwFQjmGs7TwfB8/${type}`;
      this.$http.get(data).then((response) => {
        const [value] = response.data;
        this.verification = value;
      }).then(() => {
        this.clickLogin();
      });
    },
    clickLogin() {
      this.submitState = true;
      if (
        this.login?.account === this.verification?.account
        && this.login?.password === this.verification?.password
      ) {
        const key = `cw-banner-generator-${this.cookieType}-logged`;
        const value = 'tkyXWaXf=mM*r6PwxUd#k4=47cxW%kkMc!T..Bn9dnpgMyY6YBHT.*uSF9StsZ5W%54sGFzRh*TCYqQbbW7@qDGNh5hhv-p%WpbS9d?%Y8@MarE44B6QFNHQ=MkcNbmc';
        const expires = 60 * 60 * 24 * 30;

        // 紀錄 Cookie: 存放 30 天
        this.$cookies.set(key, value, expires);

        // 跳轉到各自頁面
        if (this.cookieType === 'editorial') {
          this.$router.push({
            path: 'editorial/cw',
          });
        } else if (this.cookieType === 'advertising') {
          this.$router.push({
            path: 'ad/youtube',
          });
        }
      }
    },
    checkTyping() {
      this.submitState = false;
    },
  },
  watch: {
    selected() {
      if (this.selected === '編輯部') {
        this.cookieType = 'editorial';
      } else if (this.selected === '廣告部') {
        this.cookieType = 'advertising';
      }
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
