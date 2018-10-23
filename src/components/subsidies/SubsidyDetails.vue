<template>
<div class="data-summary primary">
  <div class="data-wrapper row">
    <div class="col-md-6">
      <dl>
        <dt> Name </dt>
        <dd> {{subsidy.name}} </dd>
      </dl>
      <dl>
        <dt> Amount </dt>
        <dd> {{subsidy.amount}} </dd>
      </dl>
      <dl>
        <dt> Account Name </dt>
        <dd> {{subsidy.master.name}} </dd>
      </dl>
      <dl>
        <dt> Account IBAN </dt>
        <dd> {{subsidy.master.iban}} </dd>
      </dl>
      <dl>
        <dt> Account Balance </dt>
        <dd> {{subsidy.master.balance}} </dd>
      </dl>
    </div>

    <div class="col-md-6">
      <dl>
        <dt> Recipient Name </dt>
        <dd> {{subsidy.recipient.name}} </dd>
      </dl>
      <dl>
        <dt> Recipient Email </dt>
        <dd> {{subsidy.recipient.email}} </dd>
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
dl {
  display: flex;

  dt {
    min-width: 160px;
    font-weight: 400;
  }

  dd {
    max-width: 400px;
    font-weight: 700;
  }
}

.data-wrapper-wide > dl dd {
  max-width: unset;
}
</style>
