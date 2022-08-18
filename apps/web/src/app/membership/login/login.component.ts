import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { parseAccountError } from '../parse-error';

@Component({
  selector: 'snt-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

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
     const token =  await this.auth.login(this.form.value.email, this.form.value.password)
     this.auth.refresh(token)
      const redirect = this.route.snapshot.queryParams['redirect'] ?? '/'
      if (redirect) this.router.navigateByUrl(redirect)

    } catch (err) {
      this.error = parseAccountError(err)
    }

  }


}





