import { AbstractControl } from "@angular/forms";

export class CustomValidators {
  static addition(target: string, sourceOne: string, sourceTwo: string) {
    //simple way of doing code
    // if (form.value.a + form.value.b === parseInt(form.value.answer)) {
    //   return null;
    // }

    // return { answer: true };
    //--------------------------------by es6 feature Destructuring-------------------------------

    return (form: AbstractControl) => {
      const sum = form.value[target];
      const firstNumber = form.value[sourceOne];
      const secondNumber = form.value[sourceTwo];

      if (firstNumber + secondNumber === parseInt(sum)) {
        return null;
      }

      return { addition: true };
    };
  }
}
