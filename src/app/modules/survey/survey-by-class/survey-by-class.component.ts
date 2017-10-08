import {Component, HostBinding, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SurveyService} from '../../../services/survey-service.service';
import {SurveyClass} from '../../../model/SurveyClass';
import {Survey} from '../../../model/Survey';

@Component({
    templateUrl: './survey-by-class.component.html',
    styleUrls: ['./survey-by-class.component.css']
})
export class SurveysByClassPageComponent implements OnInit {
    selectedClassId: number = -1;

    surveyClassList: SurveyClass[];
    surveyList: Survey[];

    constructor(protected surveyService: SurveyService,
                protected route: ActivatedRoute,
                protected router: Router) {
        route.paramMap.subscribe(params => {
            if (params.has('classId')) {
                this.selectedClassId = Number(params.get('classId'));
            }

            this.surveyService.getSurveyClassList(1).subscribe(resp => {
                this.surveyClassList = resp.data;
                this.ShowTab(this.selectedClassId);
            });
        });
    }

    ShowTab(classId: number) {
        this.selectedClassId = classId;
        let params = {};
        if (classId > 0) {
            params = {'classId': classId};
        }

        this.surveyService.getSurveyList({page: null, params: params}).subscribe(resp => {
            this.surveyList = resp.data.list;
        });
    }

    ngOnInit(): void {

    }

}
