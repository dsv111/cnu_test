import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RxjsService {
  private messageSubject = new Subject<string>();
  message$ = this.messageSubject.asObservable();

  sendMessage(message: string): void {
    this.messageSubject.next(message);
  }
  
  constructor(private http:HttpClient) { }

  getBooks():Observable<any>{
    const url = "https://www.abibliadigital.com.br/api/verses/nvi/sl/23";
    return this.http.get(url);
  }
}
