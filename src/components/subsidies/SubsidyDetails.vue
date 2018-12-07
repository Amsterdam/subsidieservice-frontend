<template>
  <div class="data-summary primary">
    <div class="data-wrapper row">
      <div class="col-md-6">
        <dl>
          <dt>Subsidy</dt>
          <dd>{{subsidy.name}}</dd>
        </dl>
        <dl>
          <dt>Ammount</dt>
          <dd>{{subsidy.amount}}</dd>
        </dl>
        <dl>
          <dt>Master Name</dt>
          <dd>{{subsidy.master.name}}</dd>
        </dl>
        <dl>
          <dt>Master IBAN</dt>
          <dd>{{subsidy.master.iban}}</dd>
        </dl>
        <dl>
          <dt>Master Balance</dt>
          <dd>{{subsidy.master.balance}}</dd>
        </dl>
      </div>

      <div class="col-md-6">
        <dl>
          <dt>Recipient Name</dt>
          <dd>{{subsidy.recipient.name}}</dd>
        </dl>
        <dl>
          <dt>Recipient Email</dt>
          <dd>{{subsidy.recipient.email}}</dd>
        </dl>
        <dl>
          <dt>Recipient IBAN</dt>
          <dd>{{subsidy.account.iban}}</dd>
        </dl>
        <dl>
          <dt>Status</dt>
          <dd>{{subsidy.status}}</dd>
        </dl>
        <dl>
          <dt>Account Balance</dt>
          <dd>{{subsidy.account.balance}}</dd>
        </dl>
        <dl>
          <dt>Last updated</dt>
          <dd>{{subsidy.last_updated}}</dd>
        </dl>
      </div>
    </div>

    <div class="data-wrapper-wide">
      <dl>
        <dt>Comment</dt>
        <dd>{{subsidy.comment}}</dd>
      </dl>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import { Subsidy } from "@/models/api/subsidy";

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
    min-width: 120px;
    font-weight: 400;
  }

  dd {
    max-width: 460px;
    font-weight: 700;
  }
}

.data-wrapper-wide {
  margin-top: 40px;

  > dl dd {
    max-width: unset;
  }
}
</style>
