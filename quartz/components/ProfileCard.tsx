import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { joinSegments, pathToRoot } from "../util/path"
import { Icon } from "./icons"
import { findPage, LINKS_SLUG, readLinks } from "./siteData"
import style from "./styles/profileCard.scss"

// Home hero card. Reads name / reading / bio / avatar / badges from the current page's
// frontmatter and the SNS buttons from links.md.
export default (() => {
  const ProfileCard: QuartzComponent = ({
    fileData,
    allFiles,
    cfg,
    displayClass,
  }: QuartzComponentProps) => {
    const fm = (fileData.frontmatter ?? {}) as Record<string, unknown>
    const name = (fm.name as string | undefined) ?? cfg.pageTitle
    const reading = fm.reading as string | undefined
    const bio = fm.bio as string | undefined
    const badges = Array.isArray(fm.badges) ? (fm.badges as string[]) : []
    const avatar = joinSegments(
      pathToRoot(fileData.slug!),
      (fm.avatar as string | undefined) ?? "static/icon.png",
    )
    const links = readLinks(findPage(allFiles, LINKS_SLUG)).filter((l) => l.url)

    return (
      <section class={classNames(displayClass, "profile-card")}>
        <img class="profile-avatar" src={avatar} alt={name} />
        <div class="profile-body">
          <h1 class="profile-name">
            {name}
            {reading && <span class="profile-reading">{reading}</span>}
          </h1>
          {bio && <p class="profile-bio">{bio}</p>}
          {badges.length > 0 && (
            <ul class="profile-badges">
              {badges.map((b) => (
                <li>{b}</li>
              ))}
            </ul>
          )}
          {links.length > 0 && (
            <ul class="profile-sns">
              {links.map((l) => (
                <li>
                  <a
                    href={l.url}
                    class="external"
                    target="_blank"
                    rel="noopener noreferrer"
                    title={l.label}
                    aria-label={l.label}
                  >
                    <Icon name={l.icon} size={18} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    )
  }

  ProfileCard.css = style
  return ProfileCard
}) satisfies QuartzComponentConstructor
