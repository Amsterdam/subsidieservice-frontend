<template>
  <section id="subsidies">
    <div id="table-filters">
      {{resultsCount}}
        <FilterButtons :filterNames="['OPEN', 'CLOSED', 'PENDING_ACCEPT', 'ALL']" 
          :result-count="filteredData.length"
          @update:selected-filter="onFilterChange" ></FilterButtons>
    </div>
    <div id="table-data">
      <button class="action primary pull-right" @click="download"> <span>  Download as .CSV </span> </button>
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
            <tr v-for="subsidy in filteredData" :key="subsidy.id"
            v-bind:class="{ selected: selected === subsidy.id }" @click="selectSubsidy(subsidy.id)" >
              <td>{{ subsidy.name }}</td>
              <td>{{ subsidy.account.iban }}</td>
              <td>{{ subsidy.amount }}</td>
              <td>{{ subsidy.status }}</td>
            </tr>
          </tbody>
        </table>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { Subsidy } from "@/models/subsidy";

import FilterButtons from "@/components/FilterButtons.vue";
import csvService from "@/services/csv/csv.service";

@Component({
  components: { FilterButtons }
})
export default class SubsidiesTable extends Vue {
  @Prop()
  private data!: Subsidy[];

  private selected?: string = "";

  private activeFilter: string = "";
  private filteredData = this.data;

  @Emit("update:selected")
  selectSubsidy(id: string) {
    this.selected = id;
  }

  onFilterChange(filter: string) {
    if (filter === "ALL") {
      this.filteredData = this.data;
    } else {
      this.filteredData = this.data.filter(s => s.status === filter);
    }
  }

  download() {
    csvService.downloadCsv(this.data, "subsidies.csv");
  }
}
</script>


<style scoped lang="scss">
#subsidies {
  display: flex;
  clear: both;

  div:last-child {
    flex-grow: 1;
  }
}
</style>
