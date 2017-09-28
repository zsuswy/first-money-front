/**
 * Created by sunwuyang on 17/7/30.
 */
export class User {
    constructor(public id?: number,
                public userName?: string,
                public password?: string,
                public mobile?: string,
                public wxUserName?: string,
                public wxOpenId?: string,
                public isAgent?: number,
                public agentPayOrderId?: number,
                public score?: number,
                public balance?: number) {
    }
}