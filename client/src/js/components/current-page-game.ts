import CeWebview from "../custom-element/ce-webview.js";
import SaeGenerator from "../managers/sae-generator.js";

export default class CurrentPageGame {
    private parent: CeWebview;
    private hooks: any;

    private currentPage: string;

    constructor(parent: CeWebview, hooks: Record<string, any>) {
        this.parent = parent;
        this.hooks = hooks;

        this.hooks.onLoad.value = this.iframeLoaded;

        this.parent.listenEvent('startGame', this.startGame);
    }

    private iframeLoaded = (event) => {
        this.parent.hideLoading();
    }

    private startGame = () => {
        this.currentPage = SaeGenerator.getInstance().startPage;
        console.log(this.currentPage)
        this.updateIframeContent();
    }

    private async updateIframeContent() {
        let result = await fetch("http://localhost:3000/?query=https://fr.wikipedia.org/wiki/" + this.currentPage);
        let responseBody = await result.text();

        this.parent.fillContent(JSON.parse(responseBody).response);

        //@ts-ignore
        for(let links = this.parent.iframeDoc.links, numLinks = links.length, i=0; i < numLinks; i ++) {
            links[i].onclick = (event) => {
                event.preventDefault();

                let clickedLink = "";
                for(let i = 0; i < event.path.length; i++) {
                    if(event.path[i].nodeName.toLowerCase() == "a") {
                        clickedLink = event.path[i].href;
                        break;
                    }
                }

                if(clickedLink != "") {
                    let newPage = clickedLink.replace("https://fr.wikipedia.org/wiki/", "");
                    newPage = decodeURI(newPage);
                    newPage = newPage.replaceAll('_', ' ');
                    
                    if(newPage == SaeGenerator.getInstance().endPage) {
                        alert('Gagné')
                    }

                    this.currentPage = newPage;
                    this.updateIframeContent();
                }
            }
        }
    }

    private loadingNewPageEnd = (event) => {
        this.parent.showLoading();
    }
}