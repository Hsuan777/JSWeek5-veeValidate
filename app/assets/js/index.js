new Vue({
  el: "#productList",
  data: {
    hexAPI: {
      personID: "85a8cd22-1b7d-43af-9b5a-5aa679129559",
      data: [],
    },
    temporary: {
      product: "",
      quantity: "1",
    },
    shopping:{
      data:[],
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
          vm.getShopping();
        })
    },
    getShopping() {
      let vm = this;
      axios.get(`https://course-ec-api.hexschool.io/api/${vm.hexAPI.personID}/ec/shopping`)
        .then((response) => {
          vm.shopping.data = response.data.data;
          let total = 0;
          vm.shopping.data.forEach(item=>{
            total += item.product.price;
          })
          vm.shopping.moneyTotal = total;
          vm.isLoading = false;
        });
    },
    deleteShopping(delID) {
      let vm = this;
      vm.isLoading = true;
      vm.shopping.data.forEach((item) => {
        if (delID === item.product.id) {
          axios
            .delete(`https://course-ec-api.hexschool.io/api/${vm.hexAPI.personID}/ec/shopping/${delID}`)
            .then(() => {
              vm.getShopping();
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
    },
    pay(){
      let vm = this;
      console.log(vm.shopping.data);
      if (vm.shopping.data.length === 0){
        alert("您未挑選房間喔!~")
        $('#shoppingModal').modal('hide');
      } else{
        window.location = "payment.html";
      }
    }
  },
  created() {
    this.getData();
    this.getShopping();

  },
  
})