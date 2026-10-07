import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import ChangeLog from "./quartz/components/ChangeLog"
import PageViewers from "./quartz/components/PageViewers"

const isSlug = (slug: string) => (page: { fileData: { slug?: string } }) =>
  page.fileData.slug === slug

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  // full-width navigation bar at the top of every page
  header: [
    Component.SiteNav({
      links: [
        { label: "Home", slug: "/" },
        { label: "About", slug: "about" },
        { label: "Links", slug: "links" },
        { label: "Event", slug: "events" },
        { label: "Diary", slug: "tags/diary", match: ["Diary"], dividerBefore: true },
        { label: "Music", slug: "tags/music", match: ["NowListening"] },
      ],
      components: [Component.Search(), Component.Darkmode(), Component.ReaderMode()],
    }),
  ],
  // PageLayout has no afterBody, so page-specific widgets live here behind ConditionalRender
  afterBody: [
    Component.ConditionalRender({
      component: Component.HomeDashboard(),
      condition: isSlug("index"),
    }),
    Component.ConditionalRender({
      component: Component.EventTimeline(),
      condition: isSlug("events"),
    }),
    ChangeLog(),
    //LikeButton(),
  ],
  footer: Component.Footer({
    links: {
      X: "https://x.com/ryoca_knot",
      Twitch: "https://www.twitch.tv/ryoca_knot",
      Mixcloud: "https://www.mixcloud.com/hanazono/",
    },
  }),
}

// latest 3 updated notes shown in the left sidebar
const recentNotes = Component.RecentNotes({
  title: "Recent Updates",
  limit: 3,
  showTags: false,
  filter: (f) => f.slug !== "index",
})

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    // the profile card replaces the title / meta on the home page
    Component.ConditionalRender({ component: Component.ProfileCard(), condition: isSlug("index") }),
    Component.ConditionalRender({
      component: Component.ArticleTitle(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.ContentMeta(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.TagList(),
    PageViewers(),
    Component.ConditionalRender({ component: Component.LinkCards(), condition: isSlug("links") }),
  ],
  left: [
    // no "Recent Updates" on the home page (it already lists the latest posts)
    Component.ConditionalRender({
      component: recentNotes,
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.Explorer(),
    Component.DesktopOnly(Component.Graph()),
  ],
  right: [
    // the left sidebar collapses into a top bar on mobile, so keep the graph here there
    Component.MobileOnly(Component.Graph()),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [recentNotes, Component.Explorer()],
  right: [],
}
