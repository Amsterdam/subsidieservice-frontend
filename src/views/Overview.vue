<template>
  <div id="overview" class="container">

    <h1> Overview page </h1>
    
    <button class="action primary pull-right" @click="exportData">  <span>  Download CSV </span> </button>

    <MasterAccountsTable :data="masterAccounts"  @update:selected="onMasterAccountSelection"></MasterAccountsTable>
    <p v-if="filteredSubsidies.length == 0"> There are no subisides for this master account </p>
    
    <button v-if="selectedMasterAccount" class="action secundary-blue" @click="onConnect" >  <span >  Connect / Invite </span> </button>
    <ErrorSummary v-if="message" :errors="[message]"> </ErrorSummary>

    <section id="subsidies" v-if="filteredSubsidies.length > 0">
      <TabButtons :tab-names="['Subsidies', 'Citizens']" v-bind:selected-tab="selectedTab"  v-on:update:selected-tab="selectedTab = $event" ></TabButtons>

      <div id="subsidies-tab" v-if="selectedTab === 'Subsidies'">
        <h2> Subsidies </h2> 
        <SubsidyCreation v-if="showSubsidyCreation" :citizen="selectedCitizen" :masterAccount="selectedMasterAccount"
          @success="onConnectSuccess" @cancel="onConnectCanceled">
        </SubsidyCreation>

        <SubsidiesTable :data="filteredSubsidies" @update:selected="onSubsidySelection" ></SubsidiesTable>
        <section id="subsidy-details" v-if="!!selectedSubsidy">      
          <h3>Subsidy Details</h3>
          <SubsidyDetails :subsidy="selectedSubsidy"> </SubsidyDetails>
          
          <h3>Transactions</h3>
          <TransactionsTable :data="selectedSubsidy.account.transactions"> </TransactionsTable>
        </section>
      </div>

      <div id="citizens-tab" v-if="selectedTab === 'Citizens'">
        <h2> Citizens </h2>
        <CitizensTable :data="citizens" @update:selected-id="onCitizenSelection" ></CitizensTable>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { MasterAccount } from "@/models/api/masterAccount";
import { Subsidy } from "@/models/api/subsidy";
import { Citizen } from "@/models/api/citizen";

import MasterAccountsTable from "@/components/master-accounts/MasterAccountsTable.vue";
import CitizensTable from "@/components/citizen/CitizensTable.vue";

import SubsidiesTable from "@/components/subsidies/SubsidiesTable.vue";
import SubsidyDetails from "@/components/subsidies/SubsidyDetails.vue";
import SubsidyCreation from "@/components/subsidies/SubsidyCreation.vue";
import TransactionsTable from "@/components/subsidies/TransactionsTable.vue";

import TabButtons from "@/components/TabButtons.vue";
import ErrorSummary from "@/components/ErrorSummary.vue";

import masterAccountService from "@/services/master-account/master-account.service";
import citizenService from "@/services/citizen/citizen.service";
import subsidyService from "@/services/subsidy/subsidy.service";

import csvService from "@/services/export/csv.service";
import exportService from "@/services/export/data-export.service";
import fileService from "@/services/file/file.service";
import { FullEntity } from "@/models/full-entity";

@Component({
  components: {
    MasterAccountsTable,
    CitizensTable,
    SubsidiesTable,
    SubsidyDetails,
    SubsidyCreation,
    TransactionsTable,
    TabButtons,
    ErrorSummary
  }
})
export default class Dashboard extends Vue {
  masterAccounts: MasterAccount[] = [];
  selectedMasterAccount?: MasterAccount = {};

  citizens: Citizen[] = [];
  selectedCitizen?: Citizen = {};

  allSubsidies: Subsidy[] = [];
  filteredSubsidies: Subsidy[] = [];
  selectedSubsidy?: Subsidy = {};

  selectedTab: "Subsidies" | "Citizens" = "Subsidies";
  message?: string = "";
  showSubsidyCreation = false;

  async mounted() {
    this.masterAccounts = await masterAccountService.getAll();
    this.citizens = await citizenService.getAll();
    this.allSubsidies = await subsidyService.getAll();
  }

  onMasterAccountSelection(id: string) {
    this.selectedMasterAccount = this.masterAccounts.find(acc => acc.id === id);
    this.filteredSubsidies = this.allSubsidies.filter(
      s => s.master && s.master.id === id
    );
    this.selectedSubsidy = undefined;
    this.selectedCitizen = undefined;
  }

  async onSubsidySelection(id: string) {
    this.selectedSubsidy = await subsidyService.getById(id);
  }

  onCitizenSelection(id: string) {
    this.selectedCitizen = this.citizens.find(s => s.id === id);
  }

  onConnect() {
    if (!this.selectedCitizen) {
      this.selectedTab = "Citizens";
      this.message = "Please select a citizen";
    } else {
      this.message = "";
      this.selectedTab = "Subsidies";
      this.showSubsidyCreation = true;
    }
  }

  async onConnectSuccess() {
    this.allSubsidies = await subsidyService.getAll();
    this.filteredSubsidies = [];
    this.selectedMasterAccount = undefined;
    this.showSubsidyCreation = false;
  }

  onConnectCanceled() {
    this.showSubsidyCreation = false;
  }

  async exportData() {
    const data = exportService.combineData(
      this.masterAccounts,
      this.allSubsidies
    );

    const columnNames: { [x in keyof FullEntity]: string } = {
      masterAccount: "Master Account",
      recipientName: "Recipient Name",
      recipientPhone: "Recipient Phone",
      recipientIban: "Recipient IBAN",
      amount: "Amount",
      masterIban: "Master IBAN",
      description: "Description",
      date: "Date"
    };

    const csvText = await csvService.getCsvTextAsync(data, columnNames);
    fileService.downloadCsv(csvText, "data.csv");
  }
}
</script>

<style scoped lang="scss">
.tabs {
  display: flex;
  margin-top: 20px;
}
</style>
