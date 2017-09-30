import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {PersonalCenterPageComponent} from './personal-center/personal-center.component';
import {MySurveyPageComponent} from './my-survey/my-survey.component';
import {SurveyResultComponent} from './survey-result/survey-result.component';
import {SurveyDoComponent} from './survey-do/survey-do.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {SurveyRoutingModule} from './survey.routing';

@NgModule({
    declarations: [
        PersonalCenterPageComponent,
        MySurveyPageComponent,
        SurveyResultComponent,
        SurveyDoComponent
    ],
    imports: [
        SurveyRoutingModule,
        NgxChartsModule,
        HttpClientModule
    ]
})
export class SurveyModule {
}
