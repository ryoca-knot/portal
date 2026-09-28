import { QuartzTransformerPlugin } from "../types"
import { Root, Html } from "mdast"
import { visit } from "unist-util-visit"
import yaml from "js-yaml"

interface CardLinkData {
  url?: string
  title?: string
  description?: string
  host?: string
  favicon?: string
  image?: string
}

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")

const hostnameOf = (url: string) => {
  try {
    return new URL(url).hostname
  } catch {
    return url
  }
}

function renderCard(data: CardLinkData & { url: string }): string {
  const url = escapeHtml(data.url)
  const title = escapeHtml(data.title || data.url)
  const host = escapeHtml(data.host || hostnameOf(data.url))
  const description = data.description
    ? `<div class="auto-card-link-description">${escapeHtml(data.description)}</div>`
    : ""
  const favicon = data.favicon
    ? `<img class="auto-card-link-favicon" src="${escapeHtml(data.favicon)}" alt="" loading="lazy">`
    : ""
  const thumbnail = data.image
    ? `<div class="auto-card-link-thumbnail"><img src="${escapeHtml(data.image)}" alt="" loading="lazy"></div>`
    : ""

  return `<div class="auto-card-link-container"><a class="auto-card-link-card" href="${url}" target="_blank" rel="noopener noreferrer"><div class="auto-card-link-main"><div class="auto-card-link-title">${title}</div>${description}<div class="auto-card-link-host">${favicon}<span>${host}</span></div></div>${thumbnail}</a></div>`
}

export const AutoCardLinkRenderer: QuartzTransformerPlugin = () => {
  return {
    name: "AutoCardLinkRenderer",
    markdownPlugins() {
      return [
        () => {
          return (tree: Root) => {
            visit(tree, "code", (node, index, parent) => {
              if (node.lang !== "cardlink" || !parent || typeof index !== "number") return

              let data: CardLinkData
              try {
                data = (yaml.load(node.value) ?? {}) as CardLinkData
              } catch {
                return
              }
              if (typeof data !== "object" || !data.url) return

              const html: Html = {
                type: "html",
                value: renderCard({ ...data, url: String(data.url) }),
              }
              parent.children.splice(index, 1, html)
            })
          }
        },
      ]
    },
  }
}
