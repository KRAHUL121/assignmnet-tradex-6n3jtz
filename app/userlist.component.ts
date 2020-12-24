import { Component, OnInit, OnDestroy } from "@angular/core";
import { SharedService } from "./shared.service";
import { IData } from "./data.interface";
import { Observable } from "rxjs";
@Component({
  selector: "app-sibling2",
  template: `
    <div style="border-left :1px solid grey;padding-left:20px;">
      <h4>
        <b>Input Text: {{ searchtext }}</b>
      </h4>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#Id</th>
            <th scope="col">Name</th>
            <th scope="col">User Name</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let row of userTable; trackBy: trackIndex">
            <th scope="row">{{ row.id }}</th>
            <td (click)="sendData(row.name)">{{ row.name }}</td>
            <td>{{ row.username }}</td>
            <td>{{ row.email }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `
})
export class UserListComponent implements OnInit, OnDestroy {
  // Declaration,
  userTable: IData[] = [];
  actualData: IData[] = [];
  searchtext: string = "";

  constructor(private shared: SharedService) {}

  ngOnInit(): void {
    this.shared
      .getAllData()
      .subscribe(data => {
        console.log(data);
        this.userTable = data;
      })
      .unsubscribe();
    this.actualData = this.userTable;
    this.shared.castData
      .subscribe(res => {
        this.searchtext = res;
        this.searchProps();
      })
      .unsubscribe();
  }

  searchProps() {
    console.log(this.actualData);
    this.userTable = this.actualData.filter(ele =>
      ["name", "username", "email"].map(
        subele =>
          subele.toLowerCase().indexOf(this.searchtext.toLowerCase()) != -1
      )
    );
  }

  // On Click Send Data
  sendData(data) {
    this.shared.passtoSearch(data);
  }

  // Specific row Rendendered
  trackIndex(row) {
    return row ? row.id : undefined;
  }

  ngOnDestroy() {}
}
