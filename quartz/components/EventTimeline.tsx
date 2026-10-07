import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { classNames } from "../util/lang"
import { formatEventDate, readEvents, SiteEvent, splitEvents } from "./siteData"
import style from "./styles/eventTimeline.scss"

export function EventItem({ event }: { event: SiteEvent }) {
  return (
    <li class="event-item">
      <span class="event-date">{formatEventDate(event.date)}</span>
      <div class="event-body">
        <span class="event-title">
          {event.url ? (
            <a href={event.url} class="external" target="_blank" rel="noopener noreferrer">
              {event.title}
            </a>
          ) : (
            event.title
          )}
        </span>
        <span class="event-meta">
          {event.role && <span class="event-role">{event.role}</span>}
          {event.venue && <span class="event-venue">@ {event.venue}</span>}
        </span>
        {event.note && <span class="event-note">{event.note}</span>}
      </div>
    </li>
  )
}

// Renders the `events:` frontmatter array of the current page as a timeline
export default (() => {
  const EventTimeline: QuartzComponent = ({ fileData, displayClass }: QuartzComponentProps) => {
    const events = readEvents(fileData)
    const { upcoming, past } = splitEvents(events)

    // group past events by year (already sorted newest first)
    const byYear = new Map<string, SiteEvent[]>()
    for (const e of past) {
      const year = e.date.slice(0, 4)
      byYear.set(year, [...(byYear.get(year) ?? []), e])
    }

    return (
      <div class={classNames(displayClass, "event-timeline")}>
        <p class="event-summary">
          出演 {past.length} 回 / 今後の予定 {upcoming.length} 件
        </p>

        <h2>今後の予定</h2>
        {upcoming.length > 0 ? (
          <ul class="event-list upcoming">
            {upcoming.map((e) => (
              <EventItem event={e} />
            ))}
          </ul>
        ) : (
          <p class="event-empty">いまのところ予定はありません。</p>
        )}

        <h2>過去の出演</h2>
        {past.length === 0 && <p class="event-empty">随時更新します、お待ちください。</p>}
        {[...byYear.entries()].map(([year, items]) => (
          <section class="event-year">
            <h3>
              {year} <span class="event-count">{items.length}件</span>
            </h3>
            <ul class="event-list">
              {items.map((e) => (
                <EventItem event={e} />
              ))}
            </ul>
          </section>
        ))}
      </div>
    )
  }

  EventTimeline.css = style
  return EventTimeline
}) satisfies QuartzComponentConstructor
