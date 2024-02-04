import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Observable, from, fromEvent } from 'rxjs';
import { RxjsService } from './rxjs.service';
import { HttpClient } from '@angular/common/http';
import { BloodsugarService } from '../bloodsugar.service';

@Component({
  selector: 'app-rxjs-learning',
  templateUrl: './rxjs-learning.component.html',
  styleUrls: ['./rxjs-learning.component.css']
})
export class RxjsLearningComponent implements OnInit {
  result: string = 'Waiting for click...';
  productsList: string = '';
  testResult: any = [{ user: 'Srinivas', address: 'Gondi', count: 10 },
  { user: 'Phani', address: 'Antervedi', count: 20 },
  { user: 'Satish', address: 'Lakkavaram', count: 30 },
  { user: 'Raju', address: 'Hyderabad', count: 40 }]
  @ViewChild('validate')
  validate!: ElementRef;
  agents!: Observable<string>;
  employees$: Observable<any> = from(['abc', 'def', 'ghi'])
  resData!: string;
  showbooks: any;
  receivedMsg: any;
  receivedMessage = '';
  searchUserName: string = '';
  constructor(private http: HttpClient, private serv: RxjsService,private msgServ:BloodsugarService) {

  }

  ngOnInit(): void {
    this.serv.message$.subscribe(message => {
      this.receivedMessage = `Received Message: ${message}`;
    });
    this.showProducts();
    setTimeout(() => {
      this.result = 'Timeout occurred after 3 seconds!';
    }, 3000)
    this.showBooks();
    let p = new Promise(
      function () {

      });
    console.log("promiseeeeeeeeeeeeeeee", p);
    this.employees$.subscribe(data => {
      setTimeout(() => {
        this.resData = data
      }, 7000);
    }
    )
    this.employees$.subscribe(data => {
      setInterval(() => {
        this.resData = data;

      }, 1000);
    });
  }

  // filteredData(usrname: string): number {
  //   const lowerCaseUserName = usrname.toUpperCase();
  //   const getdata = this.testResult.find((item: any) => item.user.toUpperCase() === lowerCaseUserName);
  //   return getdata ? getdata.count : 'notfound';
  // }

  getCount(usr:string){
    const getRes = this.testResult.find((item:any)=>item.user === usr);
    return getRes ? getRes.count:0;
  }

  showProducts() {
    this.http.get<any>("https://dummyjson.com/products/1").subscribe((data: any) => {
      this.productsList = data.images;
      console.log(this.productsList);
    })
  }
  showBooks() {
    this.serv.getBooks().subscribe(data => {
      this.showbooks = data;

      // for(this.showbooks){

      // }
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", this.showbooks.book)
    });
  }
  onSubmit() {
    this.http.get<any>('https://jsonplaceholder.typicode.com/posts/1')
      .subscribe((data: any) => {
        this.result = data.title
      },
        error => {
          this.result = 'Error fetching data'
        });

    // const resObs$ =  fromEvent(this.validate?.nativeElement, 'click');
    // resObs$.subscribe(data=>{
    //   console.log(data);
    // })
  }
}