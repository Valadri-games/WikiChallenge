import CeRoot from "./ce-root.js";

export default class CeWebview extends CeRoot {
    private iframe: any;
    private iframeWindow: any;
    private iframeDoc: any;

    public _extendPath = "../components/";

    constructor() {
        super();

        //@ts-ignore
        this.iframe = this.querySelector('iframe');
        this.iframeWindow = this.iframe.contentWindow;
        this.iframeDoc = this.iframeWindow.document;
    }

    public showLoading() {
        console.log('show loading');
        this.iframe.style.display = "none";
    }

    public hideLoading() {
        console.log('hide loading');
        this.iframe.style.display = "block";
    }

    public fillContent(content) {
        content = content.replaceAll('src="//', 'src="https://');
        content = content.replaceAll('src="/', 'src="https://fr.wikipedia.org/');
        content = content.replaceAll('href="//', 'href="https://');
        content = content.replaceAll('href="/', 'href="https://fr.wikipedia.org/');

        //@ts-ignore
        this.iframeDoc.open();
        this.iframeDoc.write(content);
        this.iframeDoc.close();
    }
}