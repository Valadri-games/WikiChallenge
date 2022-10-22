import CePage from "custom-element/ce-page.js";
import Router from "./componenents/router";

async function main(): Promise<void> {
    customElements.define("ce-page", CePage);

    Router.getInstance().updateLocation();
}

main();