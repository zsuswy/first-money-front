import {Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';
import {slideInDownAnimation} from '../../../animations';
import {SurveyService} from '../../../services/survey-service.service';
import {UserSurvey} from '../../../model/UserSurvey';
import {Router} from '@angular/router';
import {WxService} from '../../../services/wx-service.service';
import {WxBase} from '../../WxBase';


@Component({
    templateUrl: './my-survey.component.html',
    styleUrls: ['./my-survey.component.css']
})
export class MySurveyPageComponent extends WxBase implements OnInit {
    currentTab: number = 1;

    userSurveyList: UserSurvey[] = [];

    toDoCnt: number;

    constructor(protected surveyService: SurveyService,
                protected router: Router,
                protected wxService: WxService) {
        super(wxService, router);
    }

    ngOnInit(): void {
        this.currentTab = 1;
        this.surveyService.getUserSurveyListWithDetail({page: null, params: {'userId': this.userId}})
            .subscribe(resp => {
                if (resp.data != null) {
                    this.userSurveyList = resp.data.list;
                    this.toDoCnt = this.userSurveyList.filter(s => s.status == 1).length;
                }
            });
    }

    selectTab(tabIndex: number) {
        this.currentTab = tabIndex;

    }

    getList() {
        if (this.currentTab == 3) {
            return this.userSurveyList.filter(s => {
                return s.status == 0;
            });
        }
        return this.userSurveyList.filter(s => {
            return s.status == this.currentTab;
        })
    }

    surveyClick(userSurvey: UserSurvey) {
        if (userSurvey.status == 1) {
            this.router.navigate(['/survey-do/', userSurvey.id]);
        }
        else if (userSurvey.status == 2) {
            this.router.navigate(['/survey-detail-initial/', userSurvey.surveyId]);
        } else if (userSurvey.status == 0) {
            this.router.navigate(['/pay/', userSurvey.surveyId]);
        }
    }
}
