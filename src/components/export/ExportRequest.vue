<template>
  <div id="date-range">
    <h1>Choose period for the CSV</h1>
    <div class="formulier-section">
      <div class="formshadow">
        <form v-on:submit.prevent="submit">
          <div
            class="rij mode_input text rij_verplicht"
            :class="{invalid : validation['startDate']}"
          >
            <div class="label">
              <label for="formInput">From Date (non mandatory)</label>
            </div>
            <div class="invoer">
              <input type="date" v-model="startDate" placeholder="From Date" class="input">
            </div>
          </div>
          <div class="rij mode_input text rij_verplicht" :class="{invalid : validation['endDate']}">
            <div class="label">
              <label for="formInput">To Date (non mandatory)</label>
            </div>
            <div class="invoer">
              <input v-model="endDate" placeholder="To Date" class="input" type="date">
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
import {
  Component,
  Prop,
  Vue,
  Emit,
  Mixins,
  Watch
} from "vue-property-decorator";
import ErrorMixin from "@/mixins/ErrorMixin.vue";
import ErrorSummary from "@/components/ErrorSummary.vue";
import { ValidationError } from "@/models/validation/validation-error";
import { ExportRequestData } from "@/models/api/exportRequestData";

@Component({ components: { ErrorSummary } })
export default class ExportRequest extends Mixins(ErrorMixin) {
  startDate = "";
  endDate = "";

  @Prop()
  initiativeName!: string;

  submit() {
    this.setErrors(this.validate());

    if (!this.hasErrors) {
      const from = this.startDate ? new Date(this.startDate) : undefined;
      const to = this.endDate ? new Date(this.endDate) : undefined;

      const requestData: ExportRequestData = { from, to, initiative: this.initiativeName };
      this.$emit("submit", requestData);
    }
  }

  *validate() {
    const start = new Date(this.startDate);
    const end = new Date(this.endDate);

    if (this.startDate && isNaN(start.getDate())) {
      yield new ValidationError("startDate", "from date is not a valid date");
    }

    if (this.endDate && isNaN(end.getDate())) {
      yield new ValidationError("endDate", "'to' date is not a valid date");
    }

    if (!isNaN(start.getDate()) && !isNaN(end.getDate()) && start > end) {
      yield new ValidationError(
        "endDate",
        "'To Date' date must be after the 'From Date'"
      );
    }
  }
}
</script>

