new Vue({
  el: "#productList",
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
      address: "",
    },
    temporary: {
      product: "",
      quantity: "1",
    },
    shopping:{
      moneyTotal:0,
    },
    isLoading: false,
  },
  methods: {
    getData() {
      let vm = this;
      vm.isLoading = true;
      axios.get(`https://course-ec-api.hexschool.io/api/${vm.hexAPI.personID}/ec/products`)
        .then((response) => {
          vm.hexAPI.data = response.data.data;
          vm.isLoading = false;
        })
    },
    addShopping(id) {
      let vm = this;
      vm.isLoading = true;
      vm.temporary.product = id;
      axios.post(`https://course-ec-api.hexschool.io/api/${vm.hexAPI.personID}/ec/shopping`, vm.temporary)
        .then(() => {
          console.log(`加入成功`);
          vm.getShopping();
          vm.isLoading = false;
        })
    },
    getShopping() {
      let vm = this;
      axios.get(`https://course-ec-api.hexschool.io/api/${vm.hexAPI.personID}/ec/shopping`)
        .then((response) => {
          vm.hexAPI.dataShopping = response.data.data;
          console.log(vm.hexAPI.dataShopping);
          let total = 0;
          vm.hexAPI.dataShopping.forEach(item=>{
            total += item.product.price;
          })
          vm.shopping.moneyTotal = total;
        });
    },
    deleteShopping(delID) {
      let vm = this;
      vm.isLoading = true;
      vm.hexAPI.dataShopping.forEach((item) => {
        if (delID === item.product.id) {
          axios
            .delete(`https://course-ec-api.hexschool.io/api/${vm.hexAPI.personID}/ec/shopping/${delID}`)
            .then(() => {
              vm.getShopping();
              vm.isLoading = false;
            });
        }
      })
    },
    deleteAll() {
      let vm = this;
      vm.isLoading = true;
      axios
        .delete(`https://course-ec-api.hexschool.io/api/${vm.hexAPI.personID}/ec/shopping/all/product`)
        .then(() => {
          vm.getShopping();
          vm.isLoading = false;
          $('#shoppingModal').modal('hide');
          // this.$refs.shoppingModal('hide');
        });
    }
  },
  created() {
    this.getData();
    this.getShopping();

  },
  mounted() {
  }
})