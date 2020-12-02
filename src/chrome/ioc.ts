/**
 * IoC register
 * 
 * @author zhy
 */
import engineComposite from '../components/engine/engine-composite'
import cryptorConfig from '../components/sns-zero/cryptor-config'
import ITabUpdateHandler from './interface/i-tab-update-handler'
import Initializable from './interface/initializable'
import Upgradable from './interface/upgradable'

const initializables: Initializable[] = [cryptorConfig]

const upgradables: Upgradable[] = []

const tabUpdateHandlers: ITabUpdateHandler[] = []
engineComposite.forEach(engine => tabUpdateHandlers.push(engine))

export default {
    initializables,
    upgradables,
    tabUpdateHandlers
}