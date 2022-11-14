<script>
import { defineComponent, ref } from "vue";

import { useUserStore } from "../stores/store";
import { emailValidate } from "../utils";

export default defineComponent({
  setup() {
    const userStore = useUserStore();
    const email = ref("");
    let invalidEmail = false;

    function login() {
      if (email.value && emailValidate(email.value)) {
        userStore.setEmail(email.value);
        this.$router.push("/beers");
      } else {
        alert("Invalid Email");
      }
    }

    return {
      login,
      email,
      invalidEmail,
    };
  },
});
</script>

<template>
  <form @submit.prevent="login">
    <input type="text" v-model="email" />
    <button>Log In</button>
  </form>
</template>
