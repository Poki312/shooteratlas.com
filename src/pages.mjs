import { page as index } from "./pages/index.mjs";
import { page as notFound } from "./pages/notfound.mjs";
import { page as wardogs } from "./pages/wardogs.mjs";
import { page as wardogsAchievements } from "./pages/wardogs-achievements.mjs";
import { page as wardogsReviews } from "./pages/wardogs-reviews.mjs";
import { page as wardogsEarlyAccess } from "./pages/wardogs-early-access.mjs";
import { page as wardogsReddit } from "./pages/wardogs-reddit.mjs";
import { page as wardogsPrice } from "./pages/wardogs-price.mjs";
import { page as about } from "./pages/about.mjs";
import { page as privacy } from "./pages/privacy.mjs";
import { page as contact } from "./pages/contact.mjs";

// Every page that should exist on the live site. 404 is rendered separately and
// deliberately kept out of the sitemap.
export const pages = [index, wardogs, wardogsAchievements, wardogsReviews, wardogsEarlyAccess, wardogsReddit, wardogsPrice, about, privacy, contact];
export { notFound };
