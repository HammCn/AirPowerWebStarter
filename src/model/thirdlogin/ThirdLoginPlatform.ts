import { AirEnum } from '@/airpower/base/AirEnum'

export class ThirdLoginPlatform extends AirEnum {
  static readonly WECOM = new ThirdLoginPlatform(1, '企业微信', 'wecom')
    .setAppKey('ww4df4e5d397585277')
    .setOauthUrl('https://login.work.weixin.qq.com/wwlogin/sso/login?agentid=1000090&login_type=CorpApp&appid=APP_KEY&redirect_uri=REDIRECT_URI&state=STATE')

  // static readonly WECHAT = new ThirdLoginPlatform(2, '微信', 'wechat', true)
  //
  // static readonly QQ = new ThirdLoginPlatform(3, 'QQ', 'qq', true)
  //
  // static readonly WEIBO = new ThirdLoginPlatform(4, '微博', 'weibo', true)
  //
  // static readonly DINGTALK = new ThirdLoginPlatform(5, '钉钉', 'dingtalk', true)
  //
  // static readonly FEISHU = new ThirdLoginPlatform(6, '飞书', 'feishu', true)
  //
  // static readonly GOOGLE = new ThirdLoginPlatform(7, '谷歌', 'google', true)
  //
  // static readonly GITHUB = new ThirdLoginPlatform(8, 'GitHub', 'github', true)
  //
  // static readonly GITEE = new ThirdLoginPlatform(9, 'Gitee', 'gitee', true)
  //
  // static readonly APPLE = new ThirdLoginPlatform(10, '苹果', 'apple', true)

  flag!: string

  oauthUrl!: string

  appKey!: string

  width = 800

  height = 750

  constructor(key: number, label: string, flag: string, disable = false) {
    super(key, label)
    this.flag = flag
    this.disabled = disable
  }

  setWidth(width: number): this {
    this.width = width
    return this
  }

  setHeight(height: number): this {
    this.height = height
    return this
  }

  setAppKey(appKey: string): this {
    this.appKey = appKey
    return this
  }

  setOauthUrl(oauthUrl: string): this {
    this.oauthUrl = oauthUrl
    return this
  }
}
