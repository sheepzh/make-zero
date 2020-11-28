import ITabUpdateHandler from './i-tab-update-handler';

/**
 * Can be injected dynamicly in the background.js
 */
export default interface IContentScript {
    runAtStart(): void
    runAtEnd(): void
}

export const CONTENT_SCRIPT_ALL_URL = "<all_urls>";

export enum RunAt {
    IDLE = 'document_idle',
    START = 'document_start',
    END = 'document_end'
}