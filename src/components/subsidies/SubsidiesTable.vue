<template>
  <section id="subsidies">
    <div id="table-filters">
        <FilterButtons :filterNames="Object.keys(SubsidyStatus)" 
          :result-count="filteredData.length"
          @update:selected-filter="onFilterChange" ></FilterButtons>
    </div>
    <div id="table-data">
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
            v-bind:class="{ selected: selected === subsidy.id }" @click="$emit('update:selected', subsidy.id)" >
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
import { Component, Prop, Vue, Emit, Watch } from "vue-property-decorator";
import { Subsidy } from "@/models/api/subsidy";
import { SubsidyStatus } from "@/models/subsidy-status";

import FilterButtons from "@/components/FilterButtons.vue";

@Component({
  components: { FilterButtons }
})
export default class SubsidiesTable extends Vue {
  @Prop()
  private data!: Subsidy[];


  @Prop()
  private selected!: string;

  private activeFilter: string = "";
  private filteredData = this.data;

  private SubsidyStatus = SubsidyStatus;

  @Watch("data", { immediate: true })
  onDataChanged(data: Subsidy[]) {
    this.filteredData = data; // reset filters
  }

  onFilterChange(filter: string) {
    if (filter === "ALL") {
      this.filteredData = this.data;
    } else {
      this.filteredData = this.data.filter(s => s.status === filter);
    }
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
