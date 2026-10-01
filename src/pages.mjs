import { page as index } from "./pages/index.mjs";
import { page as notFound } from "./pages/notfound.mjs";
import { page as wardogs } from "./pages/wardogs.mjs";
import { page as wardogsAchievements } from "./pages/wardogs-achievements.mjs";
import { page as wardogsReviews } from "./pages/wardogs-reviews.mjs";
import { page as wardogsEarlyAccess } from "./pages/wardogs-early-access.mjs";
import { page as wardogsReddit } from "./pages/wardogs-reddit.mjs";
import { page as wardogsPrice } from "./pages/wardogs-price.mjs";
import { page as wardogsReleaseDate } from "./pages/wardogs-release-date.mjs";
import { page as wardogsBattalion1944 } from "./pages/wardogs-battalion-1944.mjs";
import { page as wardogsBattalion1944Launch } from "./pages/wardogs-battalion-1944-launch.mjs";
import { page as wardogsLanguages } from "./pages/wardogs-languages.mjs";
import { page as wardogsGenres } from "./pages/wardogs-genres.mjs";
import { page as wardogsGameplay } from "./pages/wardogs-gameplay.mjs";
import { page as wardogsSteamDeck } from "./pages/wardogs-steam-deck.mjs";
import { page as about } from "./pages/about.mjs";
import { page as privacy } from "./pages/privacy.mjs";
import { page as contact } from "./pages/contact.mjs";

// Every page that should exist on the live site. 404 is rendered separately and
// deliberately kept out of the sitemap.
export const pages = [index, wardogs, wardogsAchievements, wardogsReviews, wardogsEarlyAccess, wardogsReddit, wardogsPrice, wardogsReleaseDate, wardogsBattalion1944, wardogsBattalion1944Launch, wardogsLanguages, wardogsGenres, wardogsGameplay, wardogsSteamDeck, about, privacy, contact];
export { notFound };
