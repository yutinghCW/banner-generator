<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h1 class="text-center my0">
          登入
        </h1>
        <div class="row justify-content-center mt40">
          <div class="col-md-6">
            <form class="form__group form__group--outlined" @submit.prevent="clickLogin()">
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
                class="btn btn--contained mx-auto my40 d-table"
                :disabled="!(login.account && login.password)"
                type="submit"
              >
                登入
              </button>
            </form>
          </div>
        </div>
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
      verification: {},
      submitState: false,
    };
  },
  created() {
    const data = `https://opensheet.elk.sh/1akcT3aiSAHRFsprHQpb0DjeTmb-ieYwFQjmGs7TwfB8/${this.selected}`;
    this.$http.get(data).then((response) => {
      /* eslint-disable */
      this.verification = response.data[0];
      /* eslint-disable */
    });
  },
  methods: {
    get
    clickLogin() {
      this.submitState = true;
      if (
        this.login.account == this.verification?.account
        && this.login.password == this.verification?.password
      ) {
        const key = `cw-banner-generator-${this.selected}-logged`;
        const value = 'tkyXWaXf=mM*r6PwxUd#k4=47cxW%kkMc!T..Bn9dnpgMyY6YBHT.*uSF9StsZ5W%54sGFzRh*TCYqQbbW7@qDGNh5hhv-p%WpbS9d?%Y8@MarE44B6QFNHQ=MkcNbmc';
        const expires = 60 * 60 * 24 * 30; //30day
        this.$cookies.set(key, value, expires);
      }
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
