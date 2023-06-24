import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';
import { parseAccountError } from '../parse-error';

@Component({
  selector: 'snt-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  @Input() error: string | null | undefined;
  @Output() submitEM = new EventEmitter();

  form: FormGroup = new FormGroup({
    email: new FormControl('ezzo.sameer@gmail.com', [Validators.required, Validators.email]),
    password: new FormControl('12312313', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]),
  });

  constructor(
    private router: Router,
    public route: ActivatedRoute,
    private auth: AuthService) { }

  async submit() {
    if (!this.form.valid) return

    try {
      const token = await this.auth.signup(this.form.value)
      await this.auth.refresh(token)
      const redirect = this.route.snapshot.queryParams['redirect']
      if (redirect) this.router.navigateByUrl(redirect)

    } catch (err) {
      this.error = parseAccountError(err)
    }

  }


  
}

