import {Component, HostBinding, OnInit} from '@angular/core';
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

declare var _j_scrollTo: any;

@Component({
    templateUrl: './survey-do.component.html',
    styleUrls: ['./survey-do.component.css']
})
export class SurveyDoComponent implements OnInit {

    // 当前用户的性别
    defaultUserSex: 1;

    // 从参数获取
    userSurveyId: number;

    // 当前的 用户测评
    userSurvey: UserSurvey;

    // 当前的测评信息
    survey: Survey;

    // 当前测评的问题列表
    surveyQuestionList: SurveyQuestion[] = [];

    // 用户已做题目的答案列表
    surveyAnswerList: SurveyAnswer[] = [];

    // 已经做完的题目列表
    activeQuestionList: SurveyQuestion[] = [];

    constructor(private surveyService: SurveyService, private route: ActivatedRoute, private router: Router) {
        // 获取 UserSurvey
        route.paramMap.subscribe(params => {
                this.userSurveyId = Number(params.get('userSurveyId'));
                this.surveyService.getUserSurvey(this.userSurveyId).subscribe(resp => {
                    // 获取答题数据
                    this.userSurvey = resp.data;
                    if (this.userSurvey.answer != null) {
                        this.surveyAnswerList = JSON.parse(this.userSurvey.answer);
                    } else {
                        this.surveyAnswerList = [];
                    }
                    console.log('this.surveyAnswerList: ------>');
                    console.log(this.surveyAnswerList);

                    this.surveyService.getSurvey(this.userSurvey.surveyId).subscribe(resp => {
                        this.survey = resp.data;

                        // 获取问题列表数据
                        this.surveyService.getSurveyQuestionList({
                            page: null,
                            params: {'surveyId': this.userSurvey.surveyId}
                        }).subscribe(resp => {
                            this.surveyQuestionList = resp.data.list;

                            // 初始化数据
                            this.start();

                        });
                    });
                });
            }
        );
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
    calculateNextQuestion(questionId?: number, selectOption?: SurveyQuestionOption): SurveyQuestion {
        let nextQuestionSeq = -1;

        // 获取下一题的 Seq
        if (selectOption == null) {
            nextQuestionSeq = 1;
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
        console.log(selectOption);
        console.log(this.surveyQuestionList);
        console.log(nextQuestionSeq);


        let nextQuestion = null;
        // 如果有重复序号的题目存在，根据性别筛选
        if (this.surveyQuestionList.filter(item => item.id == questionId).length > 1) {
            nextQuestion = this.surveyQuestionList.find(item => item.id == questionId && item.sex == this.defaultUserSex);
        }
        else {
            nextQuestion = this.surveyQuestionList.find(item => item.seq == nextQuestionSeq);
        }
        console.log(nextQuestion);

        return nextQuestion;
    }

    /**
     * 保存做题结果，并进入下一题目
     * */
    goToNext(questionId?: number, option?: string) {
        // 第一次答题
        if (questionId == null && option == null) {
            this.activeQuestionList.push(this.surveyQuestionList[0]);
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
        } else {
            this.scrollTo(this.activeQuestionList[this.activeQuestionList.length - 1].id);
        }

        this.saveAnswer().subscribe(resp => {

        });
    }

    finishAnswer() {

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

    ngOnInit() {
        this.route.paramMap.subscribe(params => {
            this.userSurveyId = Number(params.get("userSurveyId"));
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
}
