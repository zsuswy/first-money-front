/**
 *
 * */
import {SurveyDimensionExtraSettings} from './SurveyDimensionExtraSettings';
import {Serializable} from '../util/Serializable';

export class SurveyDimension implements Serializable<SurveyDimension> {
    private paramsObject: SurveyDimensionExtraSettings;

    constructor(public id?: number,
                public parentId?: number,
                public surveyId?: number,
                public seq?: number,
                public dimensionName?: string,
                public autoCalculateType?: number,
                public proxySubDimensionId?: number,
                public description?: string,
                public isFirstLevel?: boolean,
                public params?: string) {
        if (this.description == null) {
            this.description = '';
        }
    }

    /**
     * 属性
     * */
    public get extraSettings(): SurveyDimensionExtraSettings {
        if (this.paramsObject == null) {
            try {
                this.paramsObject = JSON.parse(this.params);
            } catch (e) {
                this.paramsObject = {};
            }
        }

        return this.paramsObject;
    }

    /**
     * 属性
     * */
    public set extraSettings(settings: SurveyDimensionExtraSettings) {
        this.params = JSON.stringify(settings);
        this.paramsObject = settings;
    }

    assignToSelf(input): SurveyDimension {
        this.id = input.id;
        this.parentId = input.parentId;
        this.surveyId = input.surveyId;
        this.seq = input.seq;
        this.dimensionName = input.dimensionName;
        this.autoCalculateType = input.autoCalculateType;
        this.proxySubDimensionId = input.proxySubDimensionId;
        this.description = input.description;
        this.isFirstLevel = input.isFirstLevel;
        this.params = input.params;

        return this;
    }
}
