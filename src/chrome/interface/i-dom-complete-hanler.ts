/**
 * Can be injected dynamicly in the background.js
 */
export default interface IDomCompleteHandler {
    support(host: string, href: string): boolean
    handle(): void
}