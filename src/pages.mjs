import { page as index } from "./pages/index.mjs";
import { page as notFound } from "./pages/notfound.mjs";
import { page as wardogs } from "./pages/wardogs.mjs";

// Every page that should exist on the live site. 404 is rendered separately and
// deliberately kept out of the sitemap.
export const pages = [index, wardogs];
export { notFound };
