import { Component } from "@angular/core";
import { SharedService } from "./shared.service";

@Component({
  selector: "app-sibling1",
  template: `
    <p>
      Child-1:
      <input
        placeholder="Search text .."
        (input)="passData($event.target.value)"
      />
      <br />
      <br />
      Selected Data: {{ selectedUser | async }}
    </p>
  `
})
export class SearchInputComponent {
  // Declarations
  selectedUser: Object;

  constructor(private shared: SharedService) {
    this.selectedUser = this.shared.passSelectedCast;
  }

  passData(data) {
    this.shared.changeState(data);
  }
}
