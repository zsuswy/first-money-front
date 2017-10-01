import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {PersonalCenterPageComponent} from './personal-center/personal-center.component';
import {MySurveyPageComponent} from './my-survey/my-survey.component';
import {SurveyDoComponent} from './survey-do/survey-do.component';
import {SurveyResultComponent} from './survey-result/survey-result.component';


export const routes: Routes = [
    {
        path: 'my',
        component: MySurveyPageComponent
    },
    {
        path: 'personal-center',
        component: PersonalCenterPageComponent
    },
    {
        path: 'survey-do/:userSurveyId',
        component: SurveyDoComponent
    },
    {
        path: 'survey-result',
        component: SurveyResultComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SurveyRoutingModule {
}
