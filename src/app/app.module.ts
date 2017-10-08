import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HomeLayoutComponent} from './layout/home-layout.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {DefaultLayoutComponent} from './layout/default-layout.component';
import {SurveyService} from './services/survey-service.service';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {WxService} from './services/wx-service.service';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HeaderInterceptor} from './interceptor/HeaderInterceptor';

@NgModule({
    declarations: [
        AppComponent,
        HomeLayoutComponent,
        DefaultLayoutComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        HttpClientModule
    ],
    providers: [
        {
            provide: LocationStrategy,
            useClass: HashLocationStrategy
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: HeaderInterceptor,
            multi: true,
        },
        SurveyService,
        WxService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
