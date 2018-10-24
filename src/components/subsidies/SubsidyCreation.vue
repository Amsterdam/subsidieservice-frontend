<template>
  <div class="container">
    <h1> Create a subsidy </h1>
    <div class="formulier-section">
      <div class="formshadow">
        <form v-on:submit.prevent="submit">
          <div class="rij mode_input text rij_verplicht">
              <div class="label">
                <label for="formInput">Subsidy Name</label>
              </div>
              <div class="invoer">
                <input type="text" v-model="subsidyData.name" placeholder="Subsidy Name" class="input">
              </div>
            </div>
          <div class="rij mode_input text rij_verplicht">
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

          <div class="error-summary" v-if="message">
            <h2>Error</h2>
            <ul>
              <li> {{message}} </li>
            </ul>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from "vue-property-decorator";
import { MasterAccount } from "@/models/api/masterAccount";
import { CitizenBase } from "@/models/api/citizenBase";
import { SubsidyBase } from "@/models/api/subsidyBase";
import subsidyService from "@/services/subsidy/subsidy.service";

@Component
export default class SubsidyDetails extends Vue {
  @Prop()
  private citizen!: CitizenBase;

  @Prop()
  private masterAccount!: MasterAccount;

  private subsidyData = {
    name: "",
    amount: 0,
    comment: ""
  };

  private message: string = "";

  async submit() {
    try {
      const result: SubsidyBase = Object.assign(this.subsidyData, {
        master: { id: this.masterAccount.id },
        recipient: { id: this.citizen.id },
        amount: Number(this.subsidyData.amount)
      });

      await subsidyService.create(result);
      this.$emit("success");
    } catch (error) {
      this.message = error.message;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
