<template>
  <div>
    <table class="row-selection">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Phone number</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="citizen in data" :key="citizen.id"
            v-bind:class="{ selected: selectedId == citizen.id }"
            @click="setSelected(citizen.id)">
          <td>{{ citizen.name }}</td>
          <td>{{ citizen.email }}</td>
          <td>{{ citizen.phone_number }}</td>
        </tr>
      </tbody>
  </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { Citizen } from "@/models/api/citizen";

@Component
export default class CitizensTable extends Vue {
  @Prop()
  private data!: Citizen[];

  private selectedId: string = "";

  @Emit("update:selected-id")
  setSelected(id: string) {
    this.selectedId = id;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
