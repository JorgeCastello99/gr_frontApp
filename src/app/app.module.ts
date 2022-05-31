import { CryptoService } from './services/crypto/crypto.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptorService } from './services/interceptors/auth-interceptor.service';
import { AppRoutingModule } from './app-routing.module';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { environment } from "../environments/environment";
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule, BUCKET } from "@angular/fire/storage";
import { AngularFireDatabaseModule } from '@angular/fire/database';
//Components
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { ProfileComponent } from './components/profile/profile.component';
import { OrientationComponent } from './components/orientation/orientation.component';
import { VocationComponent } from './components/vocation/vocation.component';
import { ProfesionComponent } from './components/profesion/profesion.component';
import { ProgressComponent } from './components/progress/progress.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { TeachersComponent } from './components/teachers/teachers.component';
import { StudentprofileComponent } from './components/studentprofile/studentprofile.component';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ModComponent } from './components/mod/mod.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { VcoachComponent } from './components/vcoach/vcoach.component';
import { ClipboardModule } from 'ngx-clipboard';
import { InteractionComponent } from './components/interaction/interaction.component';
import { PwdresetComponent } from './components/pwdreset/pwdreset.component';
import { UserhandlerComponent } from './components/userhandler/userhandler.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    MenuComponent,
    ProfileComponent,
    OrientationComponent,
    VocationComponent,
    ProfesionComponent,
    ExperienceComponent,
    ProgressComponent,
    TeachersComponent,
    StudentprofileComponent,
    ModComponent,
    VcoachComponent,
    InteractionComponent,
    PwdresetComponent,
    UserhandlerComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    NgbModule,
    NgCircleProgressModule.forRoot(),
    ClipboardModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule





  ],
  providers: [{ provide: LocationStrategy, useClass: HashLocationStrategy },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptorService,
    multi: true,
  },
  { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    CryptoService,
    JwtHelperService,
    CookieService,
  { provide: BUCKET, useValue: 'gs://growthroad-bb7ac.appspot.com/' },],
  bootstrap: [AppComponent]
})
export class AppModule { }
