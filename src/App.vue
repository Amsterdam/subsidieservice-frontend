<template>
  <div id="app" class="sg-main">
    <div id="nav" class="type-nav-primair">
      <nav class="container">
        <ul class="links horizontal"> 
          <li> <a @click="$router.push('/')" > <span class="linklabel"> Home </span>  </a>  </li>
          <li v-if="currentUser"> <a @click="$router.push('/overview')" > <span class="linklabel"> Overview </span>  </a>  </li>
          <li v-if="!currentUser"> <a @click="$router.push('/login')" > <span class="linklabel"> Login </span>  </a>  </li>
          <li v-if="isAdmin"> <a @click="$router.push('/admin')" > <span class="linklabel"> Administration </span>  </a>  </li>
        </ul>
        <ul class="links horizontal">
            <li> {{ currentUser }}  </li>
            <li v-if="currentUser"> <button class="action primary" @click="logout">  <span >  Logout </span> </button> </li> 
        </ul>
      </nav>
    </div>
    <router-view  />


  </div>
</template>

<style lang="scss">
@import "~amsterdam-stijl/dist/css/ams-stijl.css";
@import "./assets/styles/main.scss";
</style>

<script lang="ts">
import { Watch, Vue, Component } from "vue-property-decorator";
import userService from "@/services/user/user.service";

@Component
export default class VueApp extends Vue {
  currentUser?: string = undefined;
  isAdmin: boolean = false;

  @Watch("$route", { immediate: true, deep: true })
  onUrlChange(newVal: any) {
    if (userService.isLoggedIn()) {
      this.currentUser = userService.getUserName();
      userService.isAdmin().then(isAdmin => this.isAdmin = isAdmin);
    } else {
      this.currentUser = undefined;
    }
  }

  logout() {
    userService.logout();
    this.$router.push("/login");
  }
}
</script>
