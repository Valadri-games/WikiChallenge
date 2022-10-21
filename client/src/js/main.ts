class CePage extends HTMLElement {
    constructor() {
        super();

        this.setAttribute("page", "")
    }

    private _extends: any;
    private _name: string = "";

    public connectedCallback(): void {}

    public static get observedAttributes(): Array<string> {
        return ["name", "extends"];
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        //@ts-ignore
        this[name](newValue);
    }

    public name(value: string): void {
        this._name = value;
        PageNaviguator.getInstance().registerPage(this._name, this);
    }

    public extends(value: string): void {
        let object: Record<string, Object> = {
            "HomePage": HomePage,
            "SoloGamePage": SoloGamePage,
        }

        //@ts-ignore
        this._extends = new object[value]();
    }

    public open(): void {
        this.style.display = "block";
    }

    public close(): void {
        this.style.display = "none";
    }

    get child(): any {
        return this._extends;
    }
}

class PageNaviguator {
    private static _instance: PageNaviguator;

    public static getInstance(): PageNaviguator {
        if(!PageNaviguator._instance) PageNaviguator._instance = new PageNaviguator();
        return PageNaviguator._instance;
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
        if(this.pages[this.history[this.history.length - 1]].child.onClose) this.pages[this.history[this.history.length - 1]].child.onClose();
        this.pages[this.history[this.history.length - 1]].close();

        if(this.pages[pageName].child.onOpen) this.pages[pageName].child.onOpen();
        this.pages[pageName].open();

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

class HomePage {
    constructor() {
        
    }
}

class SoloGamePage {
    constructor() {
        
    }

    public onOpen(): void {
        console.log('test')
    }
}

async function main(): Promise<void> {
    customElements.define("ce-page", CePage);

    PageNaviguator.getInstance().updateLocation();
}

main();