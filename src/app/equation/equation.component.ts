import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  NgControl,
  AbstractControl
} from "@angular/forms";
import { CustomValidators } from "../custom-validators";
import { delay, filter, scan } from "rxjs/operators";

@Component({
  selector: "app-equation",
  templateUrl: "./equation.component.html",
  styleUrls: ["./equation.component.css"]
})
export class EquationComponent implements OnInit {
  secondsPerSolutions = 0;
  mathForm = new FormGroup(
    {
      a: new FormControl(this.randomNumber()),
      b: new FormControl(this.randomNumber()),
      answer: new FormControl("")
    },
    [
      // (form: AbstractControl) => { // }
      CustomValidators.addition("answer", "a", "b")
    ]
  );
  constructor() {}

  get a() {
    return this.mathForm.controls.a.value;
  }

  get b() {
    return this.mathForm.controls.b.value;
  }

  ngOnInit() {
    // let numberOfProblemSolved = 0;
    // const startTime = new Date();
    this.mathForm.statusChanges
      .pipe(
        filter(value => value === "VALID"),
        delay(1000),
        scan(
          (acc, value) => {
            return {
              numberOfProblemSolved: acc.numberOfProblemSolved + 1,

              startTime: acc.startTime
            };
          },
          { numberOfProblemSolved: 0, startTime: new Date() }
        )
      )
      .subscribe(value => {
        //  console.log("ashish");
        // numberOfProblemSolved++;
        this.secondsPerSolutions =
          (new Date().getTime() - value.startTime.getTime()) /
          value.numberOfProblemSolved /
          1000;
        //.subscribe(value => {
        //here we are replacing if by filter operator.
        // if (value === "INVALID") {
        //   return;
        // }

        // this.mathForm.controls.a.setValue(this.randomNumber());
        // this.mathForm.controls.b.setValue(this.randomNumber());
        // this.mathForm.controls.answer.setValue("");

        // setValue()is used to update all values a and b and answer

        // this.mathForm.setValue({
        //   a: this.randomNumber(),
        //   b: this.randomNumber(),
        //   answer: ""
        // });

        // patchValue is used to update partial values like
        // either a or b or answer any one of them
        this.mathForm.patchValue({
          b: this.randomNumber(),
          answer: ""
        });
      });
  }

  randomNumber() {
    return Math.floor(Math.random() * 10);
  }
}
