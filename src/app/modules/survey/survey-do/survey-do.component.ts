import {Component, HostBinding} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';

declare var _j_scrollTo: any;

@Component({
    templateUrl: './survey-do.component.html',
    styleUrls: ['./survey-do.component.css']
})
export class SurveyDoComponent {
    numbers: Array<number>;

    constructor() {
        this.numbers = [];
        this.numbers.push(1);

    }

    scrollTo(num) {
        this.numbers.push(1);
        Observable.of(this.numbers.length - 1).delay(10).subscribe(idx => {
            _j_scrollTo(idx);
        });
    }
}
