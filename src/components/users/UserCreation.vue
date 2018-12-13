<template>
  <div class="container">
    <h1>Create a new user</h1>
    <div class="formulier-section">
      <div class="formshadow">
        <form v-on:submit.prevent="submit">
          <div
            class="rij mode_input text rij_verplicht"
            :class="{invalid : validation['username']}"
          >
            <div class="label">
              <label for="formInput">Username</label>
            </div>
            <div class="invoer">
              <input type="text" v-model="user.username" placeholder="Username" class="input">
            </div>
          </div>

          <div class="rij mode_input text rij_verplicht" :class="{invalid : validation['email']}">
            <div class="label">
              <label for="formInput">Email</label>
            </div>
            <div class="invoer">
              <input type="email" v-model="user.email" placeholder="Email" class="input">
            </div>
          </div>

          <div
            class="rij mode_input text rij_verplicht"
            :class="{invalid : validation['password']}"
          >
            <div class="label">
              <label for="formInput">Password</label>
            </div>
            <div class="invoer">
              <input v-model="user.password" placeholder="Password" class="input" type="password">
            </div>
          </div>

          <div
            class="rij mode_input text rij_verplicht"
            :class="{invalid : validation['real_name']}"
          >
            <div class="label">
              <label for="formInput">Realname</label>
            </div>
            <div class="invoer">
              <input v-model="user.real_name" placeholder="Real name" class="input" type="text">
            </div>
          </div>

          <div
            class="rij mode_input text rij_verplicht"
            :class="{invalid : validation['phone_number']}"
          >
            <div class="label">
              <label for="formInput">Phone number</label>
            </div>
            <div class="invoer">
              <input v-model="user.phone_number" placeholder="Phone number" class="input" type="tel">
            </div>
          </div>

          <div class="rij mode_input checkbox">
            <div class="invoer">
              <input type="checkbox" name id="isAdminCheckbox" class="input" v-model="user.is_admin" >
              <label for="isAdminCheckbox">Is admin</label>
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
import { ValidationError } from "@/models/validation/validation-error";
import { User } from '@/models/api/user';

@Component({ components: { ErrorSummary } })
export default class UserCreation extends Mixins(ErrorMixin) {
  private user: User = {
    email: "",
    password: "",
    real_name: "",
    username: "",
    phone_number: "",
    is_admin: false
  };

  submit() {
    this.setErrors(this.validate());

    if (!this.hasErrors) {
      this.$emit("submit", this.user);
    }
  }

  *validate() {
    if (!this.user.username) {
      yield new ValidationError("username", "Username is required");
    }
    if (!this.user.email) {
      yield new ValidationError("email", "Email is required");
    }
    if (!this.user.password) {
      yield new ValidationError("password", "Password is required");
    } else if (this.user.password.length < 6) {
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
