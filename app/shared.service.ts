import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { BehaviorSubject } from "rxjs";
import { IData } from "./data.interface";
import { take } from "rxjs/operators";

@Injectable()
export class SharedService {
  constructor(public http: Http) {}

  private data = new BehaviorSubject<string>("");
  private user = new BehaviorSubject<string>("Select User");

  castData = this.data.asObservable();
  passSelectedCast = this.user.asObservable();

  changeState(passsearchkey) {
    this.data.next(passsearchkey);
  }

  passtoSearch(passsearchkey) {
    this.user.next(passsearchkey);
  }

  getAllData() {
    return this.http
      .get("https://jsonplaceholder.typicode.com/users")
      // .map(data => <IData[]>data.json())
      // .pipe(take(1))
      // .do(data => console.log(data));
  }
}
