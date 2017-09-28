import {Component, HostBinding, AfterViewInit, ElementRef, ViewChild, OnInit, NgZone} from '@angular/core';
import {slideInDownAnimation} from '../../animations';
import {SwiperConfigInterface} from 'ngx-swiper-wrapper';
import {SurveyService} from '../../services/survey-service.service';
import {Survey} from '../../model/Survey';

declare var auiSlide: any;
declare var Swiper: any;


@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomePageComponent implements AfterViewInit, OnInit {
    @ViewChild('auislide2')
    aui_slide: ElementRef;

    @ViewChild('swipercontainer1')
    slider1: ElementRef;

    // 最热列表
    hotList: Array<Survey>;

    // 最新列表
    newList: Array<Survey>;

    // 精选列表
    superList: Array<Survey>;

    constructor(private surveyService: SurveyService, lc: NgZone) {
        // 检测是否滚动到底部
        window.onscroll = () => {
            let status = "not reached";
            let windowHeight = "innerHeight" in window ? window.innerHeight
                : document.documentElement.offsetHeight;
            let body = document.body, html = document.documentElement;
            let docHeight = Math.max(body.scrollHeight,
                body.offsetHeight, html.clientHeight,
                html.scrollHeight, html.offsetHeight);
            let windowBottom = windowHeight + window.pageYOffset;
            if (windowBottom >= docHeight) {
                status = 'bottom reached';
            }
            lc.run(() => {
                console.log(status);
            });
        };

    }

    public config: SwiperConfigInterface = {
        scrollbar: null,
        direction: 'horizontal',
        slidesPerView: 1,
        scrollbarHide: false,
        keyboardControl: true,
        mousewheelControl: true,
        // scrollbarDraggable: true,
        scrollbarSnapOnRelease: true,
        pagination: '.swiper-pagination',
        paginationClickable: true,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev'
    };

    public editorOptions = {
        imageUploadURL: "http://quiz.ronmob.com/qz/file/upload"
    };

    ngOnInit() {
        this.surveyService.getSurveyHotList().subscribe(resp => {
            if (resp.success) {
                this.hotList = resp.data.list;
            }
            this.createHorizonalSwiper('.hot-swiper-container');
        });
        this.surveyService.getSurveyNewList().subscribe(resp => {
            if (resp.success) {
                this.newList = resp.data.list;
            }
            this.createHorizonalSwiper('.new-swiper-container');
        });
        this.surveyService.getSurveySuperList().subscribe(resp => {
            if (resp.success) {
                this.superList = resp.data.list;
            }
        });
    }

    createHorizonalSwiper(selector: string) {
        setTimeout(() => {
            new Swiper(selector, {
                // pagination: '.swiper-pagination',
                slidesPerView: 3,
                paginationClickable: true,
                spaceBetween: 10,
                freeMode: true
            });
        }, 1);
    }


    ngAfterViewInit(): void {
        let slide = new auiSlide({
            container: this.aui_slide.nativeElement,
            'height': '8rem',
            'speed': 200,
            //'autoPlay': 3000,
            'loop': true,
            'pageShow': true,
            'pageStyle': 'line',
            'dotPosition': 'center'
        });
    }
}
