"use strict";

new Vue({
  el: "#productList",
  data: {
    hexAPI: {
      personID: "85a8cd22-1b7d-43af-9b5a-5aa679129559",
      data: []
    },
    temporary: {
      product: "",
      quantity: "1"
    },
    shopping: {
      data: [],
      moneyTotal: 0
    },
    isLoading: false
  },
  methods: {
    getData: function getData() {
      var vm = this;
      vm.isLoading = true;
      axios.get("https://course-ec-api.hexschool.io/api/".concat(vm.hexAPI.personID, "/ec/products")).then(function (response) {
        vm.hexAPI.data = response.data.data;
        vm.isLoading = false;
      });
    },
    addShopping: function addShopping(id) {
      var vm = this;
      vm.isLoading = true;
      vm.temporary.product = id;
      axios.post("https://course-ec-api.hexschool.io/api/".concat(vm.hexAPI.personID, "/ec/shopping"), vm.temporary).then(function () {
        vm.getShopping();
      });
    },
    getShopping: function getShopping() {
      var vm = this;
      axios.get("https://course-ec-api.hexschool.io/api/".concat(vm.hexAPI.personID, "/ec/shopping")).then(function (response) {
        vm.shopping.data = response.data.data;
        var total = 0;
        vm.shopping.data.forEach(function (item) {
          total += item.product.price;
        });
        vm.shopping.moneyTotal = total;
        vm.isLoading = false;
      });
    },
    deleteShopping: function deleteShopping(delID) {
      var vm = this;
      vm.isLoading = true;
      vm.shopping.data.forEach(function (item) {
        if (delID === item.product.id) {
          axios["delete"]("https://course-ec-api.hexschool.io/api/".concat(vm.hexAPI.personID, "/ec/shopping/").concat(delID)).then(function () {
            vm.getShopping();
          });
        }
      });
    },
    deleteAll: function deleteAll() {
      var vm = this;
      vm.isLoading = true;
      axios["delete"]("https://course-ec-api.hexschool.io/api/".concat(vm.hexAPI.personID, "/ec/shopping/all/product")).then(function () {
        vm.getShopping();
        vm.isLoading = false;
        $('#shoppingModal').modal('hide'); // this.$refs.shoppingModal('hide');
      });
    },
    pay: function pay() {
      var vm = this;
      console.log(vm.shopping.data);

      if (vm.shopping.data.length === 0) {
        alert("您未挑選房間喔!~");
        $('#shoppingModal').modal('hide');
      } else {
        window.location = "payment.html";
      }
    }
  },
  created: function created() {
    this.getData();
    this.getShopping();
  }
});
//# sourceMappingURL=index.js.map
