import { UserhandlerComponent } from './components/userhandler/userhandler.component';
import { PwdresetComponent } from './components/pwdreset/pwdreset.component';
import { InteractionComponent } from './components/interaction/interaction.component';
import { VcoachComponent } from './components/vcoach/vcoach.component';
import { ModComponent } from './components/mod/mod.component';
import { StudentprofileComponent } from './components/studentprofile/studentprofile.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { MenuComponent } from './components/menu/menu.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { ProfesionComponent } from './components/profesion/profesion.component';
import { VocationComponent } from './components/vocation/vocation.component';
import { OrientationComponent } from './components/orientation/orientation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './services/auth/auth-guard.service';
import { ErrorComponent } from './components/error/error.component';
import { ProgressComponent } from './components/progress/progress.component';

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "platform", component: UserhandlerComponent,  canActivate: [AuthGuardService], children: [
    //Alumnos
    { path: "home", component: MenuComponent, canActivate: [AuthGuardService],  children: [
      { path: "", component: HomeComponent, canActivate: [AuthGuardService]  },
      { path: "profile", component: ProfileComponent, canActivate: [AuthGuardService]  },
      { path: "progress", component: ProgressComponent, canActivate: [AuthGuardService]  },
      {
        path: "orientation", component: OrientationComponent, canActivate: [AuthGuardService], children: [
          { path: "vocation", component: VocationComponent, canActivate: [AuthGuardService] },
          { path: "experience", component: ExperienceComponent, canActivate: [AuthGuardService]  },
          { path: "profesion", component: ProfesionComponent, canActivate: [AuthGuardService] }
        ]
      },
      {
        path: "orientation/vocation/:id", canActivate: [AuthGuardService], component: ModComponent,
      },

      {path: "vcoach", component: VcoachComponent, canActivate: [AuthGuardService]}
    ]
  },
  { path: "teachers", component: TeachersComponent, canActivate: [AuthGuardService],children: [
    { path: "student/:id", component: StudentprofileComponent,  canActivate: [AuthGuardService]},
  ] },
  ]},
  { path: "pwd", component: PwdresetComponent },
  { path: "interaction", component: InteractionComponent },
  { path: "**", component: ErrorComponent, },
];
//
// canActivate: [AuthGuardService]
// canActivate: [AuthGuardService]
// canActivate: [AuthGuardService]
// canActivate: [AuthGuardService]
// canActivate: [AuthGuardService]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
