import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  genders = ['male', 'female'];
  signupForm: FormGroup;
  forbiddenUsernames = ['Chris', 'Anna'];

  ngOnInit() {
    this.signupForm = new FormGroup({
      'userData' : new FormGroup({
        'username' : new FormControl(null, [Validators.required, this.forbiddenNames.bind(this)]),
        'email': new FormControl(null, [Validators.required, Validators.email], this.forbiddenEmails)
      }),
      'gender': new FormControl('male'),
      'hobbies': new FormArray([])
    });
    // this.signupForm.valueChanges.subscribe(
    //   (value) => console.log(value)
    // );

    this.signupForm.statusChanges.subscribe(
      (value) => console.log(value) 
    );

    this.signupForm.setValue(
      {
        'userData' : {
          'username' : 'Max',
          'email': 'max@test.com'
        },
        'gender': 'male',
        'hobbies': []
      }
    );

    this.signupForm.patchValue(
      {
        'userData' : {
          'username' : 'Freddie Mar'
        }
      }
    );

  }

  onSubmit(){
    console.log(this.signupForm);
    this.signupForm.reset();
  }

  onAddHobby(){
    const control = new FormControl(null, Validators.required);
    (<FormArray>this.signupForm.get('hobbies')).push(control);
  }

  getControls() {
    return (this.signupForm.get('hobbies') as FormArray).controls;
  }

  forbiddenNames(control: FormControl) : { [s: string] : boolean}{ // Custom Validators
    if (this.forbiddenUsernames.indexOf(control.value) != -1) {
      return {'nameIsForbidden': true};
    return {'nameIsForbidden': false};
    }
  }

  forbiddenEmails(control: FormControl): Promise<any> | Observable<any> { //Asyn Validators use this to test if the email is already on the database.
    const promise = new Promise<any>((resolve, reject) => {
      setTimeout(() => {
        if(control.value == 'test@test.com') {
          resolve({'emailIsForbidden': true});
        } else {
          resolve(null);
        }
      },1500);
    });
    return promise;
  }
}
