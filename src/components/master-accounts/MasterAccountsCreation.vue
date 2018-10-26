<template>
  <div class="container">
    <h1> Create a master account </h1>
    <div class="formulier-section">
      <div class="formshadow">
        <form v-on:submit.prevent="submit">
          <div class="rij mode_input text rij_verplicht" :class="{invalid : validation['name']}" >
              <div class="label">
                <label for="formInput">Master Name</label>
              </div>
              <div class="invoer">
                <input type="text" v-model="masterAccountData.name" placeholder="Master Name" class="input">
              </div>
            </div>
          <div class="rij mode_input text rij_verplicht" :class="{invalid : validation['description']}">
              <div class="label">
                <label for="formInput">Description</label>
              </div>
              <div class="invoer">
                <textarea v-model="masterAccountData.description" placeholder="Description" class="input" type="text"> </textarea>
              </div>
          </div>
          <div class="rij mode_input text rij_verplicht" :class="{invalid : validation['iban']}">
              <div class="label">
                <label for="formInput">IBAN</label>
              </div>
              <div class="invoer">
                <input v-model="masterAccountData.iban" placeholder="IBAN" class="input" type="text">
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
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { MasterAccount } from "@/models/api/masterAccount";
import { MasterAccountBase } from "@/models/api/masterAccountBase";

import ErrorSummary from "@/components/ErrorSummary.vue";

@Component({ components: { ErrorSummary } })
export default class MasterAccountsCreation extends Vue {
  private masterAccountData: MasterAccountBase = {
    name: "",
    description: "",
    iban: ""
  };

  private validation: { [key: string]: string } = {};

  get hasErrors() {
    return this.errors.length > 0;
  }

  get errors() {
    return Object.values(this.validation).filter(err => !!err);
  }

  submit() {
    let hasErrors = false;

    if (!this.masterAccountData.name) {
      this.$set(this.validation, "name", "Name is required");
      hasErrors = true;
    } else {
      this.$set(this.validation, "name", undefined);
    }

    if (!this.masterAccountData.description) {
      this.$set(this.validation, "description", "Description is required");
      hasErrors = true;
    } else {
      this.$set(this.validation, "description", undefined);
    }

    if (!this.masterAccountData.iban) {
      this.$set(this.validation, "iban", "IBAN is required");
      hasErrors = true;
    } else {
      this.$set(this.validation, "iban", undefined);
    }

    if (!hasErrors) {
      this.$emit("submit", this.masterAccountData);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
