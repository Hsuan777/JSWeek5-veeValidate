 new Vue ({
  el:"#productList",
  data:{
    hexAPI: {
      personID: "85a8cd22-1b7d-43af-9b5a-5aa679129559",
      data: []
    },
    selectPay:[`ATM`, `信用卡`],
    person:{
      name:"",
      email:"",
      phone:"",
      address:"",
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
    order(){
      
    }
  },
  created(){
    this.getData();
  }
})