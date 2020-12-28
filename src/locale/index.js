import engine from './engine/index'
import sns from './sns/index'
import version from './version/index'
import button from './button'
export default {
  en: {
    lang: { name: 'English' },
    engine: engine.en,
    sns: sns.en,
    version: version.en,
    button: button.en
  },
  zhCn: {
    lang: { name: '简体中文' },
    engine: engine.zhCn,
    sns: sns.zhCn,
    version: version.zhCn,
    button: button.zhCn
  },
}
