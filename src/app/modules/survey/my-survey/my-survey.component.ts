import {AfterViewInit, Component, ElementRef, HostBinding, OnInit, ViewChild} from '@angular/core';
import {slideInDownAnimation} from '../../../animations';
import {SurveyService} from '../../../services/survey-service.service';
import {UserSurvey} from '../../../model/UserSurvey';
import {Router} from '@angular/router';


@Component({
    templateUrl: './my-survey.component.html',
    animations: [slideInDownAnimation],
    styleUrls: ['./my-survey.component.css']
})
export class MySurveyPageComponent implements OnInit {
    @HostBinding('@routeAnimation')
    routeAnimation = true;
    @HostBinding('style.display')
    display = 'block';
    @HostBinding('style.position')
    position = 'absolute';

    @ViewChild('tabContainer')
    tabContainer: ElementRef;

    currentTab: number = 1;

    userSurveyList: UserSurvey[] = [];

    toDoCnt: number;

    constructor(private surveyService: SurveyService, private router: Router) {

    }

    ngOnInit(): void {
        this.currentTab = 1;
        this.surveyService.getUserSurveyListWithDetail({page: null, params: {}})
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
            return this.userSurveyList;
        }
        return this.userSurveyList.filter(s => {
            return s.status == this.currentTab;
        })
    }

    surveyClick(userSurvey: UserSurvey) {
        if (userSurvey.status == 1) {
            this.router.navigate(['/survey/survey-do/', userSurvey.id]);
        }
        else if (userSurvey.status == 2) {
            this.router.navigate(['/pages/survey-detail-initial/', userSurvey.surveyId]);
        }
    }
}
