import {Routes, RouterModule} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeLayoutComponent} from './layout/home-layout.component';
import {SurveyService} from './services/survey-service.service';

export const routes: Routes = [
    {
        path: '',
        component: HomeLayoutComponent,
        children: [
            {
                path: '',
                loadChildren: './modules/survey/survey.module#SurveyModule'
            }]
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [SurveyService]
})
export class AppRoutingModule {
}
