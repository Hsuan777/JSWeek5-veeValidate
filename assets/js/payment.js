"use strict";

new Vue({
  el: "#payment",
  data: {
    hexAPI: {
      personID: "85a8cd22-1b7d-43af-9b5a-5aa679129559",
      data: [],
      dataShopping: []
    },
    selectPay: ["WebATM", "ATM", "Barcode", "Credit", "ApplePay", "GooglePay"],
    person: {
      name: "",
      email: "",
      phone: "",
      address: ""
    },
    shopping: {
      data: [],
      moneyTotal: 0
    },
    isLoading: false
  },
  methods: {
    getShopping: function getShopping() {
      var vm = this;
      vm.isLoading = true;
      axios.get("https://course-ec-api.hexschool.io/api/".concat(vm.hexAPI.personID, "/ec/shopping")).then(function (response) {
        vm.shopping.data = response.data.data;
        var total = 0;
        vm.shopping.data.forEach(function (item) {
          total += item.product.price;
        });
        vm.shopping.moneyTotal = total;
        vm.isLoading = false;
      });
    }
  },
  created: function created() {
    this.getShopping();
  }
});
//# sourceMappingURL=payment.js.map
