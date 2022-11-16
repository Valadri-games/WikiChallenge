import { LogError } from "../../../node_modules/concurrently/dist/src/index.js";
import CeWebview from "../custom-element/ce-webview.js";
import SaeGenerator from "../managers/sae-generator.js";

export default class EndPageWordDefinition {
    private parent: CeWebview;
    private hooks: any;

    constructor(parent: CeWebview, hooks: Record<string, any>) {
        this.parent = parent;
        this.hooks = hooks;

        this.hooks.onLoad.value = this.iframeLoaded;

        this.parent.listenEvent('pageEndUpdate', this.updateIframeContent);
        this.parent.listenEvent('loadingNewPageEnd', this.loadingNewPageEnd);
    }

    private iframeLoaded = (event) => {
        this.parent.hideLoading();
    }

    private updateIframeContent = async (event) => {
        let result = await fetch("http://localhost:3000/?query=https://fr.wikipedia.org/wiki/" + SaeGenerator.getInstance().endPage);
        let responseBody = await result.text();

        this.parent.fillContent(JSON.parse(responseBody).response);

        //@ts-ignore
        for (let links = this.parent.iframeDoc.links, numLinks = links.length, i=0; i < numLinks; i ++) {
            links[i].onclick = (event) => {
                event.preventDefault();
            }
        }
    }

    private loadingNewPageEnd = (event) => {
        this.parent.showLoading();
    }
}