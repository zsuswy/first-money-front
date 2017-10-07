import {Component, HostBinding, OnInit} from '@angular/core';
import {slideInDownAnimation} from '../../../animations';
import {WxService} from '../../../services/wx-service.service';
import {Router} from '@angular/router';
import {WxBase} from '../../WxBase';
import {SurveyService} from '../../../services/survey-service.service';
import {User} from '../../../model/User';

@Component({
    templateUrl: './personal-center.component.html',
    animations: [slideInDownAnimation],
})

export class PersonalCenterPageComponent extends WxBase implements OnInit {

    userInfo: User = new User();

    constructor(protected router: Router,
                protected wxService: WxService,
                protected surveyService: SurveyService) {
        super(wxService, router);
    }

    ngOnInit(): void {
        this.surveyService.getUser(this.userId).subscribe(resp => {
            this.userInfo = resp.data;
        });
    }

}
