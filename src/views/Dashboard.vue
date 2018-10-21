<template>
  <div class="home">
    <h1> Dashboard page </h1>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MasterAccount } from "@/models/masterAccount";
import { Subsidy } from "@/models/subsidy";
import { Citizen } from "@/models/citizen";

import masterAccountService from "@/services/master-account.service";
import citizenService from "@/services/citizens.service";
import subsidyService from "@/services/subsidies.service";

@Component({
  components: {}
})
export default class Dashboard extends Vue {
  masterAccounts: MasterAccount[] = [];
  citizens: Citizen[] = [];
  subsidies: Subsidy[] = [];

  async mounted() {
    this.masterAccounts = await masterAccountService.getAll();
    this.citizens = await masterAccountService.getAll();
    this.subsidies = await subsidyService.getAll();

    console.table(this.masterAccounts);
    console.table(this.citizens);
    console.table(this.subsidies);
  }
}
</script>
