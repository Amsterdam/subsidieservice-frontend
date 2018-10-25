<template>
  <div>
      <h2> Master Accounts </h2>
      <table id="master-accounts-table" class="row-selection">
          <thead>
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Balance</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="account in data" :key="account.id"
            v-bind:class="{ selected: selected === account.id }" @click="assignAccount(account.id)">
              <td>{{ account.name }}</td>
              <td>{{ account.description }}</td>
              <td>{{ account.balance }}</td>
            </tr>
          </tbody>
      </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { MasterAccount } from "@/models/api/masterAccount";


@Component
export default class MasterAccountsTable extends Vue {
  @Prop()
  private data!: MasterAccount[];

  private selected?: string = "";

  @Emit("update:selected")
  assignAccount(id: string) {
    this.selected = id;
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
