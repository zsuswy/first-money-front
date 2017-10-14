import {Component, OnInit, ViewChild} from '@angular/core';
import {WxService} from '../../../services/wx-service.service';
import {Router} from '@angular/router';
import {WxBase} from '../../WxBase';
import {SurveyService} from '../../../services/survey-service.service';
import {User} from '../../../model/User';
import {LoadingComponent} from '../../common/loading/loading.component';

@Component({
    templateUrl: './personal-center.component.html'
})

export class PersonalCenterPageComponent extends WxBase implements OnInit {
    @ViewChild(LoadingComponent)
    private loadComponent: LoadingComponent;

    userInfo: User = new User();

    constructor(protected router: Router,
                protected wxService: WxService,
                protected surveyService: SurveyService) {
        super(wxService, router);
    }

    ngOnInit(): void {
        this.surveyService.getUser(this.userId).subscribe(resp => {
            this.userInfo = resp.data;
            this.loadComponent.loadComplete();
        });
    }

}
