<template>
<div class="data-summary primary">
  <div class="data-wrapper">
    <dl>
      <dt> Master Account </dt>
      <dd> {{subsidy.master.name}} </dd>
    </dl>
    <dl>
      <dt> Recipient </dt>
      <dd> {{subsidy.recipient.name}} </dd>
    </dl>
    <dl>
      <dt> Start Date </dt>
      <dd> {{subsidy.startDate}} </dd>
    </dl>
    <dl>
      <dt>End Date </dt>
      <dd> {{subsidy.endDate}} </dd>
    </dl>
    <dl>
      <dt>Status</dt>
      <dd>{{subsidy.status}}</dd>
    </dl>
  </div>
  <div class="data-wrapper-wide">
    <dl>
      <dt> Comment</dt>
      <dd>{{subsidy.comment}}</dd>
    </dl>
  </div>
</div>



</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Subsidy } from "@/models/subsidy";

@Component
export default class SubsidyDetails extends Vue {
  @Prop()
  private subsidy!: Subsidy;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
