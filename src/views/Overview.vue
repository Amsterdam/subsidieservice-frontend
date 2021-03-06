<template>
  <div id="overview" class="container" v-if="initiative">
    <div id="initiative-buttons">
      <TabButtons
        :tab-names="initiativeNames"
        :selected-tab="initiative.name"
        @update:selected-tab="changeInitiative"
      ></TabButtons>
    </div>

    <h1>Overview page. Initiative : {{initiative.name}}</h1>

    <MasterAccountsCreation
      v-if="showMasterAccountCreation"
      @cancel="showMasterAccountCreation=false"
      @submit="createMasterAccount"
    ></MasterAccountsCreation>

    <ExportRequest
      v-if="showDownloadDialog"
      :initiative-name="initiative.name"
      @submit="exportData"
      @cancel="showDownloadDialog=false"
    ></ExportRequest>
    <button class="action primary pull-right" @click="showDownloadDialog=true">
      <span>Download CSV</span>
    </button>
    
    <button class="action primary pull-right" @click="showMasterAccountCreation=true">
      <span>Create Master Account</span>
    </button>
    <MasterAccountsTable :data="masterAccounts" @update:selected="onMasterAccountSelection"></MasterAccountsTable>

    <p v-if="filteredSubsidies.length == 0">There are no subisides for this master account</p>

    <button
      v-if="selectedMasterAccountId"
      class="action secundary-blue"
      @click="beginCreateSubsidy"
    >
      <span>Connect / Invite</span>
    </button>
    <ErrorSummary v-if="message" :errors="[message]"></ErrorSummary>

    <section v-if="selectedMasterAccountId" id="account-data">
      <TabButtons
        :tab-names="['Subsidies', 'Citizens']"
        :selected-tab="selectedTab"
        @update:selected-tab="selectedTab = $event"
      ></TabButtons>

      <div id="subsidies-tab" v-if="selectedTab === 'Subsidies'">
        <h2>Subsidies</h2>

        <SubsidyCreation
          v-if="showSubsidyCreation"
          :citizen="selectedCitizen"
          :masterAccount="selectedMasterAccount"
          @submit="createSubsidy"
          @cancel="showSubsidyCreation = false"
        ></SubsidyCreation>

        <PaymentCreation
          v-if="showPaymentCreation"
          :subsidy="selectedSubsidy"
          :masterAccount="selectedMasterAccount"
          @submit="createPayment"
          @cancel="showPaymentCreation = false"
        ></PaymentCreation>

        <section id="account-subsidies">
          <SubsidiesTable
            :data="filteredSubsidies"
            :selected="selectedSubsidyId"
            @update:selected="onSubsidySelection"
          ></SubsidiesTable>
          <section id="subsidy-details" v-if="!!selectedSubsidy">
            <button
              v-if="selectedMasterAccountId && selectedSubsidy"
              class="action primary pull-right"
              @click="showPaymentCreation = true"
            >
              <span>Add Payment</span>
            </button>
            <h3>Subsidy Details</h3>
            <SubsidyDetails :subsidy="selectedSubsidy"></SubsidyDetails>

            <h3>Transactions</h3>
            <TransactionsTable
              v-if="selectedSubsidy.account.transactions"
              :data="selectedSubsidy.account.transactions"
            ></TransactionsTable>
          </section>
        </section>
      </div>

      <div id="citizens-tab" v-if="selectedTab === 'Citizens'">
        <CitizenCreation
          v-if="showCitizenCreation"
          @cancel="showCitizenCreation=false"
          @submit="createCitizen"
        ></CitizenCreation>
        <button class="action primary pull-right" @click="showCitizenCreation=true">
          <span>Create new</span>
        </button>
        <CitizensTable
          :data="citizens"
          :selected-id="selectedCitizenId"
          @update:selected-id="onCitizenSelection"
        ></CitizensTable>
      </div>
    </section>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import { MasterAccount } from "@/models/api/masterAccount";
import { Subsidy } from "@/models/api/subsidy";
import { Citizen } from "@/models/api/citizen";

import MasterAccountsCreation from "@/components/master-accounts/MasterAccountsCreation.vue";
import MasterAccountsTable from "@/components/master-accounts/MasterAccountsTable.vue";

import CitizenCreation from "@/components/citizen/CitizenCreation.vue";
import CitizensTable from "@/components/citizen/CitizensTable.vue";

import SubsidiesTable from "@/components/subsidies/SubsidiesTable.vue";
import SubsidyDetails from "@/components/subsidies/SubsidyDetails.vue";
import SubsidyCreation from "@/components/subsidies/SubsidyCreation.vue";
import TransactionsTable from "@/components/subsidies/TransactionsTable.vue";
import PaymentCreation from "@/components/payment/PaymentCreation.vue";

import ExportRequest from "@/components/export/ExportRequest.vue";
import TabButtons from "@/components/TabButtons.vue";
import ErrorSummary from "@/components/ErrorSummary.vue";

import masterAccountService from "@/services/master-account/master-account.service";
import citizenService from "@/services/citizen/citizen.service";
import subsidyService from "@/services/subsidy/subsidy.service";
import paymentService from "@/services/payment/payment.service";

import csvService from "@/services/export/csv.service";
import fileService from "@/services/file/file.service";

