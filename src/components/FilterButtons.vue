<template>

<ul class="tabs">
    <li v-for="filter in filterNames"  v-bind:class="{selected: selectedFilter === filter}">
        <a @click="$emit('update:selected-filter', filter)"> {{filter}} </a>
    </li>
</ul>

</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";

@Component
export default class TabButtons extends Vue {
  @Prop()
  private selectedFilter!: string;

  @Prop()
  private filterNames!: string[];
}
</script>

