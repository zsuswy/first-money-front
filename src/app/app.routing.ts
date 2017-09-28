import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeLayoutComponent} from './layout/home-layout.component';
import {HomePageComponent} from './pages/home/home.component';
import {SurveysByClassPageComponent} from './pages/survey-by-class/survey-by-class.component';
import {PersonalCenterPageComponent} from './pages/personal-center/personal-center.component';
import {MySurveyPageComponent} from './pages/my-survey/my-survey.component';
import {SurveyDetailInitialComponent} from './pages/survey-detail-initial/survey-detail-initial.component';
import {SurveyDoComponent} from './pages/survey-do/survey-do.component';
import {SurveyResultComponent} from './pages/survey-result/survey-result.component';


export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
    },
    {
        path: '',
        component: HomeLayoutComponent,
        data: {
            title: 'Home'
        },
        children: [
            {
                path: 'home',
                // loadChildren: './survey/survey.module#SurveyModule'
                component: HomePageComponent
            },
            {
                path: 'my',
                // loadChildren: './survey/survey.module#SurveyModule'
                component: MySurveyPageComponent
            },
            {
                path: 'survey',
                // loadChildren: './survey/survey.module#SurveyModule'
                component: SurveysByClassPageComponent
            },
            {
                path: 'personal-center',
                // loadChildren: './survey/survey.module#SurveyModule'
                component: PersonalCenterPageComponent
            },
            {
                path: 'survey-detail-initial/:id',
                // loadChildren: './survey/survey.module#SurveyModule'
                component: SurveyDetailInitialComponent
            },
            {
                path: 'survey-do',
                // loadChildren: './survey/survey.module#SurveyModule'
                component: SurveyDoComponent
            },
            {
                path: 'survey-result',
                // loadChildren: './survey/survey.module#SurveyModule'
                component: SurveyResultComponent
            }

        ]
    }
];


@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
