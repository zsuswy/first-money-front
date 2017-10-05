import {Component, Input, OnInit} from '@angular/core';
import {SurveyResultDimensionScore} from '../../../../model/SurveyResultDimensionScore';

@Component({
    selector: 'app-survey-result-4',
    templateUrl: './survey-result-4.component.html',
    styleUrls: ['./survey-result-4.component.css']
})
export class SurveyResult4Component implements OnInit {
    @Input() result: SurveyResultDimensionScore[];

    constructor() {
    }

    ngOnInit() {
    }

}
