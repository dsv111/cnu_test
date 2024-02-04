import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BloodsugarService } from '../bloodsugar.service';

export interface DiabetesData {
  date: string;
  fastingBloodSugar: number;
  breakfast: string,
  lunch: string;
  dinner: string;
  postDinnerBloodSugar: number;
}
@Component({
  selector: 'app-diabetes',
  templateUrl: './diabetes.component.html',
  styleUrls: ['./diabetes.component.css']
})
export class DiabetesComponent {
  bloodSugarForm!: FormGroup;
  records: DiabetesData[] = [];

  constructor(private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.bloodSugarForm = this.fb.group({
      date: ['', Validators.required],
      fastingBloodSugar: ['', Validators.required],
      breakfast: ['', Validators.required],
      lunch: ['', Validators.required],
      dinner: ['', Validators.required],
      postDinnerBloodSugar: ['', Validators.required],
      time1:['',Validators.required],
      time2:['',Validators.required],
      time3:['',Validators.required],
      time4:['',Validators.required],
      time5:['',Validators.required]
    });

    const storedData = localStorage.getItem('sugar-report');
    if (storedData) {
      this.records = JSON.parse(storedData);
    }
  }

  submitForm(data: DiabetesData) {
    if(this.bloodSugarForm.valid){
      this.records.push(data);
      localStorage.setItem('sugar-report', JSON.stringify(this.records));
      console.log('this.records',this.records);
      console.log('dataaaaa:',data);
      // You can perform further operations with the form data here
      this.router.navigateByUrl('/dashboard');
    }else {
      alert('Invalid data,please fill the data')
    }
    
  }
  clearForm() {
    this.bloodSugarForm.reset();
  }
}
