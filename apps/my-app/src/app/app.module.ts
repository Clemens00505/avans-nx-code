import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { NgSelectModule } from '@ng-select/ng-select';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AboutComponent } from './components/about/about.component';
import { HeaderComponent } from './components/ui/header/header.component';
import { FooterComponent } from './components/ui/footer/footer.component';
import { FeaturesModule } from '../../../../libs/frontend/features/src';
import { AlertService } from '../../../../libs/share-a-meal/ui/src';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthInterceptor } from '../../../../libs/frontend/features/src/lib/auth/auth.interceptor';


@NgModule({
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes, {
            initialNavigation: 'enabledBlocking'
        }),
        HttpClientModule,
        FeaturesModule,
        NgSelectModule
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS, 
            useClass: AuthInterceptor, 
            multi: true
        },
        AlertService
    ],
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        DashboardComponent,
        AboutComponent,
        HeaderComponent,
        FooterComponent
    ]
})
export class AppModule {}