import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent {
  currentSection = 1;
  isModalOpen = false;
  registerForm!: FormGroup;
  selectedPicture: any = [];
  showCustomQuestion = false;
  password1: string = '';
  customQuestionIndex = 0;

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

  constructor(private fb: FormBuilder, private router: Router) {
    this.registerForm = this.fb.group({
      fullname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      dob: ['', Validators.required],
      username: ['', Validators.required],
      password1:new FormControl("",[
        Validators.required,
        Validators.minLength(8),
        Validators.pattern(
          '^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]+$'
        ),
      ]),
      question1: ['', Validators.required],
      answer1: ['', Validators.required],
      question2: ['', Validators.required],
      answer2: ['', Validators.required],
      customQuestion: ['', Validators.required],
      customAnswer: ['', Validators.required],
      selectedImage: ['', Validators.required],
    });
  }

  ngOnInit() {
    // this.registerForm = this.fb.group({
    //   questions: this.fb.array([
    //     this.createQuestion()
    //   ])
    // });
  }

  createQuestion(): FormGroup {
    return this.fb.group({
      question: ['', Validators.required],
      answer: ['', Validators.required],
    });
  }

  updateDetails() {
    const password1 = this.registerForm.get('password1')?.value;
    const answer1 = this.registerForm.get('answer1')?.value;
    const answer2 = this.registerForm.get('answer2')?.value;
    const selectedImage = this.registerForm.get('selectedImage')?.value;

    console.log('password1:', password1);
    console.log('answer1:', answer1);
    console.log('answer2:', answer2);
    console.log('selectedImage:', selectedImage);

    // code to update all three passwords with the values above
  }

  onQuestionChange(event: any, index: number) {
    const selectedValue = event.target.value;
    if (selectedValue === 'Others') {
      this.showCustomQuestion = true;
      this.customQuestionIndex = index;
    } else if (this.customQuestionIndex === index) {
      this.showCustomQuestion = false;
    }
  }

  addQuestion(): void {
    const questions = this.registerForm.get('questions') as any;
    questions.push(this.createQuestion());
  }

  removeQuestion(index: number): void {
    const questions = this.registerForm.get('questions') as any;
    questions.removeAt(index);
  }

  selectPicture(picture: any) {
    this.selectedPicture = picture;
  }
  onSignup(passwordForm: NgForm) {
    console.log(this.registerForm.value);
    localStorage.setItem(
      'user-details',
      JSON.stringify(this.registerForm.value)
    );
    alert('You are successfully registered')
    this.router.navigateByUrl('/login');
  }

  selectOtherQ() {
    if (this.registerForm.value.question1 === 'Others') {
      console.log('this is otherssssssssssssss');
      this.isModalOpen = true;
    } else {
      console.log('errrrrooorrrr');
      this.isModalOpen = false;
    }
  }
  nextSection() {
    this.currentSection++;
  }

  previousSection() {
    this.currentSection--;
  }

  onClear() {
    this.registerForm.reset();
    this.currentSection = 1;
  }
}
