import { BrowserModule } from '@angular/platform-browser';
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MobxAngularModule } from 'mobx-angular';
import { MarkdownModule } from 'angular2-markdown';
// import { CovalentCodeEditorModule } from '@covalent/code-editor';
import { AceEditorModule } from 'ng2-ace-editor';
import { HotkeyModule } from 'angular2-hotkeys';


import { CleanTagsPipe } from './pipes/cleanTags.pipe';
import { SortByPipe } from './pipes/sortBy.pipe';

import { CopyToClipBoardDirective } from './directives/copy-to-clip-board.directive';
import { AnchorDirective } from './directives/anchor.directive';

import { AppComponent } from './app.component';
import { GistoComponent } from './gisto/gisto.component';
import { HeaderComponent } from './gisto/header/header.component';
import { SubHeaderComponent } from './gisto/sub-header/sub-header.component';
import { MainComponent } from './gisto/main/main.component';
import { SidebarComponent } from './gisto/main/sidebar/sidebar.component';
import { GistComponent } from './gisto/main/gist/gist.component';
import { UserComponent } from './gisto/header/user/user.component';
import { AppSettingsComponent } from './gisto/header/app-settings/app-settings.component';
import { SettingsComponent } from './gisto/main/settings/settings.component';
import { LoginComponent } from './login/login.component';
import { GithubAuthorizationService } from './github-authorization.service';
import { SettingsStore } from './store/settings';
import { NotificationsStore } from './store/notifications';
import { AuthGuard } from './auth-guard.guard';
import { GistUtilsComponent } from './gisto/common/gist-utils/gist-utils.component';
import { ButtonComponent } from './gisto/common/button/button.component';
import { IconComponent } from './gisto/common/icon/icon.component';
import { LogoComponent } from './gisto/header/logo/logo.component';
import { HeaderMainComponent } from './gisto/header/header-main/header-main.component';
import { CommentsComponent } from './gisto/main/comments/comments.component';
import { DateComponent } from './gisto/common/date/date.component';
import { NotificationsComponent } from './gisto/main/notifications/notifications.component';
import { DashboardComponent } from './gisto/main/dashboard/dashboard.component';
import { NewComponent } from './gisto/main/new/new.component';
import { SuperSearchComponent } from './super-search/super-search.component';
import { NgxElectronModule } from 'ngx-electron';
import { UpdateNotifierComponent } from './update-notifier/update-notifier.component';
import { AboutComponent } from './gisto/main/about/about.component';
import { GistoCodeEditorComponent } from './gisto/common/editor/editor.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    {
      path: 'main',
      component: GistoComponent,
      data: { requiresLogin: true },
      canActivate: [AuthGuard]
    },
    {
      path: 'new',
      component: NewComponent,
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
    {
      path: 'about',
      component: AboutComponent,
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
    GistComponent,
    UserComponent,
    AppSettingsComponent,
    SettingsComponent,
    LoginComponent,
    GistUtilsComponent,
    ButtonComponent,
    IconComponent,
    LogoComponent,
    HeaderMainComponent,
    NotificationsComponent,
    DashboardComponent,
    NewComponent,

    CopyToClipBoardDirective,
    AnchorDirective,

    CleanTagsPipe,
    SortByPipe,

    CommentsComponent,
    DateComponent,
    SuperSearchComponent,
    UpdateNotifierComponent,
    AboutComponent,
    GistoCodeEditorComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
        { enableTracing: false } // <-- debugging purposes only
    ),
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,

    MobxAngularModule,
    // CovalentCodeEditorModule,
    AceEditorModule,
    MarkdownModule.forRoot(),
    HotkeyModule.forRoot(),
    NgxElectronModule
  ],
  providers: [
    SettingsStore,
    NotificationsStore,
    GithubAuthorizationService,
    AuthGuard
  ],
  bootstrap: [AppComponent],
  schemas: [ NO_ERRORS_SCHEMA ]
})
export class AppModule { }
