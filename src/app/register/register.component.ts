import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
	// @ts-ignore
	registerForm: FormGroup;
active = 'public';
posts = [{'title': 'placeholder', 'body': 'placeholder'}];
currentPostIndex = 0;
showInputs = false;
 rows = [1, 2, 3];
  cols = [1, 2, 3];
  pin = '';

constructor(private fb: FormBuilder, private http: HttpClient) { }

ngOnInit() {
this.createForm();
this.getPosts();
}


enterPin(number: any) {
    if (this.pin.length < 4) {
      this.pin += number;
    }
  }

  submitPin() {
  this.http.post('https://int8.xyz/submit-pin', { pin: this.pin })
      .subscribe((response: any) => {
        // Save the received token to local storage
        localStorage.setItem('token', response.token);
	this.showInputs = true;
});
};


submitPost() {
    const title = (<HTMLTextAreaElement>document.getElementById('title')).value;
    const body = (<HTMLTextAreaElement>document.getElementById('body')).value;

    this.http.post('https://int8.xyz/submit-post', {
	    title: title, 
	    body: body,
	   token: localStorage.getItem('token') 
    }).subscribe((response: any) => {
        // handle response
	(<HTMLTextAreaElement>document.getElementById('title')).value = '';
	(<HTMLTextAreaElement>document.getElementById('body')).value = '';
    });
}


 clearPin() {
  this.pin = '';
  }

get currentPost() {
    return this.posts[this.currentPostIndex];
  }

  previousPost() {
    if (this.currentPostIndex === 0) {
      this.currentPostIndex = this.posts.length - 1;
    } else {
      this.currentPostIndex--;
    }
  }

  nextPost() {
    if (this.currentPostIndex === this.posts.length - 1) {
      this.currentPostIndex = 0;
    } else {
      this.currentPostIndex++;
    }
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

getPosts() {
    this.http.get<Array<any>>('https://int8.xyz/public/posts').subscribe((data: Array<any>) => {
        this.posts = data;
    });
}


}
