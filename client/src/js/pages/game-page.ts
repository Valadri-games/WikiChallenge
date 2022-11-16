import CePage from "../custom-element/ce-page.js";

export default class GamePage {
    private parent: CePage;
    private hooks: any;

    constructor(parent: CePage, hooks: Record<string, any>) {
        this.parent = parent;
        this.hooks = hooks;
    }

    public async onOpen(): Promise<void> {
        this.parent.triggerEvent("startGame", {});
    }
}