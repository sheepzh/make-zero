/**
 * Invoked while this extension is been installed
 */
export default interface Upgradable {
    upgrade(): void
}