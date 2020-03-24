import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { OAuthModule } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';
import { AppEffects } from './+state/app.effects';
import { metaReducers, reducers } from './+state/reducers';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './shared/loading/loading.component';
import { ErrorMessageComponent } from './shared/error-message/error-message.component';
import { AuthCodePkceFlowComponent } from './flows/auth-code-pkce-flow/auth-code-pkce-flow.component';
import { ImplicitFlowComponent } from './flows/implicit-flow/implicit-flow.component';
import { PasswordFlowComponent } from './flows/password-flow/password-flow.component';
import { FlowsListComponent } from './flows-list/flows-list.component';
import { LogoutComponent } from './logout/logout.component';
import { NavBarComponent } from './navigation/nav-bar/nav-bar.component';
import { SettingsComponent } from './navigation/settings/settings.component';
import { VisualizerComponent } from './visualizer/visualizer.component';

@NgModule({
  declarations: [
    AppComponent,
    FlowsListComponent,
    VisualizerComponent,
    NavBarComponent,
    PasswordFlowComponent,
    AuthCodePkceFlowComponent,
    ImplicitFlowComponent,
    SettingsComponent,
    LogoutComponent,
    ErrorMessageComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatDividerModule,
    MatChipsModule,
    MatListModule,
    MatIconModule,
    FlexLayoutModule,
    MatSlideToggleModule,
    MatSelectModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    ReactiveFormsModule,
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    StoreDevtoolsModule.instrument({maxAge: 25, logOnly: environment.production}),
    EffectsModule.forRoot([AppEffects]),
    MatSidenavModule,
    MatCheckboxModule,
    FormsModule,
    MatTooltipModule,
    MatProgressSpinnerModule
  ],
  providers: [MatSnackBar],
  bootstrap: [AppComponent]
})
export class AppModule { }
