import {Component, Input, OnInit} from '@angular/core';
import {SurveyResultDimensionScore} from '../../../../model/SurveyResultDimensionScore';

@Component({
    selector: 'app-survey-result-2',
    templateUrl: './survey-result-2.component.html',
    styleUrls: ['./survey-result-2.component.css']
})
export class SurveyResult2Component implements OnInit {
    @Input() result: SurveyResultDimensionScore[];

    constructor() {
    }

    ngOnInit() {
    }

}
