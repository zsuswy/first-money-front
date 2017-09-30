import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeLayoutComponent} from './layout/home-layout.component';
import {SurveyService} from './services/survey-service.service';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'pages',
        pathMatch: 'full',
    },
    {
        path: '',
        component: HomeLayoutComponent,
        children: [
            {
                path: 'survey',
                loadChildren: './modules/survey/survey.module#SurveyModule'
            },
            {
                path: 'pages',
                loadChildren: './modules/pages/pages.module#PagesModule'
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [SurveyService]
})
export class AppRoutingModule {
}
