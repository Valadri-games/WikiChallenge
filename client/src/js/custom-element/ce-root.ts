export default class CeRoot extends HTMLElement {
    private varBindedTree: any;

    private _name: string = "";
    private _parent: any;
    private _extends: any;

    constructor() {
        super();

        this.varBindedTree = this.bindVars(this, {});

        //@ts-ignore
        if(this["ce-parent"]) this._parent = this["ce-parent"];
    }

    public connectedCallback(): void {}

    public static get observedAttributes(): Array<string> {
        return ["ce-name", "ce-extends"];
    }

    public attributeChangedCallback(name: string, oldValue: string, newValue: string): void {
        this[name.split('-')[1]](newValue);
    }

    private bindVars(node: Node, bindedVars: any = {}) {
        let newBindedVars = {};
        if(bindedVars) newBindedVars = bindedVars;

        if(!['iframe'].includes(node.nodeName.toLocaleLowerCase())) {
            let childs = node.childNodes;
            for(let i = 0; i < childs.length; i++) {
                if(childs[i].nodeName.includes('#')) continue;

                if(childs[i].nodeName.includes('-')) {
                    childs[i]["ce-parent"] = this;
                }
                
                newBindedVars = this.bindVars(childs[i], newBindedVars);
            }
        }

        //@ts-ignore
        let attribs = node.getAttributeNames();
        for(let i = 0; i < attribs.length; i++) {
            let attribParts = attribs[i].split('-')
            if(!attribParts.includes('bind')) continue;

            //@ts-ignore
            newBindedVars[node.getAttribute(attribs[i]).trim()] = new Proxy({
                value: "",
                bindingType: attribParts.slice(1),
                node: node,
            }, {
                get: (target, property) => {
                    return target[property];
                },

                set: (target, property, value) => {
                    target[property] = value;
                    this["bind" + target.bindingType[0].charAt(0).toUpperCase() + target.bindingType[0].slice(1)](target["node"], target["value"], target["bindingType"]);
                    return true;
                }
            });
        }

        return newBindedVars;
    }

    private extends(value: string): void {
        //@ts-ignore
        import(this._extendPath + value + ".js").then((module) => {
            //@ts-ignore
            this._extends = new module.default(this, this.varBindedTree);
        })
        .catch((error) => {
            console.log("Error importing module", error);
        });
    }

    private bindContent(node: any, value: any) {
        node.innerHTML = value;
    }

    private bindSrc(node: any, value: any) {
        node.src = value;
    }

    private bindEvent(node: any, value: any, bindingType: any) {
        node.addEventListener(bindingType[1], value);
    }

    private bindStyle(node: any, value: any, bindingType: any) {
        node.style[bindingType[1]] = value;
    }

    private bindClass(node: any, value: any, bindingType: any) {
        let className = bindingType[1];
        for(let i = 2; i < bindingType.length; i++) {
            className += "-" + bindingType[i];
        }

        if(value == true) node.classList.add(className);
        else node.classList.remove(className);
    }

    public triggerEvent(eventName, eventParams) {
        const event = new CustomEvent(eventName, eventParams);
        document.body.dispatchEvent(event);
    }

    public listenEvent(eventName, eventCallback) {
        document.body.addEventListener(eventName, eventCallback);
    }

    get child(): any {
        //@ts-ignore
        return this._extends;
    }
}