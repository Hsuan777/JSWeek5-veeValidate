new Vue({
  el: "#app",
  data: {
    hexAPI: {
      personID: "85a8cd22-1b7d-43af-9b5a-5aa679129559",
      apiPath: "https://course-ec-api.hexschool.io/api/",
      data: [],
    },
    user: {
      email: "",
      password: "",
    },
  },
  methods:{
    login(e) {
      let vm = this;
      e.preventDefault();
      axios
        .post(`${this.hexAPI.apiPath}auth/login`, this.user)
        .then((res) => {
          // 1. 送出驗證資訊後，驗證完畢取得 token以及到期日(expired)
          const token = res.data.token;
          const expired = res.data.expired;
          // 2. 取得上述的值後，就把它們存在 cookie，以便使用者在期限內再次登入
          // 參考 document.cookie MDN
          // someCookieName可自定義，true改成 傳送回來的 token
          // 到期日則是用 new Data()的方式
          document.cookie = `hexToken=${token}; expires=${new Date(expired * 1000)}; path=/`;
          //清空
          vm.user.email = ``;
          vm.user.password = ``;
          // 跳轉頁面
          window.location = "products.html";

        })
        .catch((error) => {
          console.log(error);
        })
    },
  },
});