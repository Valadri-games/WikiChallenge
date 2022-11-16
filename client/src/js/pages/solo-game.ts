import SaeGenerator from "../managers/sae-generator.js";
import CePage from "../custom-element/ce-page.js";

export default class SoloGamePage {
    private parent: CePage;
    private hooks: any;

    constructor(parent: CePage, hooks: Record<string, any>) {
        this.parent = parent;
        this.hooks = hooks;
        
        this.hooks.updateStartPage.value = () => { this.updateSaEPages(true, false); }
        this.hooks.updateEndPage.value = () => { this.updateSaEPages(false, true); }
    }

    public async onOpen(): Promise<void> {
        this.updateSaEPages(true, true);
    }

    public async updateSaEPages(updateStart: boolean, updateEnd: boolean): Promise<boolean> {
        if(updateStart) this.hooks.pageStartText.value = "chargement ...";
        if(updateEnd) {
            this.hooks.pageEndText.value = "chargement ...";
            this.parent.triggerEvent('loadingNewPageEnd', {});
        }

        let result = await SaeGenerator.getInstance().generateNew({
            lang: "fr",
            start: updateStart,
            end: updateEnd,
        });

        if(!result.success) {
            // ------> do something if request api fail
            return false;
        }

        if(updateStart) this.hooks.pageStartText.value = result.start;
        if(updateEnd) {
            this.hooks.pageEndText.value = result.end;
            this.parent.triggerEvent('pageEndUpdate', {});
        }

        return true;
    }

    private test() {
        fetch("http://localhost:3000/?query=https://fr.wikipedia.org/wiki/Ananas").then((data) => {
            return data.text();
        }).then((content) => {
            let test = JSON.parse(content).response
            test = test.replaceAll('src="//', 'src="https://')
            test = test.replaceAll('src="/', 'src="https://fr.wikipedia.org/')
            test = test.replaceAll('href="//', 'href="https://')
            test = test.replaceAll('href="/', 'href="https://fr.wikipedia.org/')

            //@ts-ignore
            let iframeDoc = document.getElementById('testnameid').contentWindow.document;
            iframeDoc.open();
            iframeDoc.write(test);
            iframeDoc.close();
            
            //@ts-ignore
            for (var ls = document.getElementById('testnameid').contentWindow.document.links, numLinks = ls.length, i=0; i < numLinks; i ++) {
                ls[i].onclick = (event) => {
                    event.preventDefault();
        
                    console.count('test has')
                }
            }
        }).catch(() => {
            console.log("error");
        });
    }

    private testload(event) {
        console.log(event.path[0].contentWindow.document)
    }
}