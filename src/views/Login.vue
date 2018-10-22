<template>
  <div class="container">
    <img alt="Vue logo" src="../assets/images/logo.png">

    <h1> Login screen </h1>


<div class="formulier-section">
  <div class="formshadow">
    <form v-on:submit.prevent="login">
      <!-- <input type="text" v-model="username" placeholder="username"> 
      <input type="password" v-model="password" placeholder="password"> 
      <button type="submit"> Login </button> -->

    <div class="rij mode_input text rij_verplicht">
        <div class="label">
          <label for="formInput">Username</label>
        </div>

        <div class="invoer">
          <input type="text" v-model="username" placeholder="username" class="input">
        </div>
      </div>
      <div class="rij mode_input text rij_verplicht">
        <div class="label">
          <label for="formInput">Password</label>
        </div>

        <div class="invoer">
          <input  v-model="password" placeholder="password" class="input" type="password">
        </div>
      </div>

      <button class="action primary"> Login </button>

      <p> {{message}} </p> 
    </form>
  </div>
</div>




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
      this.$router.push("/dashboard");
    } else {
      this.message = "Login failed";
    }
  }
}
</script>
