import {Component, HostBinding, AfterViewInit, ElementRef, ViewChild, OnInit, NgZone} from '@angular/core';
import {SurveyService} from '../../../services/survey-service.service';
import {Survey} from '../../../model/Survey';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {LoadingComponent} from '../../common/loading/loading.component';

declare let auiSlide: any;
declare let Swiper: any;

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomePageComponent implements AfterViewInit, OnInit {
    @ViewChild('auislide2')
    aui_slide: ElementRef;

    @ViewChild(LoadingComponent)
    private loadComponent: LoadingComponent;

    // 最热列表
    hotList: Array<Survey>;

    // 最新列表
    newList: Array<Survey>;

    // 精选列表
    superList: Array<Survey>;

    isShowMessage: boolean = false;
    errorMessage: string = '';

    constructor(private surveyService: SurveyService, lc: NgZone, private router: Router, private route: ActivatedRoute) {
        // 检测是否滚动到底部
        // window.onscroll = () => {
        //     let status = "not reached";
        //     let windowHeight = "innerHeight" in window ? window.innerHeight
        //         : document.documentElement.offsetHeight;
        //     let body = document.body, html = document.documentElement;
        //     let docHeight = Math.max(body.scrollHeight,
        //         body.offsetHeight, html.clientHeight,
        //         html.scrollHeight, html.offsetHeight);
        //     let windowBottom = windowHeight + window.pageYOffset;
        //     if (windowBottom >= docHeight) {
        //         status = 'bottom reached';
        //     }
        //     lc.run(() => {
        //         console.log(status);
        //     });
        // };
    }

    ngOnInit() {
        let ng_this = this;
        Observable.zip(this.surveyService.getSurveyHotList(),
            this.surveyService.getSurveyNewList(),
            this.surveyService.getSurveySuperList())
            .subscribe(respList => {
                this.hotList = respList[0].data.list;
                this.newList = respList[1].data.list;
                this.superList = respList[2].data.list;

                this.createHorizonalSwiper('.hot-swiper-container');
                this.createHorizonalSwiper('.new-swiper-container');

                this.loadComponent.loadComplete();
                //
                // let dialog = new auiDialog();
                //
                // dialog.alert({
                //     title: "弹出提示",
                //     msg: '这里是内容',
                //     buttons: ['取消', '确定'],
                //     input: true // 是否有输入框
                // }, function (ret) {
                //     ng_this.alertReturn(ret);
                // })

            });
    }

    createHorizonalSwiper(selector: string) {
        setTimeout(() => {
            new Swiper(selector, {
                // pagination: '.swiper-pagination',
                direction: 'horizontal',
                spaceBetween: 10,
                slidesPerView: 'auto',
                freeMode: true,
                mousewheel: true,
            });
        }, 1);
    }

    ngAfterViewInit(): void {
        let slide = new auiSlide({
            container: this.aui_slide.nativeElement,
            'height': '8rem',
            'speed': 200,
            'autoPlay': 2000,
            'loop': false,
            'pageShow': true,
            'pageStyle': 'line',
            'dotPosition': 'center'
        });
    }
}
