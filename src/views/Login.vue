<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/images/logo.png">

    <h1> Login screen </h1>

    <form v-on:submit.prevent="login">
      <input type="text" v-model="username" placeholder="username"> 
      <input type="password" v-model="password" placeholder="password"> 
      <button type="submit"> Login </button>

      <p> {{message}} </p> 
    </form>

  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import userService from "@/services/user.service";

@Component({
  components: {}
})
export default class Login extends Vue {
  private username: string = "";
  private password: string = "";
  private message: string = "";

  async login() {
    if (await userService.login(this.username, this.password)) {
      this.$router.push('/dashboard');
    } else {
      this.message = "Login failed";
    }
  }
}
</script>
