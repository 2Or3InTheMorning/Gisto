import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { HttpModule } from '@angular/http';
import { MobxAngularModule } from 'mobx-angular';
import { GistSearchPipe } from './pipes/search.pipe';
import { CovalentCodeEditorModule } from '@covalent/code-editor';

import { AppComponent } from './app.component';
import { GistoComponent } from './gisto/gisto.component';
import { HeaderComponent } from './gisto/header/header.component';
import { SubHeaderComponent } from './gisto/sub-header/sub-header.component';
import { MainComponent } from './gisto/main/main.component';
import { SidebarComponent } from './gisto/main/sidebar/sidebar.component';
import { ContentComponent } from './gisto/main/content/content.component';
import { UserComponent } from './gisto/header/user/user.component';
import { AppSettingsComponent } from './gisto/header/app-settings/app-settings.component';
import { SettingsComponent } from './gisto/main/settings/settings.component';
import { LoginComponent } from './login/login.component';
import { GithubAuthorizationService } from "./github-authorization.service";
import { SettingsStore } from "./store/settings";
import { AuthGuard } from "./auth-guard.guard";

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    {
      path: 'main',
      component: GistoComponent,
      data: { requiresLogin: true },
      canActivate: [AuthGuard]
    },
    {
      path: 'gist/:id',
      component: GistoComponent,
      data: { requiresLogin: true },
      canActivate: [AuthGuard]
    },
    {
      path: 'settings',
      component: SettingsComponent,
      data: { requiresLogin: true },
      canActivate: [AuthGuard]
    },
    { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  declarations: [
    AppComponent,
    GistoComponent,
    HeaderComponent,
    SubHeaderComponent,
    MainComponent,
    SidebarComponent,
    ContentComponent,
    UserComponent,
    AppSettingsComponent,
    SettingsComponent,

    GistSearchPipe,
    LoginComponent,
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
        { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpModule,
    MobxAngularModule,
    CovalentCodeEditorModule
  ],
  providers: [GithubAuthorizationService, SettingsStore, AuthGuard],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
