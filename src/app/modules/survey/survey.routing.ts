import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {PersonalCenterPageComponent} from './personal-center/personal-center.component';
import {MySurveyPageComponent} from './my-survey/my-survey.component';
import {SurveyDoComponent} from './survey-do/survey-do.component';
import {SurveyResultComponent} from './survey-result/survey-result.component';
import {HomePageComponent} from './home/home.component';
import {SurveysByClassPageComponent} from './survey-by-class/survey-by-class.component';
import {SurveyDetailInitialComponent} from './survey-detail-initial/survey-detail-initial.component';
import {SurveyPayComponent} from './survey-pay/survey-pay.component';
import {EntryComponent} from './entry/entry.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        component: EntryComponent,
    },
    {
        path: 'home',
        component: HomePageComponent
    },
    {
        path: 'surveyClasses',
        component: SurveysByClassPageComponent
    },
    {
        path: 'surveyClasses/:classId',
        component: SurveysByClassPageComponent
    },
    {
        path: 'survey-detail-initial/:surveyId',
        component: SurveyDetailInitialComponent
    },
    {
        path: 'survey-detail-initial/:surveyId/:fromUserId',
        component: SurveyDetailInitialComponent
    },
    {
        path: 'pay/:surveyId',
        component: SurveyPayComponent
    },
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
        path: 'survey-result/:userSurveyId',
        component: SurveyResultComponent
    }
];


@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class SurveyRoutingModule {
}
