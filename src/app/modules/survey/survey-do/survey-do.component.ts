import {Component, HostBinding, OnInit} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {ActivatedRoute, Router} from '@angular/router';
import {SurveyService} from '../../../services/survey-service.service';

declare var _j_scrollTo: any;

@Component({
    templateUrl: './survey-do.component.html',
    styleUrls: ['./survey-do.component.css']
})
export class SurveyDoComponent implements OnInit {
    numbers: Array<number>;

    userSurveyId: number;

    constructor(private surveyService: SurveyService, private route: ActivatedRoute, private router: Router) {
        this.numbers = [];
        this.numbers.push(1);

    }

    scrollTo(num) {
        this.numbers.push(1);
        Observable.of(this.numbers.length - 1).delay(10).subscribe(idx => {
            _j_scrollTo(idx);
        });
    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.userSurveyId = Number(params.get("userSurveyId"));
        });
    }
}
