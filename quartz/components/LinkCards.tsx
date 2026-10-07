import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { Icon } from "./icons"
import { readLinks } from "./siteData"
import style from "./styles/linkCards.scss"

// Renders the `links:` frontmatter array of the current page as cards
export default (() => {
  const LinkCards: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const links = readLinks(fileData)
    if (links.length === 0) return null

    return (
      <div class={classNames(displayClass, "link-cards")}>
        {links.map((link) => {
          const inner = (
            <>
              <span class="link-card-icon">
                <Icon name={link.icon} size={22} />
              </span>
              <span class="link-card-body">
                <span class="link-card-label">{link.label}</span>
                {link.note && <span class="link-card-note">{link.note}</span>}
              </span>
            </>
          )
          // entries without a url (Discord ID, obfuscated mail) are shown as plain cards
          return link.url ? (
            <a class="link-card external" href={link.url} target="_blank" rel="noopener noreferrer">
              {inner}
            </a>
          ) : (
            <div class="link-card">{inner}</div>
          )
        })}
      </div>
    )
  }

  LinkCards.css = style
  return LinkCards
}) satisfies QuartzComponentConstructor
