<template>
  <ul class="tabs">
      <li v-for="tab in tabNames" :key="tab" v-bind:class="{selected: selectedTab === tab}">
          <a @click="$emit('update:selected-tab', tab)"> {{tab}} </a>
      </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";

@Component
export default class TabButtons extends Vue {
  @Prop()
  private selectedTab!: string;

  @Prop()
  private tabNames!: string[];
}
</script>

