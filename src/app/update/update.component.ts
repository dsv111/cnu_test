import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
export interface formEdit {
  fullname: string;
  email: string;
  phone: string,
  dob: string,
  selectedImage: string,
  username: string
  password1: string
  question1: string
  answer1: string
  question2: string
  answer2: string
  customQuestion: string
  customAnswer: string
  
}
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent {
  userDetails: any; // Declare the userDetails variable
  editForm!: FormGroup;
  disabled = false;
  currentSection = 1;

  questionList = [
    {
      value: '1',
      viewValue:
        'What is the name of a college you applied to but didn’t attend?',
    },
    {
      value: '2',
      viewValue:
        'What was the name of the first school you remember attending?',
    },
    {
      value: '3',
      viewValue:
        'Where was the destination of your most memorable school field trip?',
    },
    {
      value: '4',
      viewValue:
        "What was your math’s teacher's surname in your 8th year of school?",
    },
    { value: '5', viewValue: 'What was the name of your first stuffed toy?' },
    { value: '6', viewValue: "What was your driving instructor's first name?" },
    // { value: '7', viewValue: "Others" }
  ];

  images = [
    { id: 1, url: 'assets/tree3.jpg' },
    { id: 2, url: 'assets/tree2.jpg' },
    { id: 3, url: 'assets/tree3.jpg' },
    { id: 4, url: 'assets/trafic1.jpg' },
    { id: 5, url: 'assets/trafic2.png' },
    { id: 6, url: 'assets/trafic3.jpg' },
    { id: 7, url: 'assets/car1.jpg' },
    { id: 8, url: 'assets/car2.jpg' },
    { id: 9, url: 'assets/car3.jpg' },
  ];

  constructor(private fb: FormBuilder, private router:Router) { 
    
  }

  ngOnInit(): void {
    this.userDetails = JSON.parse(localStorage.getItem('user-details') || ''); // Retrieve the user details from localStorage
    console.log(this.userDetails);
    const form:formEdit = this.userDetails;
    // Create the edit form
    this.editForm = this.fb.group({
      fullname: [{value:this.userDetails.fullname, disabled: true},[[Validators.required]]],
      email: [{value:this.userDetails.email, disabled: true}, [Validators.required, Validators.email]],
      phone: [{value:this.userDetails.phone, disabled: true}, Validators.required],
      dob: [{value:this.userDetails.dob, disabled: true}, Validators.required],
      username: [{value:this.userDetails.username, disabled:true}, Validators.required],
      selectedImage: [this.userDetails.selectedImage, Validators.required],
      // password1: [this.userDetails.password1, Validators.required],
      password1:new FormControl(this.userDetails.password1,[
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$'
        ),
      ]),

      question1: [this.userDetails.question1, Validators.required],
      answer1: [this.userDetails.answer1, Validators.required],
      question2: [this.userDetails.question2, Validators.required],
      answer2: [this.userDetails.answer2, Validators.required],
      customQuestion: [this.userDetails.customQuestion, Validators.required],
      customAnswer: [this.userDetails.customAnswer, Validators.required]
    });
    
    // this.userDetails.get('fullname').disable();
    // this.userDetails.get('email').disable();
    // this.userDetails.get('phone').disable();
    // this.userDetails.get('dob').disable();
  }

  onSubmit() {
   // Enable disabled form controls
  for (const controlName in this.editForm.controls) {
    const control = this.editForm.get(controlName);
    if (control?.disabled) {
      control.enable();
    }
  }

  // Submit form data
  localStorage.setItem('user-details', JSON.stringify(this.editForm.value));

  // Disable form controls again
  for (const controlName in this.editForm.controls) {
    const control = this.editForm.get(controlName);
    if (control?.disabled) {
      control.disable();
    }
  }
  this.router.navigateByUrl('/login');
  }
  updateDetails(){

  }
  nextSection() {
    this.currentSection++;
  }

  previousSection() {
    this.currentSection--;
  }

  onClear() {
    this.editForm.reset();
    this.currentSection = 1;
  }
}
