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
      address: "",
    },
  },
})