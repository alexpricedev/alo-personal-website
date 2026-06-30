import { initNav } from "@client/components/nav";
import { initializePage, registerPage } from "@client/page-lifecycle";
import { init as initHome } from "@client/pages/home";

registerPage("home", { init: initHome });

initNav();
initializePage(document.body.dataset.page);
