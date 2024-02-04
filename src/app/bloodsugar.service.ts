import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BloodsugarService {
  bloodSugarRecords: any[] = []
  public headerValues: any;
  username:any;
  userAccess:any;
  private recordsSubject = new BehaviorSubject<any[]>([]);

  private userSubject: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private messageSubject = new Subject<string>();
  msg$ = this.messageSubject.asObservable();

  sendMessage(msg:string):void {
    this.messageSubject.next(msg);
  }

  constructor(private http:HttpClient) {
    const access = localStorage.getItem('user-details');
    this.userAccess = access != null ? JSON.parse(access) : '';
    // this.questionList = access.
    this.username = this.userAccess.username;
    console.log(this.username);
   }

  getRecords() {
    return JSON.parse(localStorage.getItem('sugar-report') || '[]');
  }

  getBooks():Observable<any>{
    const url = "https://www.abibliadigital.com.br/api/verses/nvi/sl/23";
    return this.http.get(url);
  }


  setUser(): void {
    const access = localStorage.getItem('user-details');
    this.userAccess = access != null ? JSON.parse(access) : '';
    // this.questionList = access.
    this.username = this.userAccess.username;
    console.log(this.username);
    this.userSubject.next(this.userAccess.username);
    console.log(this.username);
    
  }

  getUser(): Observable<string> {
    return this.userSubject.asObservable();
  }
}