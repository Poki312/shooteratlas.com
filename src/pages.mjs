import { page as index } from "./pages/index.mjs";
import { page as notFound } from "./pages/notfound.mjs";

// Every page that should exist on the live site. 404 is rendered separately and
// deliberately kept out of the sitemap.
export const pages = [index];
export { notFound };
