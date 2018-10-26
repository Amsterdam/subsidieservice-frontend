<template>
  <div class="container">
    <h1> Create a citizen account </h1>
    <div class="formulier-section">
      <div class="formshadow">
        <form v-on:submit.prevent="submit">
          <div class="rij mode_input text rij_verplicht" :class="{invalid : validation['name']}">
              <div class="label">
                <label for="formInput">Name</label>
              </div>
              <div class="invoer">
                <input type="text" v-model="citizenData.name" placeholder="Name" class="input">
              </div>
            </div>
          <div class="rij mode_input text rij_verplicht" :class="{invalid : validation['email']}">
              <div class="label">
                <label for="formInput">Email</label>
              </div>
              <div class="invoer">
                <input v-model="citizenData.email" placeholder="Email" class="input" type="email">
              </div>
          </div>
          <div class="rij mode_input text rij_verplicht" :class="{invalid : validation['phone_number']}">
              <div class="label">
                <label for="formInput">Phone number</label>
              </div>
              <div class="invoer">
                <input v-model="citizenData.phone_number" placeholder="Phone number" class="input" type="text">
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
import { CitizenBase } from "@/models/api/citizenBase";
import ErrorSummary from "@/components/ErrorSummary.vue";

@Component({ components: { ErrorSummary } })
export default class CitizenCreation extends Vue {
  private citizenData: CitizenBase = {
    name: "",
    email: "",
    phone_number: ""
  };

  private message: string = "";

  private validation: { [key: string]: string } = {};

  get hasErrors() {
    return this.errors.length > 0;
  }

  get errors() {
    return Object.values(this.validation).filter(err => !!err);
  }

  submit() {
    let hasErrors = false;

    if (!this.citizenData.name) {
      this.$set(this.validation, "name", "Name is required");
      hasErrors = true;
    } else {
      this.$set(this.validation, "name", undefined);
    }

    if (!this.citizenData.email) {
      this.$set(this.validation, "email", "Email is required");
      hasErrors = true;
    } else {
      this.$set(this.validation, "email", undefined);
    }

    if (!this.citizenData.phone_number
       || this.citizenData.phone_number.length < 10
       || this.citizenData.phone_number.length > 15
    ) {
      this.$set(this.validation, "phone_number", "Phone number is not correct");
      hasErrors = true;
    } else {
      this.$set(this.validation, "phone_number", undefined);
    }

    if (!hasErrors) {
      this.$emit("submit", this.citizenData);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
