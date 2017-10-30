export class SurveyDimensionExtraSettings {
    constructor(public isShowDimension?: number,                // 是否显示汇总维度信息
                public isShowSumChart?: number,                 // 是否显示汇总图
                public isShowSumInfo?: number,                  // 是否显示汇总维度的描述信息
                public isShowSubChart?: number,                 // 是否显示维度的图
                public isShowSubInfo?: number,                  // 是否显示子维度的描述信息
                public sumChartType?: number,                   // 汇总图类型
                public sumChartTitle?: string,                  // 汇总图标题
                public sumChartFootScript?: string,             // 汇总图注脚
                public subChartType?: number,                   // 子维度图类型
                public subChartTitle?: string,                  // 子维度图标题
                public subChartFootScript?: string,             // 子维度图注脚
                public subDimensionChartLimitCnt?: number,      // 显示几个子维度
                public subDimensionChartLimitType?: number,     // 显示得分最高还是得分最低的子维度
                public subDimensionInfoLimitCnt?: number,       // 显示几个子维度
                public subDimensionInfoLimitType?: number,      // 显示得分最高还是得分最低的子维度
                public dimensionMaxValue?: number) {            // 维度最大值
    }
}
