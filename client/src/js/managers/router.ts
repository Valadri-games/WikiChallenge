import CePage from "../custom-element/ce-page";

export default class Router {
    private static _instance: Router;

    public static getInstance(): Router {
        if(!Router._instance) Router._instance = new Router();
        return Router._instance;
    }
    constructor() {
        window.location.hash = '';
        this.bindNaviguationEvent();
    }

    private pages: Record<string, CePage> = {};
    private history: Array<string> = ["home-page"];

    private bindNaviguationEvent(): void {
        window.addEventListener('hashchange', (event) => {
            let destination = window.location.hash.slice(1);
            if(destination == "") destination = "home-page";
            
            this.goto(destination);
        });
    }

    public registerPage(name: string, object: CePage): void {
        this.pages[name] = object;
    }

    private goto(pageName: string): void {
        if(!this.pages[pageName]) {
            window.location.hash = '';
            return;
        }

        if(this.history[this.history.length - 1] != pageName) {
            if(this.pages[this.history[this.history.length - 1]].child.onClose) this.pages[this.history[this.history.length - 1]].child.onClose();
            this.pages[this.history[this.history.length - 1]].close();
        }
        
        if(this.pages[pageName]) {
            if(this.pages[pageName].child.onOpen) this.pages[pageName].child.onOpen();
            this.pages[pageName].open();
        }

        this.history.push(pageName);
    }

    public updateLocation(): void {
        let currentHash = window.location.hash.slice(1);
        if(currentHash != "") {
            if(this.history[this.history.length - 1] != currentHash) {
                this.goto(currentHash);
            }
        }
    }
}