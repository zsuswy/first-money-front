import {Component, OnInit} from '@angular/core';
import {SurveyService} from '../../services/survey-service.service';
import {Survey} from '../../model/Survey';
import {ActivatedRoute} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
    templateUrl: './survey-detail-initial.component.html'
})
export class SurveyDetailInitialComponent implements OnInit {
    survey = new Survey();
    surveyId: number;

    constructor(private surveyService: SurveyService, private route: ActivatedRoute, private domSanitizer: DomSanitizer) {

    }

    ngOnInit(): void {
        this.route.paramMap.subscribe(params => {
            this.surveyId = Number(params.get("id"));

            this.surveyService.getSurvey(this.surveyId).subscribe(resp => {
                this.survey = resp.data;
            })
        });
    }

    getHtml() {
        return this.domSanitizer.bypassSecurityTrustHtml(this.survey.description);
    }

}
