<template>
  <table>
    <caption>Citizens Data</caption>
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


</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Citizen } from "@/models/citizen";

@Component
export default class CitizensTable extends Vue {
  @Prop()
  private data!: Citizen[];
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
