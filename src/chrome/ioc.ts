/**
 * IoC register
 * 
 * @author zhy
 */
import cryptorConfig from '../zero/cryptor-config'
import ITabUpdateHandler from './interface/i-tab-update-handler'
import Initializable from './interface/initializable'
import GuideOpener from '../zero/common/guide-opener'
import Upgradable from './interface/upgradable'

const initializables: Initializable[] = [cryptorConfig, new GuideOpener()]

const upgradables: Upgradable[] = []

const tabUpdateHandlers: ITabUpdateHandler[] = []

export default {
    initializables,
    upgradables,
    tabUpdateHandlers
}