 new Vue ({
  el:"#productList",
  data:{
    hexAPI: {
      personID: "85a8cd22-1b7d-43af-9b5a-5aa679129559",
      data: [],
      dataShopping:[]
    },
    selectPay:[`ATM`, `信用卡`],
    person:{
      name:"",
      email:"",
      phone:"",
      address:"",
    },
    temporary: {
      product: "",
      quantity: "1",
    },
  },
  methods:{
    getData() {
      let vm = this;
      axios.get(`https://course-ec-api.hexschool.io/api/${vm.hexAPI.personID}/ec/products`)
        .then((response) => {
          vm.hexAPI.data = response.data.data;
        })
    },
    addShopping(id){
      let vm = this;
      vm.temporary.product = id;
      axios.post(`https://course-ec-api.hexschool.io/api/${vm.hexAPI.personID}/ec/shopping`, vm.temporary)
        .then(() => {
          console.log(`加入成功`);
          vm.getShopping();
        })
    },
    getShopping(){
      let vm = this;
      axios.get(`https://course-ec-api.hexschool.io/api/${vm.hexAPI.personID}/ec/shopping`)
        .then((response) => {
          vm.hexAPI.dataShopping = response.data.data;
          console.log(vm.hexAPI.dataShopping);
        })
    },
  },
  created(){
    this.getData();
    this.getShopping();
    
  },
  mounted(){
  }
})