<template>
  <table>
    <caption>Subsidies Data</caption>
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Email</th>
        <th>Phone number</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="subsidy in data">
        <td>{{ subsidy.id }}</td>
        <td>{{ subsidy.name }}</td>
        <td>{{ subsidy.frequency }}</td>
        <td>{{ subsidy.account }}</td>
      </tr>
    </tbody>
  </table>


</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Subsidy } from "@/models/subsidy";

@Component
export default class SubsidiesTable extends Vue {
  @Prop()
  private data!: Subsidy[];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
