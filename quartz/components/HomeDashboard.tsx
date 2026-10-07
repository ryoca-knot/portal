import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { resolveRelative } from "../util/path"
import { byDateAndAlphabetical } from "./PageList"
import { Date, getDate } from "./Date"
import { EVENTS_SLUG, LINKS_SLUG } from "./siteData"
import style from "./styles/homeDashboard.scss"

interface Options {
  limit: number
  // pages never shown in the "latest posts" list
  exclude: string[]
}

const defaultOptions: Options = {
  limit: 6,
  exclude: ["index", "about", "trifourlium", LINKS_SLUG, EVENTS_SLUG],
}

// Home: latest posts as a multi-column list (title + updated date)
export default ((userOpts?: Partial<Options>) => {
  const opts = { ...defaultOptions, ...userOpts }

  const HomeDashboard: QuartzComponent = ({
    fileData,
    allFiles,
    cfg,
    displayClass,
  }: QuartzComponentProps) => {
    const current = fileData.slug!
    const latest = allFiles
      .filter((f) => !opts.exclude.includes(f.slug ?? ""))
      .sort(byDateAndAlphabetical(cfg))
      .slice(0, opts.limit)

    return (
      <section class={classNames(displayClass, "home-latest")}>
        <h2 class="home-heading">最新の記事</h2>
        <ul class="post-cards">
          {latest.map((page) => {
            const date = page.dates ? getDate(cfg, page) : undefined
            return (
              <li class="post-card">
                <a class="post-card-title internal" href={resolveRelative(current, page.slug!)}>
                  {page.frontmatter?.title}
                </a>
                {date && (
                  <span class="post-card-date">
                    <Date date={date} locale={cfg.locale} />
                  </span>
                )}
              </li>
            )
          })}
        </ul>
      </section>
    )
  }

  HomeDashboard.css = style
  return HomeDashboard
}) satisfies QuartzComponentConstructor
