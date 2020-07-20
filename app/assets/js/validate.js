Vue.component('ValidationProvider', VeeValidate.ValidationProvider);

Vue.component('ValidationObserver', VeeValidate.ValidationObserver);

VeeValidate.configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
  }
})