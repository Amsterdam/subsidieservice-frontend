<template>
  <div id="overview" class="container">

    <h1> Overview page </h1>
    
    <section id="master-accounts">
      <h2> Master Accounts </h2>
      <MasterAccountsTable :data="masterAccounts"  @update:selected="onMasterAccountSelection"></MasterAccountsTable>
    </section>

    <section id="subsidies"  v-if="filteredSubsidies.length > 0">
     <ul class="tabs">
        <li v-bind:class="{selected: selectedTab === 'subsidies'}">
          <a @click="selectedTab = 'subsidies'">Subsidies</a>
        </li>
        <li v-bind:class="{selected: selectedTab === 'citizens'}">
          <a @click="selectedTab = 'citizens'">Citizens</a>
        </li>
      </ul>

      <div id="subsidies-tab" v-if="selectedTab === 'subsidies'">
        <h2> Subsidies </h2>
        <SubsidiesTable :data="filteredSubsidies" @update:selected="onSubsidySelection" ></SubsidiesTable>
        <section id="subsidy-details" v-if="!!selectedSubsidy">      
          <h3>Subsidy Details</h3>
          <SubsidyDetails :subsidy="selectedSubsidy"> </SubsidyDetails>
          
          <h3>Transactions</h3>
          <TransactionsTable :data="selectedSubsidy.account.transactions"> </TransactionsTable>
        </section>
      </div>
      <div id="citizens-tab" v-if="selectedTab === 'citizens'">
        <h2> Citizens </h2>
        <CitizensTable :data="citizens"></CitizensTable>
      </div>
    </section>
    <p v-if="filteredSubsidies.length == 0"> There are no subisides for this master account </p>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import MasterAccountsTable from "@/components/MasterAccountsTable.vue";
import CitizensTable from "@/components/CitizensTable.vue";
import SubsidiesTable from "@/components/SubsidiesTable.vue";
import TransactionsTable from "@/components/TransactionsTable.vue";
import SubsidyDetails from "@/components/SubsidyDetails.vue";

import { MasterAccount } from "@/models/masterAccount";
import { Subsidy } from "@/models/subsidy";
import { Citizen } from "@/models/citizen";

import masterAccountService from "@/services/master-account/master-account.service";
import citizenService from "@/services/citizen/citizen.service";
import subsidyService from "@/services/subsidy/subsidy.service";


@Component({
  components: {
    MasterAccountsTable,
    CitizensTable,
    SubsidiesTable,
    SubsidyDetails,
    TransactionsTable
  }
})
export default class Dashboard extends Vue {
  masterAccounts: MasterAccount[] = [];
  citizens: Citizen[] = [];

  allSubsidies: Subsidy[] = [];
  filteredSubsidies: Subsidy[] = [];
  selectedSubsidy?: Subsidy = {};

  selectedMasterAccountId?: string = "";
  selectedTab: "subsidies" | "citizens" = "subsidies";

  async mounted() {
    this.masterAccounts = await masterAccountService.getAll();
    this.citizens = await citizenService.getAll();
    this.allSubsidies = await subsidyService.getAll();

    console.table(this.citizens);
    console.table(this.allSubsidies);
  }

  onMasterAccountSelection(id: string) {
    this.selectedMasterAccountId = id;
    this.filteredSubsidies = this.allSubsidies.filter(
      s => s.master && s.master.id === id
    );
    this.selectedSubsidy = undefined;
  }

  onSubsidySelection(id: string) {
    this.selectedSubsidy = this.filteredSubsidies.find(s => s.id === id);
  }
}
</script>

<style scoped lang="scss">
.tabs {
  display: flex;
  margin-top: 20px;
}
</style>
