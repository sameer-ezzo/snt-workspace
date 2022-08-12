import { Input, Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, RequiredValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'snt-workspace-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  @Input() error: string | null | undefined;
  @Output() submitEM = new EventEmitter();

  form: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(32)]),
  });

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService) { }

  async submit() {
    if (!this.form.valid) return

    try {
      await this.auth.login(this.form.value.email, this.form.value.password)
      const redirect = this.route.snapshot.queryParams['redirect']
      if (redirect) this.router.navigateByUrl(redirect)

    } catch (err) {
      this._parseError(err)
    }

  }
  private _parseError(err: unknown) {
    this.error = err instanceof Error ? err.message : err as string
  }

}





