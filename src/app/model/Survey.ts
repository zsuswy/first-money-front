/**
 * Created by sunwuyang on 17/7/29.
 */
import {SurveyExtraSettings} from './SurveyExtraSettings';
import {Serializable} from '../util/Serializable';

export class Survey implements Serializable<Survey> {

    private paramsObject: SurveyExtraSettings = null;

    constructor(public id?: number,
                public title?: string,
                public description?: string,
                public shortDescription?: string,
                public createBy?: string,
                public createTime?: Date,
                public classId?: number,
                public status?: number,
                public questionCnt?: number,
                public estimateMinutes?: number,
                public price?: number,
                public orgPrice?: number,
                public image?: string,
                public isNeedSex?: number,
                public testedCnt?: number,
                public resultTemplate?: string,
                public isHot?: number,
                public isNew?: number,
                public isSuper?: number,
                public params?: string,
                public surveyType?: number) {
    }

    /**
     * 属性
     * */
    public get extraSettings(): SurveyExtraSettings {
        if (this.params == null) {
            return {};
        }
        return JSON.parse(this.params) as SurveyExtraSettings;
    }

    /**
     * 属性
     * */
    public set extraSettings(settings: SurveyExtraSettings) {
        this.params = JSON.stringify(settings);
        this.paramsObject = settings;
    }

    public assignToSelf(input): Survey {
        this.id = input.id;
        this.title = input.title;
        this.description = input.description;
        this.shortDescription = input.shortDescription;
        this.createBy = input.createBy;
        this.createTime = input.createTime;
        this.classId = input.classId;
        this.status = input.status;
        this.questionCnt = input.questionCnt;
        this.estimateMinutes = input.estimateMinutes;
        this.price = input.price;
        this.orgPrice = input.orgPrice;
        this.image = input.image;
        this.isNeedSex = input.isNeedSex;
        this.testedCnt = input.testedCnt;
        this.resultTemplate = input.resultTemplate;
        this.isHot = input.isHot;
        this.isNew = input.isNew;
        this.isSuper = input.isSuper;
        this.params = input.params;
        this.surveyType = input.surveyType;

        return this;
    }
}
