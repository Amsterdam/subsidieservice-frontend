<template>
  <div>
    <button class="action primary pull-right" @click="download">  <span >  Download as .CSV </span> </button>
      <table class="row-selection">
          <thead>
            <tr>
              <th>Name</th>
              <th>IBAN</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="subsidy in data"  v-bind:class="{ selected: selected == subsidy.id }" @click="selectSubsidy(subsidy.id)" >
              <td>{{ subsidy.name }}</td>
              <td>{{ subsidy.account.iban }}</td>
              <td>{{ subsidy.amount }}</td>
              <td>{{ subsidy.status }}</td>
            </tr>
          </tbody>
        </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { Subsidy } from "@/models/subsidy";
import csvService from "@/services/csv/csv.service";

@Component
export default class SubsidiesTable extends Vue {
  @Prop()
  private data!: Subsidy[];

  private selected?: string = "";

  @Emit("update:selected")
  selectSubsidy(id: string) {
    this.selected = id;
  }

  download() {
    csvService.downloadCsv(this.data, "subsidies.csv");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
