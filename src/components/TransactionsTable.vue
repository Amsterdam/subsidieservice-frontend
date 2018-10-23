<template>
  <div>
    <button class="action primary pull-right" @click="download">  <span >  Download as .CSV </span> </button>
    <table>
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
            <tr v-for="transaction in data">
              <td>{{ transaction.counterpartyName }}</td>
              <td>{{ transaction.counterpartyIban }}</td>
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
import { Transaction } from "@/models/transaction";
import csvService from "@/services/csv/csv.service";

@Component
export default class TransactionsTable extends Vue {
  @Prop()
  private data!: Transaction[];

  download() {
    csvService.downloadCsv(this.data, "transactions.csv");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
