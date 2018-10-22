<template>
  <div id="app">
    <div id="nav" class="type-nav-primair">
      <nav class="container">
        <ul class="links horizontal"> 
        <li> <a @click="$router.push('/')" > <span class="linklabel"> Home </span>  </a>  </li>
        <li> <a @click="$router.push('/dashboard')" > <span class="linklabel"> Dashboard </span>  </a>  </li>
        <li> <a @click="$router.push('/login')" > <span class="linklabel"> Login </span>  </a>  </li>
        </ul>
      </nav>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~amsterdam-stijl/dist/css/ams-stijl.css";
@import "./assets/styles/main.scss";
</style>