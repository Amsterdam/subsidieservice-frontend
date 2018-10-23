<template>

<div class="error-summary" v-if="errors && errors.length">
    <h2>Error</h2>
    <ul>
        <li v-for="error in errors"> {{error}} </li>
    </ul>
</div>




</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";

@Component
export default class TabButtons extends Vue {
  @Prop()
  private errors!: string[];
}
</script>

