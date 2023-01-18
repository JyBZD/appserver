import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';



@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	// @ts-ignore
	registerForm: FormGroup;
active = 'top';
constructor(private fb: FormBuilder) { }

ngOnInit() {
this.createForm();
}


createForm() {
this.registerForm = this.fb.group({
email: ['', [Validators.required, Validators.email]],
password: ['', [Validators.required, Validators.minLength(6)]]
});
}

onSubmit(form: FormGroup) {
if (form.valid) {
// Collect form data and send it to server
console.log(form.value);
}
}
}
