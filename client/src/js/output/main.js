"use strict";
class CePage extends HTMLElement {
    constructor() {
        super();
        this.setAttribute("page", "");
    }
    _extends;
    _name = "";
    connectedCallback() { }
    static get observedAttributes() {
        return ["name", "extends"];
    }
    attributeChangedCallback(name, oldValue, newValue) {
        this[name](newValue);
    }
    name(value) {
        this._name = value;
        PageNaviguator.getInstance().registerPage(this._name, this);
    }
    extends(value) {
        let object = {
            "HomePage": HomePage,
            "SoloGamePage": SoloGamePage,
        };
        this._extends = new object[value]();
    }
    open() {
        this.style.display = "block";
    }
    close() {
        this.style.display = "none";
    }
    get child() {
        return this._extends;
    }
}
class PageNaviguator {
    static _instance;
    static getInstance() {
        if (!PageNaviguator._instance)
            PageNaviguator._instance = new PageNaviguator();
        return PageNaviguator._instance;
    }
    constructor() {
        window.location.hash = '';
        this.bindNaviguationEvent();
    }
    pages = {};
    history = ["home-page"];
    bindNaviguationEvent() {
        window.addEventListener('hashchange', (event) => {
            let destination = window.location.hash.slice(1);
            if (destination == "")
                destination = "home-page";
            this.goto(destination);
        });
    }
    registerPage(name, object) {
        this.pages[name] = object;
    }
    goto(pageName) {
        if (this.pages[this.history[this.history.length - 1]].child.onClose)
            this.pages[this.history[this.history.length - 1]].child.onClose();
        this.pages[this.history[this.history.length - 1]].close();
        if (this.pages[pageName].child.onOpen)
            this.pages[pageName].child.onOpen();
        this.pages[pageName].open();
        this.history.push(pageName);
    }
    updateLocation() {
        let currentHash = window.location.hash.slice(1);
        if (currentHash != "") {
            if (this.history[this.history.length - 1] != currentHash) {
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
    onOpen() {
        console.log('test');
    }
}
async function main() {
    customElements.define("ce-page", CePage);
    PageNaviguator.getInstance().updateLocation();
}
main();
