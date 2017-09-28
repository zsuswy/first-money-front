import {Component, HostBinding} from '@angular/core';
import {slideInDownAnimation} from '../../animations';
import {SurveyService} from '../../services/survey-service.service';

@Component({
    templateUrl: './survey-detail-initial.component.html',
    animations: [slideInDownAnimation]
})
export class SurveyDetailInitialComponent {
    @HostBinding('@routeAnimation')
    routeAnimation = true;

    @HostBinding('style.display')
    display = 'block';

    @HostBinding('style.position')
    position = 'absolute';

    public visible: boolean;
    public show2: boolean;

    constructor(surveyService: SurveyService) {
        this.visible = false;
        this.show2 = false;
    }
}
