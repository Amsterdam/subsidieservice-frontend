<template>
  <div>
      <button class="action primary pull-right" @click="download">  <span >  Download as .CSV </span> </button>
      <table id="master-accounts-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="account in data" v-bind:class="{ selected: selected == account.id }" @click="assignAccount(account.id)">
              <td>{{ account.id }}</td>
              <td>{{ account.name }}</td>
              <td>{{ account.balance }}</td>
            </tr>
          </tbody>
        </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { MasterAccount } from "@/models/masterAccount";
import csvService from "@/services/csv/csv.service";

@Component
export default class MasterAccountsTable extends Vue {
  @Prop()
  private data!: MasterAccount[];

  private selected?: string = "";

  @Emit("update:selected")
  assignAccount(id: string) {
    this.selected = id;
  }

  download() {
    csvService.downloadCsv(this.data, "master-accounts.csv");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#master-accounts-table tr {
  cursor: pointer;

  &.selected {
    background-color: aliceblue;
    td {
      box-shadow: none;
    }
  }
}
</style>
