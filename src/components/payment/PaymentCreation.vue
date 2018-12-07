<template>
  <div class="container">
    <h1>Create a payment</h1>
    <div class="formulier-section">
      <div class="formshadow">
        <form v-on:submit.prevent="submit">
          <div class="rij mode_readonly text rij_verplicht">
            <div class="label">
              <label for="formInput">Chosen Master Account</label>
            </div>
            <div class="invoer">
              <input type="text" v-model="masterAccount.name" class="input" disabled>
            </div>
          </div>

          <div class="rij mode_readonly text rij_verplicht">
            <div class="label">
              <label for="formInput">Chosen Recipient</label>
            </div>
            <div class="invoer">
              <input type="text" v-model="subsidy.recipient.name" class="input" disabled>
            </div>
          </div>
          <hr>

          <div class="rij mode_input text rij_verplicht" :class="{invalid : validation['name']}">
            <div class="label">
              <label for="formInput">Payment Name</label>
            </div>
            <div class="invoer">
              <input
                type="text"
                v-model="paymentData.name"
                placeholder="Payment Name"
                class="input"
              >
            </div>
          </div>

          <div class="rij mode_input text rij_verplicht" :class="{invalid : validation['amount']}">
            <div class="label">
              <label for="formInput">Amount</label>
            </div>
            <div class="invoer">
              <input v-model="paymentData.amount" placeholder="Amount" class="input" type="text">
            </div>
          </div>
          <div class="rij mode_input text rij_verplicht">
            <div class="label">
              <label for="formInput">Comment</label>
            </div>
            <div class="invoer">
              <input v-model="paymentData.comment" placeholder="Comment" class="input" type="text">
            </div>
          </div>

          <button class="action primary">Submit</button>
          <button type="reset" class="action" @click="$emit('cancel')">Cancel</button>

          <ErrorSummary v-if="hasErrors" :errors="errors"></ErrorSummary>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Mixins } from "vue-property-decorator";

import ErrorSummary from "@/components/ErrorSummary.vue";
import ErrorMixin from "@/mixins/ErrorMixin.vue";

import { CitizenBase } from "@/models/api/citizenBase";
import { Payment } from "@/models/api/payment";
import { SubsidyBase } from "@/models/api/subsidyBase";
import { MasterAccount } from "@/models/api/masterAccount";
import { ValidationError } from "@/models/validation/validation-error";

@Component({ components: { ErrorSummary } })
export default class PaymentCreation extends Mixins(ErrorMixin) {
  @Prop()
  private subsidy!: SubsidyBase;

  @Prop()
  private masterAccount!: MasterAccount;

  private paymentData: Payment = {};

  submit() {
    this.setErrors(this.validate());

    if (!this.hasErrors) {
      const result = Object.assign(this.paymentData, {
        from: { id: this.masterAccount.id },
        to: { id: this.subsidy.id },
        amount: Number(this.paymentData.amount),
        comment: this.paymentData.comment
      });

      this.$emit("submit", result);
    }
  }

  *validate() {
    if (!this.paymentData.name) {
      yield new ValidationError("name", "Name is required");
    }
    if (!this.paymentData.amount || isNaN(this.paymentData.amount)) {
      yield new ValidationError("amount", "Amount is not correct");
    } else if (
      !isNaN(this.paymentData.amount) &&
      Number(this.paymentData.amount) > 500
    ) {
      yield new ValidationError("amount", "Amount cannot be larger than 500");
    }
  }
}
</script>

