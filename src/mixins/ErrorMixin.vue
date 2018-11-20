
<script lang="ts">
import Vue from "vue";
import { ValidationError } from "@/models/validation/validation-error";
import Component from "vue-class-component";

@Component
export default class ErrorMixin extends Vue {
  /** Simple map/dictionary with name of field as key and error message as value */
  public validation: { [key: string]: string } = {};

  /** Returns whether any errors were set after calling setErrors */
  protected get hasErrors() {
    return this.errors.length > 0;
  }

  /** Returns all errors that were set after calling setErrors */
  protected get errors() {
    return Object.values(this.validation).filter(err => !!err);
  }

  /** Takes a collection of errors and updates the error/validation state */
  protected setErrors(validationErrors: IterableIterator<ValidationError>) {
    this.validation = {};
    const errorArray = Array.from(validationErrors);

    for (const error of errorArray) {
      this.$set(this.validation, error.fieldName, error.message);
    }
  }
}
</script>