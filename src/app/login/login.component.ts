import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SettingsStore } from '../store/settings';
import { GithubAuthorizationService } from '../github-authorization.service';
import { GithubApiService } from '../github-api.service';
import { version } from '../helpers/version';

@Component({
  selector: 'login',
  template: `
    <div>
      <logo></logo>
      <small>v.{{ version }}</small>
      <button invert (click)="login()">Log-in with Github account</button>
    </div>

  `,
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  version: string = version;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private authorization: GithubAuthorizationService,
              private githubApiService: GithubApiService,
              private settingsStore: SettingsStore) {
  }

  ngOnInit() {
    this.route
      .queryParams
      .subscribe((params: Params) => {
        const code = params['code'];

        if (code) {
          this.authorization.fetchAuthToken(code)
            .then(() => this.navigateToMainScreen());
        }
      });

    if (this.settingsStore.isLoggedIn) {
      this.navigateToMainScreen();
    }
  }

  navigateToMainScreen() {
    this.githubApiService.getUser();
    this.githubApiService.getGists();
    this.githubApiService.getStaredGists();
    this.router.navigate(['/main']);
  }

  login() {
    this.authorization.login();
  }
}
