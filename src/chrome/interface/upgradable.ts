/**
 * Invoked while this extension is updated
 * 
 * @author zhy
 */
export default interface Upgradable {
    upgrade(periousVersion: string): void
}