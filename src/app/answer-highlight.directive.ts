import { Directive, ElementRef, ɵConsole } from "@angular/core";
import { NgControl } from "@angular/forms";
import { map, filter } from "rxjs/operators";
import { runInThisContext } from "vm";
@Directive({
  selector: "[appAnswerHighlight]"
})
export class AnswerHighlightDirective {
  constructor(private el: ElementRef, private controlName: NgControl) {
    console.log(this.el);
    console.log(this.controlName);
  }

  ngOnInit() {
    // console.log(this.controlName.control.parent);
    this.controlName.control.parent.valueChanges
      .pipe(
        map(({ a, b, answer }) => Math.abs((a + b - answer) / (a + b)))
        //filter(result => result <= 0.2)
      )
      .subscribe(value => {
        console.log(value);
        if (value <= 0.2) {
          this.el.nativeElement.classList.add("close");
        } else {
          this.el.nativeElement.classList.remove("close");
        }
      });
  }
}
