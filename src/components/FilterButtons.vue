<template>
<div class="filters">
    <div class="filter-button">
        <span class="filter-label">Filter</span>
        <span class="filter-icon"></span>
        <span class="filter-pill">
            <span class="pill">{{resultCount}}</span>
        </span>
    </div>

    <ul class="filters-list">
        <li v-for="filter in filterNames" :key="filter" v-bind:class="{selected: selectedFilter === filter}">
            <a @click="$emit('update:selected-filter', filter)"> {{filter}} </a>
        </li>
    </ul>
 </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";

@Component
export default class TabButtons extends Vue {
  @Prop()
  private selectedFilter!: string;

  @Prop()
  private filterNames!: string[];

  @Prop() 
  private resultCount! : number;

}
</script>

<style scoped lang="scss">
  .filters-list{
      padding: 0;
      list-style: none;
      
      li{
          padding: 10px;
      }
  }
</style>


