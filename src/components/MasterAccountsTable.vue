<template>
  <table>
    <caption>Master Accounts Data</caption>
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Balance</th>
        <th> </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="account in data">
        <td>{{ account.id }}</td>
        <td>{{ account.name }}</td>
        <td>{{ account.balance }}</td>
        <td>
            <button v-on:click="assignAccount(account.id)">Check me</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { Component, Prop, Vue, Model } from "vue-property-decorator";
import { MasterAccount } from "@/models/masterAccount";

@Component
export default class MasterAccountsTable extends Vue {
  @Prop()
  private data!: MasterAccount[];

  private selected?: string = "";

  assignAccount(id: string) {
    this.selected = id;
    this.$emit('selectedChange', this.selected);
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
