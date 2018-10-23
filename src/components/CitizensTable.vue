<template>
  <div>
    <button class="action primary pull-right" @click="download">  <span>  Download as .CSV </span> </button>

    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Name</th>
          <th>Email</th>
          <th>Phone number</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="citizen in data">
          <td>{{ citizen.id }}</td>
          <td>{{ citizen.name }}</td>
          <td>{{ citizen.email }}</td>
          <td>{{ citizen.phoneNumber }}</td>
        </tr>
      </tbody>
  </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Citizen } from "@/models/citizen";
import csvService from "@/services/csv/csv.service";

@Component
export default class CitizensTable extends Vue {
  @Prop()
  private data!: Citizen[];

  download() {
    csvService.downloadCsv(this.data, "citizens.csv");
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
