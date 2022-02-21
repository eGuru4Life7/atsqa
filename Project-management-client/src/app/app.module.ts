import { CanDeactivateLoginComponentService } from './guards/auth/can-deactivate-login-component.service';
import { CanActivateLoginComponentService } from './guards/auth/can-activate-login-component.service';
import { UtilitiesService } from './utils/utilities.service';
import { RequesthandlerService } from './utils/requesthandler.service';
import { LocalStorageService } from './utils/localstorage.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { AppComponent } from './app.component';
import { HeaderComponent } from './includes/header/header.component';
import { FooterComponent } from './includes/footer/footer.component';
import { SidebarComponent } from './includes/sidebar/sidebar.component';
import { HeadComponent } from './includes/head/head.component';
import { AuthComponent } from './layouts/auth/auth.component';
import { HomeComponent } from './layouts/home/home.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { AddUserComponent } from './pages/user/add-user/add-user.component';
import { AddProjectComponent } from './pages/project/add-project/add-project.component';
import { ViewUsersComponent } from './pages/user/view-users/view-users.component';
import { ViewProjectsComponent } from './pages/project/view-projects/view-projects.component';
import { AddDeveloperComponent } from './pages/developers/add-developer/add-developer.component';
import { ViewDeveloperComponent } from './pages/developers/view-developer/view-developer.component';
import { CreateModuleComponent } from './pages/phases/requirements/module/create-module/create-module.component';
import { ViewModulesComponent } from './pages/phases/requirements/module/view-modules/view-modules.component';
import { AddRequirementComponent } from './pages/phases/requirements/module/add-requirement/add-requirement.component';
import { ViewRequirementComponent } from './pages/phases/requirements/module/view-requirement/view-requirement.component';
import { ProjectDetailsComponent } from './pages/project/project-details/project-details.component';
import { AddBuildComponent } from './pages/testplan/build/add-build/add-build.component';
import { ViewBuildComponent } from './pages/testplan/build/view-build/view-build.component';
import { AddReleaseComponent } from './pages/testplan/release/add-release/add-release.component';
import { ViewReleaseComponent } from './pages/testplan/release/view-release/view-release.component';
import { InviteDeveloperComponent } from './pages/developers/invite-developer/invite-developer.component';
import { DatepickerModule } from 'angular2-material-datepicker';
import { UserprofileComponent } from './pages/userprofile/userprofile.component';
import { ForgotpasswordComponent } from './pages/forgotpassword/forgotpassword.component';
const appRoutes: Routes = [
  { path: '', component: LoginComponent, canActivate: [ CanActivateLoginComponentService ] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [ CanDeactivateLoginComponentService ] },
  { path: 'login', component: LoginComponent, canActivate: [ CanActivateLoginComponentService ]  },
  { path: 'register', component: RegisterComponent, canActivate: [ CanActivateLoginComponentService ] },
  { path: 'add/project', component: AddProjectComponent, canActivate: [ CanDeactivateLoginComponentService ] },
  { path: 'view/projects', component: ViewProjectsComponent, canActivate: [ CanDeactivateLoginComponentService ] },
  { path: 'add/user', component: AddUserComponent, canActivate: [ CanDeactivateLoginComponentService ] },
  { path: 'view/users', component: ViewUsersComponent, canActivate: [ CanDeactivateLoginComponentService ] },
  { path: 'add/developer', component: AddDeveloperComponent, canActivate: [ CanDeactivateLoginComponentService ]  },
  { path: 'view/developers', component: ViewDeveloperComponent, canActivate: [ CanDeactivateLoginComponentService ]  },
  { path: 'phases/requirements/modules/add', component: CreateModuleComponent, canActivate: [ CanDeactivateLoginComponentService ]  },
  { path: 'phases/requirements/modules', component: ViewModulesComponent, canActivate: [ CanDeactivateLoginComponentService ]  },
  { path: 'phases/requirements/add', component: AddRequirementComponent, canActivate: [ CanDeactivateLoginComponentService ]  },
  { path: 'phases/requirements', component: ViewRequirementComponent, canActivate: [ CanDeactivateLoginComponentService ]  },
   { path: 'project/details/:id', component: ProjectDetailsComponent, canActivate: [ CanDeactivateLoginComponentService ]  },
  { path: 'testplan/build/add', component: AddBuildComponent, canActivate: [ CanDeactivateLoginComponentService ]  },
  { path: 'testplan/build/view', component: ViewBuildComponent, canActivate: [ CanDeactivateLoginComponentService ]  },
  { path: 'testplan/release/add', component: AddReleaseComponent, canActivate: [ CanDeactivateLoginComponentService ]  },
  { path: 'testplan/release/view', component: ViewReleaseComponent, canActivate: [ CanDeactivateLoginComponentService ]  },
  { path: 'invite/developer', component: InviteDeveloperComponent, canActivate: [ CanDeactivateLoginComponentService ]  },
  { path: 'userprofile', component: UserprofileComponent, canActivate: [ CanDeactivateLoginComponentService ]  },
  { path: 'forgotpassword', component: ForgotpasswordComponent, canActivate: [ CanActivateLoginComponentService ]  }
  
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    HeadComponent,
    AuthComponent,
    HomeComponent,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    AddUserComponent,
    AddProjectComponent,
    ViewUsersComponent,
    ViewProjectsComponent,
    AddDeveloperComponent,
    ViewDeveloperComponent,
    CreateModuleComponent,
    ViewModulesComponent,
    AddRequirementComponent,
    ViewRequirementComponent,
    ProjectDetailsComponent,
    AddBuildComponent,
    ViewBuildComponent,
    AddReleaseComponent,
    ViewReleaseComponent,
    InviteDeveloperComponent,
    UserprofileComponent,
    ForgotpasswordComponent
  ],
  imports: [
    DatepickerModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [
    CanActivateLoginComponentService,
    CanDeactivateLoginComponentService,
    LocalStorageService,
    RequesthandlerService,
    UtilitiesService,
    {provide: LocationStrategy, useClass: HashLocationStrategy}
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
