<template>
  <div id="dashboard" class="container">
    <div>
       User: {{ username}}
          <button @click="logout" > logout </button>
    </div> 
  

    <h1> Dashboard page </h1>
    <MasterAccountsTable :data="masterAccounts"  @selectedChange="selectedMasterAccountId = $event"></MasterAccountsTable>

    <p> Selected account: {{selectedMasterAccountId}} </p>

    <CitizensTable :data="citizens"></CitizensTable>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MasterAccountsTable from "@/components/MasterAccountsTable.vue";
import CitizensTable from "@/components/CitizensTable.vue";

import { MasterAccount } from "@/models/masterAccount";
import { Subsidy } from "@/models/subsidy";
import { Citizen } from "@/models/citizen";

import masterAccountService from "@/services/master-account.service";
import citizenService from "@/services/citizens.service";
import subsidyService from "@/services/subsidies.service";
import userService from "@/services/user.service";

@Component({
  components: { MasterAccountsTable, CitizensTable }
})
export default class Dashboard extends Vue {
  masterAccounts: MasterAccount[] = [];
  citizens: Citizen[] = [];
  subsidies: Subsidy[] = [];
  username: string = "";
  selectedMasterAccountId?: string = "";

  async mounted() {
    this.username = userService.getUserName();
    this.masterAccounts = await masterAccountService.getAll();
    this.citizens = await citizenService.getAll();
    this.subsidies = await subsidyService.getAll();

    console.table(this.citizens);
    console.table(this.subsidies);
  }

  logout() {
    userService.logout();
    this.$router.push("/login");
  }
}
</script>
