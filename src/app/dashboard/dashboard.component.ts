import { Component } from '@angular/core';
import { BloodsugarService } from '../bloodsugar.service';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { RxjsService } from '../rxjs-learning/rxjs.service';
export interface DiabetesData {
  date: string;
  fastingBloodSugar: number;
  breakfast: string;
  lunch: string;
  dinner: string;
  postDinnerBloodSugar: number;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  searchItem: string = '';
  filterData: any[] = [];
  newMessage = '';


  access: any = [];
  bloodSugarData: any = [];
  getRecordDetails:any='';
  dropdownOpen = false;
  showbooks: any;

  testResult: any = [{ user: 'Srinivas', address: 'Gondi', count: 10 },
  { user: 'Phani', address: 'Antervedi', count: 20 },
  { user: 'Satish', address: 'Lakkavaram', count: 30 },
  { user: 'Raju', address: 'Hyderabad', count: 40 }];

  mTypes = [{ label: 'Gap', checked: false }, { label: 'Levelness', checked: false }];
  constructor(
    private bloodSugarService: BloodsugarService,
    private router: Router,
    private booksServ: RxjsService
  ) {
    console.log('table-data', this.bloodSugarData);

    // Initialize the bloodSugarData
    this.access = localStorage.getItem('sugar-report');
    this.bloodSugarData = this.access != null ? JSON.parse(this.access) : '';
    this.filterData = this.bloodSugarData;

  }

  ngOninit(): void {
    // this.bloodSugarService.msg$.subscribe(msg=>{
    //   console.log('${msg}')
    // })
    this.booksServ.message$.subscribe(message => {
      console.log(`Received Message: ${message}`);
    });
    this.showBooks();

  }
  sendMessage(): void {
    this.booksServ.sendMessage(this.newMessage);
    // this.newMessage = '';
  }
  sendMsg() {
    this.bloodSugarService.sendMessage(this.newMessage);
    this.newMessage = '';
    console.log(this.newMessage)
  }

  //  filterData():void{
  //   this.filterData = this.bloodSugarData.filter(item =>)

  //  }
  filterdData(): void {
    this.filterData = this.bloodSugarData.filter((item: any) =>
      Object.values(item).some((value: any) =>
        value.toString().toLowerCase().includes(this.searchItem.toLowerCase())
      ));
    console.log(this.filterData);
  }

  print() {
    window.print();
  }
  add() {
    this.router.navigateByUrl('/entry-form');
  }

  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    let formattedHours = parseInt(hours);
    const ampm = formattedHours >= 12 ? 'PM' : 'AM';
    formattedHours %= 12;
    formattedHours = formattedHours || 12;
    return `${formattedHours}:${minutes} ${ampm}`;
  }

  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }

  onOptionChange() {
    // Perform any logic here when a checkbox is checked or unchecked
    // For example, you can loop through the options array to see which options are checked
    for (const option of this.mTypes) {
      if (option.checked) {
        console.log(option.label + ' is checked');
      }
    }
  }

  showBooks() {
    this.bloodSugarService.getBooks().subscribe(data => {
      this.showbooks = data;
      console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa", this.showBooks)
    });
  }

  searchCount(obj: any, usr: any) {
    const givenUsrName = usr.toLocaleLowerCase();
    const filterItems = this.testResult.filter((item: any) => item.user.toLocaleLowerCase() === givenUsrName);
    if (!filterItems) {
      return ' No Count found';
    } else {
      return filterItems[0].count;
    }
  }

  getRecord(record:any){
    console.log(record);
    this.getRecordDetails = record;
  }

  deleteItem(item: any) {
    const index = this.bloodSugarData.indexOf(item);

    console.log(item);
    console.log(index);

    if (index !== -1) {
      this.bloodSugarData.splice(index, 1);
    }

  }
}
