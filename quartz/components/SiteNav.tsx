import { concatenateResources } from "../util/resources"
import { pathToRoot, resolveRelative, SimpleSlug } from "../util/path"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { i18n } from "../i18n"
import style from "./styles/siteNav.scss"

interface NavLink {
  label: string
  // "/" for home, otherwise a slug such as "about" or "tags/diary"
  slug: string
  // extra slug prefixes that also mark this link as active (e.g. "Diary" folder)
  match?: string[]
  // draw a vertical divider before this link (e.g. to set tag pages apart)
  dividerBefore?: boolean
}

type SiteNavConfig = {
  links: NavLink[]
  // extra components (search, darkmode, ...) placed at the right edge
  components?: QuartzComponent[]
}

export default ((config: SiteNavConfig) => {
  const components = config.components ?? []

  const SiteNav: QuartzComponent = (props: QuartzComponentProps) => {
    const { fileData, cfg } = props
    const current = fileData.slug!
    const title = cfg?.pageTitle ?? i18n(cfg.locale).propertyDefaults.title

    const isActive = (link: NavLink) => {
      if (link.slug === "/") return current === "index"
      return [link.slug, ...(link.match ?? [])].some(
        (s) => current === s || current.startsWith(s + "/"),
      )
    }

    return (
      <nav class="site-nav">
        <a class="site-nav-title" href={pathToRoot(current)}>
          {title}
        </a>
        <ul class="site-nav-links">
          {config.links.map((link) => (
            <li class={link.dividerBefore ? "divider-before" : ""}>
              <a
                class={isActive(link) ? "active" : ""}
                href={
                  link.slug === "/"
                    ? pathToRoot(current)
                    : resolveRelative(current, link.slug as SimpleSlug)
                }
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <div class="site-nav-tools">
          {components.map((C) => (
            <C {...props} />
          ))}
        </div>
      </nav>
    )
  }

  SiteNav.afterDOMLoaded = concatenateResources(...components.map((c) => c.afterDOMLoaded))
  SiteNav.beforeDOMLoaded = concatenateResources(...components.map((c) => c.beforeDOMLoaded))
  SiteNav.css = concatenateResources(style, ...components.map((c) => c.css))

  return SiteNav
}) satisfies QuartzComponentConstructor<SiteNavConfig>
