import {Component, HostBinding, OnInit, ViewChild} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/delay';
import {ActivatedRoute, Router} from '@angular/router';
import {SurveyService} from '../../../services/survey-service.service';
import {UserSurvey} from '../../../model/UserSurvey';
import {SurveyQuestion} from '../../../model/SurveyQuestion';
import {SurveyAnswer} from '../../../model/SurveyAnswer';
import {SurveyQuestionOption} from '../../../model/SurveyQuestionOption';
import {Survey} from '../../../model/Survey';
import {SurveyType} from '../../../model/SurveyType';
import {ResponseResult} from '../../../model/common/ResponseResult';
import {SurveyDimensionScoreText} from '../../../model/SurveyDimensionScoreText';
import {SurveyResultDimensionScore} from '../../../model/SurveyResultDimensionScore';
import 'rxjs/add/observable/forkJoin';
import {SurveyDimension} from '../../../model/SurveyDimension';
import {WxService} from '../../../services/wx-service.service';
import {WxBase} from '../../WxBase';
import {LoadingComponent} from '../../common/loading/loading.component';
import {Config} from '../../Config';

declare var _j_scrollTo: any;

@Component({
    templateUrl: './survey-do.component.html',
    styleUrls: ['./survey-do.component.css']
})
export class SurveyDoComponent extends WxBase implements OnInit {
    @ViewChild(LoadingComponent)
    private loadComponent: LoadingComponent;

    // 当前用户的性别
    userSelectedSex = 0;

    // 是否区分性别
    isNeedSex = 0;

    // 从参数获取
    userSurveyId: number;

    surveyId: number;

    // 当前的 用户测评
    userSurvey: UserSurvey = new UserSurvey();

    // 当前的测评信息
    survey: Survey = new Survey();

    // 当前测评的问题列表
    surveyQuestionList: SurveyQuestion[] = [];

    // 用户已做题目的答案列表
    surveyAnswerList: SurveyAnswer[] = [];

    // 已经做完的题目列表
    activeQuestionList: SurveyQuestion[] = [];

    // 是否已经完成全部答题
    userFinished: boolean = false;

