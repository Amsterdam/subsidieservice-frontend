<template>
  <div class="container">
    <h1> Create a subsidy </h1>
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
                <input type="text" v-model="citizen.name" class="input" disabled>
              </div>
          </div>
          <hr>

          <div class="rij mode_input text rij_verplicht" :class="{invalid : validation['name']}">
              <div class="label">
                <label for="formInput">Subsidy Name</label>
              </div>
              <div class="invoer">
                <input type="text" v-model="subsidyData.name" placeholder="Subsidy Name" class="input">
              </div>
          </div>

          <div class="rij mode_input text rij_verplicht" :class="{invalid : validation['amount']}">
              <div class="label">
                <label for="formInput">Amount</label>
              </div>
              <div class="invoer">
                <input  v-model="subsidyData.amount" placeholder="Amount" class="input" type="text">
              </div>
          </div>
          <div class="rij mode_input text rij_verplicht">
              <div class="label">
                <label for="formInput">Comment</label>
              </div>
              <div class="invoer">
                <input v-model="subsidyData.comment" placeholder="Comment" class="input" type="text">
              </div>
          </div>

          <button class="action primary"> Submit </button>
          <button type="reset" class="action" @click="$emit('cancel')" > Cancel </button>

          <ErrorSummary v-if="hasErrors" :errors="errors"></ErrorSummary>
          
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit, Mixins } from "vue-property-decorator";
import { MasterAccount } from "@/models/api/masterAccount";
import { CitizenBase } from "@/models/api/citizenBase";
import { SubsidyBase } from "@/models/api/subsidyBase";

import ErrorSummary from "@/components/ErrorSummary.vue";
import ErrorMixin from "@/mixins/ErrorMixin.vue";
import { ValidationError } from "@/models/validation/validation-error";

@Component({
  components: { ErrorSummary }
})
export default class SubsidyDetails extends Mixins(ErrorMixin) {
  @Prop()
  private citizen!: CitizenBase;

  @Prop()
  private masterAccount!: MasterAccount;

  private subsidyData = {
    name: "",
    amount: 0,
    comment: ""
  };

  submit() {
    this.setErrors(this.validate());

    if (!this.hasErrors) {
      const result = Object.assign(this.subsidyData, {
        master: { id: this.masterAccount.id },
        recipient: { id: this.citizen.id },
        amount: Number(this.subsidyData.amount)
      });

      this.$emit("submit", result);
    }
  }

  *validate() {
    if (!this.subsidyData.name) {
      yield new ValidationError("name", "Name is required");
    }

    if (!this.subsidyData.amount || isNaN(this.subsidyData.amount)) {
      yield new ValidationError("amount", "Amount is not correct");
    }
  }
}
</script>

<style lang="scss" scoped>
hr {
  margin: 20px 0;
}
</style>
