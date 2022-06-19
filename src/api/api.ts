import { request } from './axios';
import { downloader } from '@/utils/axios';

/**
 * @description -封装User类型的接口方法
 */
export class UserService {
    // 模块一
    /**
     * @description 用户登录
     * @param {string} username - 用户名
     * @return {HttpResponse} result
     */
    static geiweiboHots(params: any) {
        return request('/top/api/v1/item/weibo', params, 'get');
    }
    // 60秒
    static ge60miao(params: any) {
        return request('https://api.emoao.com/api/60s', params, 'get');
    }
    static gitweiboHot() {
        return request('/api/ajax/side/hotSearch', null, 'get');
    }
    //随机壁纸
    static getBackground() {
        return request('https://qqlykm.cn/api/bing/get', null, 'get');
    }
    //摸鱼日历
    static getmoyuSrc(params: any) {
        return request('https://api.emoao.com/api/moyu', params, 'get');
    }
    // 一言
    static geteveryYan(params: any) {
        return request('https://api.emoao.com/api/yy', params, 'get');
    }

    //历史上的今天
    static lishiDay() {
        return request('https://api.emoao.com/api/lsjr', null, 'get');
    }
    // 查看敏感文件公共接口
    static getPrivateFile(params: { fileName: string }) {
        return downloader(`/the.top/api/v1/item/weibo?limit=${params.fileName}`, {
            method: 'get',
            params
        });
    }
}

export class landRelevant {
    // 模块二
    /**
     * @description 获取地列表
     * @return {HttpResponse} result
     */
    static async landList(params) {
        return request('/land_list_info', params, 'get');
    }
}
