import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

interface Question {
  index: any;
  key: string;
  value: any;
  ans: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  sampleForm:FormGroup;
  loginForm!: FormGroup;
  userAccess: any = [];
  questionList: any = [];
  submitDisabled = true;
  matchedQuestion: any = [];
  // tempemail: string = '';
  tempPwd: string = '';
  isTemp: boolean = false;
  randPassword!: string;
  errMsg = false;
  errMsg1 = false;
  isPassword1 = false;
  isPassword2 = false;
  isPassword3 = false;
  isPassword4 = false;
  allPasswords = false;

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
    this.loginForm = this.fb.group({
      username: [''],
      password: [''],
      question: [''],
      answer: [''],
      selectedImage: [''],
      tempemail: [''],
    });

    this.sampleForm = this.fb.group({
      
    })
  }

  ngOnInit() {
    const access = localStorage.getItem('user-details');
    this.userAccess = access != null ? JSON.parse(access) : '';
    console.log(this.userAccess);

    const newObj = {
      ...this.userAccess,
      questions: [
        {
          index: '1',
          key: 'question1',
          value: this.userAccess.question1,
          ans: this.userAccess.answer1,
        },
        {
          index: '2',
          key: 'question2',
          value: this.userAccess.question2,
          ans: this.userAccess.answer2,
        },
        {
          index: '3',
          key: 'customQuestion',
          value: this.userAccess.customQuestion,
          ans: this.userAccess.customAnswer,
        },
      ],
    };
    this.questionList = newObj.questions;
    console.log(this.questionList);
  }

  handleOptionChange(selectedOption: any) {
    this.router.navigateByUrl(selectedOption.target.value);
    
    // switch (selectedOption.target.value) {
    //   case 'option1':
    //     this.method1();
    //     break;
    //   case 'option2':
    //     this.method2();
    //     break;
    //   case 'option3':
    //     this.method3();
    //     break;
    //   case 'option4':
    //     this.method4();
    //     break;
    // }
  }

  method1() {
    this.isPassword1 = true;
    this.isPassword2 = false;
    this.isPassword3 = false;
  }
  method2() {
    this.isPassword1 = false;
    this.isPassword2 = true;
    this.isPassword3 = false;
  }
  method3() {
    this.isPassword1 = false;
    this.isPassword2 = false;
    this.isPassword3 = true;
  }
  method4() {
    this.isPassword1 = true;
    this.isPassword2 = true;
    this.isPassword3 = true;
  }

  loginRefresh() {
    this.router.navigateByUrl('/login');
  }

  loadQ() {
    this.matchedQuestion = this.questionList.find(
      (question: any) => this.loginForm.value.question === question.value
    );
  }

  login() {
    const logForm = this.loginForm.value;
    console.log(logForm);
    console.log('userName::', logForm.username === this.userAccess.username);
    console.log('password1::', logForm.password === '');
    console.log('password2', logForm.answer.toString() === '');
    console.log(
      'passwor3',
      logForm.selectedImage === this.userAccess.selectedImage
    );
    // console.log('tempemail',this.loginForm.value.tempemail === '');
 // all passwords access
 if (
  this.isPassword1 === true &&
  this.isPassword2 === true &&
  this.isPassword3 === true
) {
  if (
    logForm.username === this.userAccess.username &&
    logForm.password === this.userAccess.password1 &&
    logForm.selectedImage === this.userAccess.selectedImage &&
    logForm.answer.toString() === this.matchedQuestion.ans.toString() &&
    this.loginForm.value.tempemail === ''
  ) {
    alert('You are logged in successfullly.');
    this.router.navigateByUrl('/entry-form');
    console.log(this.loginForm.value);
  } else {
    this.errMsg = true;
    console.log('error login details:::', this.loginForm.value);
  }
}
    // password1 access
    if (
      this.isPassword1 === true &&
      this.isPassword2 === false &&
      this.isPassword3 === false
    ) {
      if (
        logForm.username === this.userAccess.username &&
        logForm.password === this.userAccess.password1 &&
        logForm.selectedImage === '' &&
        logForm.answer.toString() === '' &&
        this.loginForm.value.tempemail === ''
      ) {
        alert('You are logged in successfullly.');
        this.router.navigateByUrl('/entry-form');
      } else {
        // user name error msg
        if(logForm.username != this.userAccess.username){
          this.errMsg1 = true;
        } else {
          this.errMsg = true;
        }
        console.log('error login details:::', this.loginForm.value);
      }
    }
    // password2 access
    if (
      this.isPassword2 === true &&
      this.isPassword1 === false &&
      this.isPassword3 === false
    ) {
      if (
        logForm.username === this.userAccess.username &&
        logForm.password === '' &&
        logForm.selectedImage === '' &&
        logForm.answer.toString() === this.matchedQuestion.ans.toString() &&
        this.loginForm.value.tempemail === ''
      ) {
        alert('You are logged in successfullly.');
        this.router.navigateByUrl('/entry-form');
        console.log(this.loginForm.value);
      } else {
        // user name error msg
        if(logForm.username != this.userAccess.username){
          this.errMsg1 = true;
        } else {
          this.errMsg = true;
        }
        console.log('error login details:::', this.loginForm.value);
      }
    }
    // password3 access
    if (
      this.isPassword3 === true &&
      this.isPassword1 === false &&
      this.isPassword2 === false
    ) {
      if (
        logForm.username === this.userAccess.username &&
        logForm.password === '' &&
        logForm.answer.toString() === '' &&
        logForm.selectedImage === this.userAccess.selectedImage &&
        this.loginForm.value.tempemail === ''
      ) {
        alert('You are logged in successfullly.');
        this.router.navigateByUrl('/entry-form');
        console.log(this.loginForm.value);
      } else {
        // user name error msg
        // user name error msg
        if(logForm.username != this.userAccess.username){
          this.errMsg1 = true;
        } else {
          this.errMsg = true;
        }
        console.log('error login details:::', this.loginForm.value);
      }
    }

    const tempEmail = this.loginForm.value.tempemail;
    if (!tempEmail || tempEmail.trim() === '') {
      // Handle the case when tempemail value is null or empty

      return;
    }
  }
  sendEmail() {
    const emailM = this.userAccess.email;
    if (this.loginForm.value.tempemail === emailM) {
      const uppercaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
      const lowercaseLetters = 'abcdefghijklmnopqrstuvwxyz';
      const numbers = '0123456789';
      const symbols = '!@#$%&*+?';

      let password = '';
      password +=
        uppercaseLetters[Math.floor(Math.random() * uppercaseLetters.length)]; // add one uppercase letter
      password +=
        lowercaseLetters[Math.floor(Math.random() * lowercaseLetters.length)]; // add one lowercase letter
      password += symbols[Math.floor(Math.random() * symbols.length)]; // add one special character
      password += numbers[Math.floor(Math.random() * numbers.length)]; // add one number

      let allChars = uppercaseLetters + lowercaseLetters;
      let passwordLength = 8;

      for (let i = 0; i < passwordLength - 4; i++) {
        // remaining characters will be a combination of both uppercase and lowercase letters
        let randomIndex = Math.floor(Math.random() * allChars.length);
        password += allChars[randomIndex];
      }

      this.randPassword = `DT${password}`;

      let userDetails = JSON.parse(localStorage.getItem('user-details') || '');
      userDetails.password1 = this.randPassword;
      console.log(userDetails.password1);
      localStorage.setItem('user-details', JSON.stringify(userDetails));

      this.isTemp = true;
      this.loginForm.get('tempemail')?.setValue('');
    } else {
      alert('Please provide correct email');
      this.isTemp = false;
    }
  }

  tempReset() {
    this.isTemp = false;
  }
  onRadioChange() {
    this.submitDisabled = false;
  }
}
