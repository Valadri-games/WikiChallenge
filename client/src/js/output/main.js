import CePage from "./custom-element/ce-page.js";
import Router from "./managers/router.js";
import CeWebview from "./custom-element/ce-webview.js";
async function main() {
    customElements.define("ce-page", CePage);
    customElements.define("ce-webview", CeWebview);
    Router.getInstance().updateLocation();
}
main();
