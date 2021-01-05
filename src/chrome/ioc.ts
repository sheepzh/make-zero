/**
 * IoC register
 * 
 * @author zhy
 */
import cryptorConfig from '../components/zero/cryptor-config'
import ITabUpdateHandler from './interface/i-tab-update-handler'
import Initializable from './interface/initializable'
import Upgradable from './interface/upgradable'

const initializables: Initializable[] = [cryptorConfig]

const upgradables: Upgradable[] = []

const tabUpdateHandlers: ITabUpdateHandler[] = []

export default {
    initializables,
    upgradables,
    tabUpdateHandlers
}