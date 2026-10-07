import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"
import ChangeLog from "./quartz/components/ChangeLog"
import PageViewers from "./quartz/components/PageViewers"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  // full-width navigation bar at the top of every page
  header: [
    Component.SiteNav({
      links: [
        { label: "Home", slug: "/" },
        { label: "About", slug: "about" },
        { label: "出演履歴", slug: "events" },
        { label: "Links", slug: "links" },
        { label: "Diary", slug: "tags/diary", match: ["Diary"], dividerBefore: true },
        { label: "Music", slug: "tags/music", match: ["NowListening"] },
      ],
      components: [Component.Search(), Component.Darkmode(), Component.ReaderMode()],
    }),
  ],
  afterBody: [],
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
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
    PageViewers(),
  ],
  left: [recentNotes, Component.Explorer(), Component.DesktopOnly(Component.Graph())],
  right: [
    // the left sidebar collapses into a top bar on mobile, so keep the graph here there
    Component.MobileOnly(Component.Graph()),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
  afterBody: [
    ChangeLog(),
    //LikeButton(),

  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [recentNotes, Component.Explorer()],
  right: [],
}
