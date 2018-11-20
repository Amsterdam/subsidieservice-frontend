<template>
  <div class="container">
    <h1> Reset password </h1>
    <div class="formulier-section">
      <div class="formshadow">
        <form v-on:submit.prevent="submit">
          <div class="mode_readonly text rij_verplicht">
              <div class="label">
                <label for="formInput">Username</label>
              </div>
              <div class="invoer">
                <input type="text" v-model="username" placeholder="Username" class="input" disabled>
              </div>
            </div>
          <div class="rij mode_input text rij_verplicht" :class="{invalid : validation['password']}">
              <div class="label">
                <label for="formInput">Password</label>
              </div>
              <div class="invoer">
                <input v-model="password" placeholder="Password" class="input" type="password">
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
import ErrorSummary from "@/components/ErrorSummary.vue";
import ErrorMixin from "@/mixins/ErrorMixin.vue";
import { ValidationError } from "@/models/validation/validation-error";

@Component({ components: { ErrorSummary } })
export default class UserEdit extends Mixins(ErrorMixin) {
  @Prop()
  private username!: string;

  private password: string = "";

  submit() {
    this.setErrors(this.validate());

    if (!this.hasErrors) {
      this.$emit("submit", {
        username: this.username,
        password: this.password
      });
    }
  }

  *validate() {
    if (!this.password) {
      yield new ValidationError("password", "Password is required");
    } else if (this.password.length < 6) {
      yield new ValidationError(
        "password",
        "Password must be at least 6 characters long"
      );
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
