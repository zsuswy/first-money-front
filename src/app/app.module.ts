import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {AppRoutingModule} from './app.routing';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from './app.component';
import {HomeLayoutComponent} from './layout/home-layout.component';
import {HomePageComponent} from './pages/home/home.component';
import {SurveysByClassPageComponent} from './pages/survey-by-class/survey-by-class.component';
import {PersonalCenterPageComponent} from './pages/personal-center/personal-center.component';
import {CarouselModule} from 'ngx-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SurveyDetailInitialComponent} from './pages/survey-detail-initial/survey-detail-initial.component';
import {MySurveyPageComponent} from './pages/my-survey/my-survey.component';
import {SwiperModule} from 'ngx-swiper-wrapper';
import {DefaultLayoutComponent} from './layout/default-layout.component';
import {SurveyResultComponent} from './pages/survey-result/survey-result.component';
import {SurveyDoComponent} from './pages/survey-do/survey-do.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {FroalaEditorModule, FroalaViewModule} from 'angular-froala-wysiwyg';
import {SurveyService} from './services/survey-service.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeLayoutComponent,
        DefaultLayoutComponent,
        HomePageComponent,
        SurveysByClassPageComponent,
        PersonalCenterPageComponent,
        SurveyDetailInitialComponent,
        MySurveyPageComponent,
        SurveyResultComponent,
        SurveyDoComponent
    ],
    imports: [
        AppRoutingModule,
        BrowserModule,
        AppRoutingModule,
        CarouselModule.forRoot(),
        BrowserAnimationsModule,
        SwiperModule.forRoot({
            direction: 'horizontal',
            slidesPerView: 'auto',
            keyboardControl: true
        }),
        NgxChartsModule,
        FroalaEditorModule.forRoot(),
        FroalaViewModule.forRoot(),
        HttpClientModule
    ],
    providers: [SurveyService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
