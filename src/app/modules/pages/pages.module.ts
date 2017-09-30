import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HomePageComponent} from './home/home.component';
import {SurveysByClassPageComponent} from './survey-by-class/survey-by-class.component';
import {SurveyDetailInitialComponent} from './survey-detail-initial/survey-detail-initial.component';
import {SwiperModule} from 'ngx-swiper-wrapper';
import {PagesRoutingModule} from './pages.routing';
import {SurveyPayComponent} from './survey-pay/survey-pay.component';

@NgModule({
    declarations: [
        HomePageComponent,
        SurveysByClassPageComponent,
        SurveyDetailInitialComponent,
        SurveyPayComponent
    ],
    imports: [
        PagesRoutingModule,
        SwiperModule.forRoot({
            direction: 'horizontal',
            slidesPerView: 'auto',
            keyboardControl: true
        }),
        HttpClientModule
    ]
})
export class PagesModule {
}
