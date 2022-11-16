import Router from "../managers/router.js";
import CeRoot from "./ce-root.js";

export default class CePage extends CeRoot {
    public _extendPath = "../pages/";

    constructor() {
        super();

        this.setAttribute("page", "");
    }

    public name(value: string): void {
        //@ts-ignore
        this._name = value;
        //@ts-ignore
        Router.getInstance().registerPage(this._name, this);
    }

    public open(): void {
        this.style.display = "block";
    }

    public close(): void {
        this.style.display = "none";
    }
}