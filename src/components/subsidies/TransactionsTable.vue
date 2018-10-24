<template>
  <div>
    <table class="row-selection">
          <thead>
            <tr>
              <th>Name</th>
              <th>IBAN</th>
              <th>Description</th>
              <th>Amount</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="transaction in data" :key="transaction.id">
              <td>{{ transaction.counterparty_name }}</td>
              <td>{{ transaction.counterparty_iban }}</td>
              <td>{{ transaction.description }}</td>
              <td>{{ transaction.amount }}</td>
              <td>{{ transaction.timestamp }}</td>
            </tr>
          </tbody>
        </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Transaction } from "@/models/api/transaction";

@Component
export default class TransactionsTable extends Vue {
  @Prop()
  private data!: Transaction[];

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
