import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomePageComponent} from './home/home.component';
import {SurveysByClassPageComponent} from './survey-by-class/survey-by-class.component';
import {SurveyDetailInitialComponent} from './survey-detail-initial/survey-detail-initial.component';
import {SurveyPayComponent} from './survey-pay/survey-pay.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
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
        path: 'survey-detail-initial/:id',
        component: SurveyDetailInitialComponent
    },
    {
        path: 'pay/:id',
        component: SurveyPayComponent
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {
}
