/**
 * 常量配置
 * */
export class Config {

    static get DEBUG(): boolean {
        return false;
    }

    static showLog = true;

    static get WEB_APP_URL(): string {
        if (Config.DEBUG) {
            return 'http://localhost:9999';
        }
        return 'https://quiz.ronmob.com/qz';
    }

    static log(msg: any): void {
        if (Config.showLog) {
            console.log(msg);
        }
    }
}