import { FullEntity } from "@/models/full-entity";
import { SubsidyBase } from "@/models/api/subsidyBase";
import { MasterAccountBase } from "@/models/api/masterAccountBase";
import { CitizenBase } from "@/models/api/citizenBase";
import { Payment } from "@/models/api/payment";
import { Route, RouterMode } from "vue-router";
import { ExportRequestData } from "@/models/api/exportRequestData";
import initiativesService from "@/services/initiatives/initiatives.service";
import { Initiative } from "@/models/api/models";

@Component({
  components: {
    MasterAccountsTable,
    MasterAccountsCreation,
    CitizensTable,
    CitizenCreation,
    SubsidiesTable,
    SubsidyDetails,
    SubsidyCreation,
    TransactionsTable,
    PaymentCreation,
    TabButtons,
    ExportRequest,
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

  initiatives: Initiative[] = [];
  initiativeNames: string[] = [];
  initiative?: Initiative = { id: "", name: "" };

  selectedTab: "Subsidies" | "Citizens" = "Subsidies";
  message?: string = "";

  showSubsidyCreation = false;
  showMasterAccountCreation = false;
  showCitizenCreation = false;
  showPaymentCreation = false;
  showDownloadDialog = false;

  changeInitiative(initiative: string) {
    const newRoute = { name: this.$route.name, params: { initiative } };
    this.$router.push(newRoute);
    this.selectedMasterAccount = {};
    this.filteredSubsidies = [];
    this.selectedSubsidy = {};
  }

  async loadInitiative(initiativeName?: string) {
    if (!initiativeName) {
      this.initiative = this.initiatives.find(i => i.default === true);
    } else {
      this.initiative = this.initiatives.find(i => i.name === initiativeName);
    }

    if (!this.initiative) {
      throw new Error(`Could not load the current initiative ${initiativeName || ''}`);
    }

    this.masterAccounts = await masterAccountService.getAll(
      this.initiative!.name
    );
    this.citizens = await citizenService.getAll();
    this.allSubsidies = await subsidyService.getAll();
  }

  async mounted() {
    this.initiatives = await initiativesService.getInitiatives();
    this.initiativeNames = this.initiatives.map(i => i.name!);

    this.loadInitiative(this.$route.params.initiative);
  }

  @Watch("$route")
  onRouteChange(from: Route, to: Route) {
    this.loadInitiative(this.$route.params.initiative);
  }

  get selectedMasterAccountId() {
    return this.selectedMasterAccount
      ? this.selectedMasterAccount.id
      : undefined;
  }

  onMasterAccountSelection(id: string) {
    this.selectedMasterAccount = this.masterAccounts.find(acc => acc.id === id);
    this.filteredSubsidies = this.allSubsidies.filter(
      s => s.master && s.master.id === id
    );
    this.selectedSubsidy = undefined;
    this.selectedCitizen = undefined;
  }

  async createMasterAccount(masterAccount: MasterAccountBase) {
    try {
      await masterAccountService.create(
        Object.assign(masterAccount, { initiative: this.initiative })
      );
      this.masterAccounts = await masterAccountService.getAll(this.initiative!.name);
      this.message = "";
      this.showMasterAccountCreation = false;
    } catch (error) {
      this.message = "Failed to create master account: " + error.message;
    }
  }

  get selectedSubsidyId() {
    return this.selectedSubsidy ? this.selectedSubsidy.id : undefined;
  }

  async onSubsidySelection(id: string) {
    this.selectedSubsidy = await subsidyService.getById(id);
  }

  async beginCreateSubsidy() {
    if (!this.selectedCitizen) {
      this.selectedTab = "Citizens";
      this.message = "Please select a citizen and try again";
    } else {
      this.message = "";
      this.selectedTab = "Subsidies";
      this.showSubsidyCreation = true;
    }
  }

  async createSubsidy(result: SubsidyBase) {
    try {
      await subsidyService.create(result);
      this.allSubsidies = await subsidyService.getAll();
      this.filteredSubsidies = [];
      this.selectedMasterAccount = undefined;
      this.message = "";
      this.showSubsidyCreation = false;
    } catch (error) {
      this.message = "Failed to create subsidy. " + error.message;
    }
  }

  get selectedCitizenId() {
    return this.selectedCitizen ? this.selectedCitizen.id : undefined;
  }

  async createCitizen(citizen: CitizenBase) {
    try {
      await citizenService.create(citizen);
      this.citizens = await citizenService.getAll();
      this.showCitizenCreation = false;
      this.message = "";
    } catch (error) {
      this.message = "Failed to create ciziten: " + error.message;
    }
  }

  onCitizenSelection(id: string) {
    this.selectedCitizen = this.citizens.find(s => s.id === id);
  }

  beginCreatePayment() {
    this.showPaymentCreation = true;
  }

  async createPayment(payment: Payment) {
    await paymentService.createPayment(payment);
    this.showPaymentCreation = false;
    await this.onSubsidySelection(this.selectedSubsidyId!);
  }

  async exportData(requestData: ExportRequestData) {
    const csvBlob = await csvService.getCsvBlob(requestData);
    fileService.download(csvBlob, "data.csv");
  }
}
</script>

<style scoped lang="scss">
.tabs {
  display: flex;
  margin-top: 20px;
}
</style>

<style lang="scss">
#initiative-buttons .tabs li {
  a {
    padding: 10px 20px;
    border-right: 6px solid #bebebe;
  }

  &.selected a {
    border-width: 5px;
    border-color: black;
  }
}
</style>