    constructor(protected surveyService: SurveyService,
                protected route: ActivatedRoute,
                protected router: Router,
                protected wxService: WxService) {
        super(wxService, router);

    }

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            // 获取参数
            this.userSurveyId = Number(params.get("userSurveyId"));
            this.initData();
        });
    }

    /**
     * 加载初始化数据
     * */
    initData() {
        this.surveyService.getUserSurvey(this.userSurveyId).subscribe(resp => {
            this.userSurvey = resp.data;
            Config.log('Survey-Do-Component:    ' + 'initData:1');
            if (resp.success && this.userSurvey == null) {
                // 等待支付结果确认（有可能跳转的时候支付宝的支付回调结果还没有返回）
                // TODO: 可以优化，如果长时间没有支付回调。
                Config.log('Survey-Do-Component:    ' + 'initData:------');
                let ng_this = this;
                setTimeout(() => {
                    ng_this.initData();
                }, 1000);
                return;
            }
            Config.log('Survey-Do-Component:    ' + 'initData:2');

            this.surveyId = this.userSurvey.surveyId;
            Config.log('Survey-Do-Component:    ' + 'initData:3');

            Observable.zip(this.surveyService.getSurvey(this.userSurvey.surveyId),      // Survey 对象
                this.surveyService.getSurveyQuestionList({                  // Survey的问题列表
                    page: null,
                    params: {'surveyId': this.userSurvey.surveyId}
                })
            ).subscribe(paramList => {
                Config.log('Survey-Do-Component:    ' + 'initData:4');

                this.survey = paramList[0].data;
                this.surveyQuestionList = paramList[1].data.list;

                this.isNeedSex = this.survey.isNeedSex;
                this.userSelectedSex = this.userSurvey.selectedSex;
                Config.log('Survey-Do-Component:    ' + 'initData:5');

                if (this.userSurvey.answer != null) {
                    this.surveyAnswerList = JSON.parse(this.userSurvey.answer);
                } else {
                    this.surveyAnswerList = [];
                }
                // 如果区分性别，需要选择性别后才开始
                if (!this.isNeedSex || this.userSelectedSex > 0) {
                    // 初始化数据
                    Config.log('Survey-Do-Component:    ' + 'initData:6');

                    this.start();
                }
                Config.log('Survey-Do-Component:    ' + 'initData:7');

                this.loadComponent.loadComplete();
            });
        });
    }

    /**
     * 初始化数据，开始进入测试
     * */
    start() {
        // 初始化要显示的题目
        for (let i = 0; i < this.surveyAnswerList.length; i++) {
            this.activeQuestionList.push(this.surveyQuestionList.find(item => item.seq == this.surveyAnswerList[i].questionSeq &&
                item.id == this.surveyAnswerList[i].questionId));
        }

        // 如果是第一次进入，默认进行第一题
        if (this.activeQuestionList.length == 0) {
            this.goToNext();
        }

        // 如果是从中途开始做题目
        else {
            this.goToNext(this.activeQuestionList[this.activeQuestionList.length - 1].id,
                this.surveyAnswerList[this.surveyAnswerList.length - 1].userSelection);
        }
    }

    /**
     * 计算下一个问题
     * */
    calculateNextQuestion(questionId ?: number, selectOption ?: SurveyQuestionOption): SurveyQuestion {
        let nextQuestionSeq = -1;
        // 获取下一题的 Seq
        if (selectOption == null) {
            nextQuestionSeq = 1; // TODO:优化-可以选取最小的SEQ，不写死
        }
        else if (this.survey.surveyType == SurveyType.JumpByOptionSetting) {
            nextQuestionSeq = selectOption.jumpTo;
            if (nextQuestionSeq == null) {
                return null;
            }
        } else {
            let selectQuestion = this.surveyQuestionList.find(q => q.id == questionId);
            nextQuestionSeq = selectQuestion.seq + 1;
        }

        // 如果下一题已经存在，那么返回空
        if (this.activeQuestionList.find(q => q.seq == nextQuestionSeq) != null) {

            return null;
        }

        let nextQuestion = null;

        // 如果有重复序号的题目存在，根据性别筛选
        if (this.surveyQuestionList.filter(item => item.seq == nextQuestionSeq).length > 1) {
            nextQuestion = this.surveyQuestionList.find(item => item.seq == nextQuestionSeq && item.sex == this.userSelectedSex);
        }
        else {
            nextQuestion = this.surveyQuestionList.find(item => item.seq == nextQuestionSeq);
        }
        return nextQuestion;
    }

    /**
     * 保存做题结果，并进入下一题目
     * */
    goToNext(questionId ?: number, option ?: string) {
        // 第一次答题
        if (questionId == null && option == null) {
            this.activeQuestionList.push(this.calculateNextQuestion());
            return;
        }

        // 当前选中的问题 和 答案
        let selectedQuestion = this.surveyQuestionList.find(q => q.id == questionId);
        let selectedAnswer = this.surveyAnswerList.find(answer => answer.questionId == questionId);

        // 下一题
        let nextQuestion: SurveyQuestion;

        // 保存答案
        if (selectedAnswer != null) {
            selectedAnswer.userSelection = option;
            selectedAnswer.scoreList = this.getOptionList(selectedQuestion.questionContent)
                .find(op => op.option == option).optionScoreList;
        }
        else {
            selectedAnswer = new SurveyAnswer();

            selectedAnswer.questionId = selectedQuestion.id;
            selectedAnswer.questionSeq = selectedQuestion.seq;
            let selectOption = this.getOptionList(selectedQuestion.questionContent).find(op => op.option == option);
            selectedAnswer.userSelection = selectOption.option;
            selectedAnswer.scoreList = selectOption.optionScoreList;

            selectedQuestion.selectedOption = option;
            this.surveyAnswerList.push(selectedAnswer);
        }

        // 计算下一题
        nextQuestion = this.calculateNextQuestion(selectedQuestion.id,
            this.getOptionList(selectedQuestion.questionContent).find(op => op.option == option));

        if (nextQuestion != null) {
            this.activeQuestionList.push(nextQuestion);
            this.scrollTo(nextQuestion.id);
        } else if (this.activeQuestionList.length == this.surveyAnswerList.length) {
            // 结束
            this.userFinished = true;
            this.scrollTo('end');
        }

        this.saveAnswer().subscribe(resp => {

        });
    }

    /**
     * 计算测评结果
     * */
    completeSurvey() {
        Observable.forkJoin(
            this.surveyService.getSurveyDimensionScoreTextList({
                page: null,
                params: {'surveyId': this.userSurvey.surveyId}
            }),
            this.surveyService.getSurveyDimensionList({
                page: null,
                params: {'surveyId': this.userSurvey.surveyId}
            }))
            .subscribe(respList => {
                let dimensionScoreTextList: SurveyDimensionScoreText[] = respList[0].data.list;
                let dimensionList: SurveyDimension[] = respList[1].data.list;
                Config.log(dimensionScoreTextList);
                Config.log(dimensionList);
                Config.log(this.surveyAnswerList);
                // 计算的结果
                let resultList: SurveyResultDimensionScore[] = [];

                // 初始化结果列表
                for (let i = 0; i < dimensionList.length; i++) {
                    let scoreItem = new SurveyResultDimensionScore();
                    scoreItem.dimensionId = dimensionList[i].id;
                    scoreItem.dimensionName = dimensionList[i].dimensionName;

                    resultList.push(scoreItem);
                }

                // 进行计算
                for (let i = 0; i < this.surveyAnswerList.length; i++) {
                    for (let j = 0; j < this.surveyAnswerList[i].scoreList.length; j++) {
                        let scoreInfo = this.surveyAnswerList[i].scoreList[j];

                        if (scoreInfo.score != null) {
                            // 如果选项得分落在得分卡的范围
                            if (dimensionScoreTextList.find(item => item.dimensionId == scoreInfo.dimensionId) != null) {

                                let resultItem = resultList.find(item => item.dimensionId == scoreInfo.dimensionId);
                                if (resultItem.score == null) {
                                    resultItem.score = 0;
                                }

                                resultItem.score += Number(scoreInfo.score);
                            }
                        }
                    }
                }

                // 填充得分卡数据到结果
                for (let i = 0; i < resultList.length; i++) {
                    let resultListItem = resultList[i];
                    let matchScoreText = dimensionScoreTextList.find(st => st.dimensionId == resultListItem.dimensionId
                        && resultListItem.score <= st.scoreMax && resultListItem.score >= st.scoreMin);
                    if (matchScoreText != null) {
                        resultListItem.comment = matchScoreText.resultComment;
                        resultListItem.title = matchScoreText.resultTitle;
                    }
                }

                this.userSurvey.result = JSON.stringify(resultList);
                this.userSurvey.status = 2;
                this.userSurvey.finishTime = new Date();

                // 保存
                this.surveyService.updateUserSurvey(this.userSurvey).subscribe(resp => {
                    this.router.navigate(['/survey-result', this.userSurvey.id]);
                    Config.log(resp);
                });
                Config.log(resultList);
            });
    }


    /**
     * 保存答题结果
     * */
    saveAnswer(): Observable<ResponseResult> {
        this.userSurvey.answer = JSON.stringify(this.surveyAnswerList);
        return this.surveyService.updateUserSurvey(this.userSurvey);
    }

    /**
     * 滚动到ID为 xxxx 的元素
     * */
    scrollTo(num) {
        Observable.of(0).delay(1).subscribe(idx => {
            _j_scrollTo(num);
        });
    }

    /**
     * 获取问卷的选项，以JSON对象的形式返回
     * */
    getOptionList(content: string): SurveyQuestionOption[] {
        return JSON.parse(content) as SurveyQuestionOption[];
    }

    getOptionClassName(questionId: number, option: string) {
        let ans = this.surveyAnswerList.find(a => a.questionId == questionId);
        if (ans == null) {
            return '';
        }
        return ans.userSelection == option ? 'selected-option' : '';
    }

    selectSex(selectedSex: number) {
        if (this.userSelectedSex > 0)
            return;

        this.userSelectedSex = selectedSex;
        this.userSurvey.selectedSex = selectedSex;
        this.saveAnswer();
        this.start();
    }
}
