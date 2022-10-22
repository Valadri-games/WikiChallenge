import Router from "../componenents/router.js";
import HomePage from "../pages/home.js";
import SoloGamePage from "../pages/solo-game.js";

export default class CePage extends HTMLElement {
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
        Router.getInstance().registerPage(this._name, this);
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