import engine from './engine/index'
import sns from './sns/index'
export default {
  en: {
    lang: { name: 'English' },
    engine: engine.en,
    sns: sns.en,
  },
  zhCn: {
    lang: { name: '简体中文' },
    engine: engine.zhCn,
    sns: sns.zhCn,
  },
}
