import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {PersonalCenterPageComponent} from './personal-center/personal-center.component';
import {MySurveyPageComponent} from './my-survey/my-survey.component';
import {SurveyResultComponent} from './survey-result/survey-result.component';
import {SurveyDoComponent} from './survey-do/survey-do.component';
import {NgxChartsModule} from '@swimlane/ngx-charts';
import {SurveyRoutingModule} from './survey.routing';
import {SurveyResult1Component} from './survey-result-template/survey-result-1/survey-result-1.component';
import {SurveyResult2Component} from './survey-result-template/survey-result-2/survey-result-2.component';
import {SurveyResult3Component} from './survey-result-template/survey-result-3/survey-result-3.component';
import {SurveyResult4Component} from './survey-result-template/survey-result-4/survey-result-4.component';
import {SurveyResult5Component} from './survey-result-template/survey-result-5/survey-result-5.component';

@NgModule({
    declarations: [
        PersonalCenterPageComponent,
        MySurveyPageComponent,
        SurveyResultComponent,
        SurveyDoComponent,
        SurveyResult1Component,
        SurveyResult2Component,
        SurveyResult3Component,
        SurveyResult4Component,
        SurveyResult5Component
    ],
    imports: [
        SurveyRoutingModule,
        NgxChartsModule,
        HttpClientModule
    ]
})
export class SurveyModule {
}
