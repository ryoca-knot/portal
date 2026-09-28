// import { QuartzConfig } from "./quartz/cfg"
// import * as Plugin from "./quartz/plugins"

// /**
//  * Quartz 4 Configuration
//  *
//  * See https://quartz.jzhao.xyz/configuration for more information.
//  */
// const config: QuartzConfig = {
//   configuration: {
//     pageTitle: "RyoCa Pages",
//     pageTitleSuffix: "",
//     enableSPA: true,
//     enablePopovers: true,
//     analytics: {
//       provider: "plausible",
//     },
//     locale: "en-US",
//     baseUrl: "quartz.jzhao.xyz",
//     ignorePatterns: ["private", "templates", ".obsidian"],
//     defaultDateType: "modified",
//     theme: {
//       fontOrigin: "googleFonts",
//       cdnCaching: true,
//       typography: {
//         header: "Schibsted Grotesk",
//         body: "Source Sans Pro",
//         code: "IBM Plex Mono",
//       },
//       colors: {
//         lightMode: {
//           light: "#faf8f8",
//           lightgray: "#e5e5e5",
//           gray: "#b8b8b8",
//           darkgray: "#4e4e4e",
//           dark: "#2b2b2b",
//           secondary: "#284b63",
//           tertiary: "#84a59d",
//           highlight: "rgba(143, 159, 169, 0.15)",
//           textHighlight: "#fff23688",
//         },
//         darkMode: {
//           light: "#161618",
//           lightgray: "#393639",
//           gray: "#646464",
//           darkgray: "#d4d4d4",
//           dark: "#ebebec",
//           secondary: "#7b97aa",
//           tertiary: "#84a59d",
//           highlight: "rgba(143, 159, 169, 0.15)",
//           textHighlight: "#b3aa0288",
//         },
//       },
//     },
//   },
//   plugins: {
//     transformers: [
//       Plugin.FrontMatter(),
//       Plugin.HardLineBreaks(),
//       Plugin.CreatedModifiedDate({
//         priority: ["frontmatter", "git", "filesystem"],
//       }),
//       Plugin.SyntaxHighlighting({
//         theme: {
//           light: "github-light",
//           dark: "github-dark",
//         },
//         keepBackground: false,
//       }),
//       Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
//       Plugin.GitHubFlavoredMarkdown(),
//       Plugin.TableOfContents(),
//       Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
//       Plugin.Description(),
//       Plugin.Latex({ renderEngine: "katex" }),
//     ],
//     filters: [Plugin.RemoveDrafts()],
//     emitters: [
//       Plugin.AliasRedirects(),
//       Plugin.ComponentResources(),
//       Plugin.ContentPage(),
//       Plugin.FolderPage(),
//       Plugin.TagPage(),
//       Plugin.ContentIndex({
//         enableSiteMap: true,
//         enableRSS: true,
//       }),
//       Plugin.Assets(),
//       Plugin.Static(),
//       Plugin.Favicon(),
//       Plugin.NotFoundPage(),
//       // Comment out CustomOgImages to speed up build time
//       Plugin.CustomOgImages(),
//     ],
//   },
// }

// export default config

import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "RyoCa Pages",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "quartz.jzhao.xyz",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Schibsted Grotesk",
        body: "Source Sans Pro",
        code: "IBM Plex Mono",
      },
      colors: {
        lightMode: {
          light: "#eaefef",         // 1段目：ページ全体の背景色（明るいアイスグレー）
          lightgray: "#bfc9d1",     // 2段目：枠線・検索窓・コードブロック背景（ライトスレート）
          gray: "#6c7d8a",          // メタ情報・作成日時などのサブテキスト
          darkgray: "#25343f",      // 3段目：本文のテキスト色（ダークスレート）
          dark: "#17232b",          // 見出し（h1, h2等）や太字の強調色
          secondary: "#d18143",     // 4段目：リンク色・ページタイトル・アクセント（オレンジ）
          tertiary: "#e07e36",      // リンクやタグのホバー（押し込み）時
          highlight: "rgba(255, 155, 81, 0.15)", // 内部リンク等の薄い強調背景
          textHighlight: "#ff9b5144",            // テキストハイライト（マーカー）色
        },
        darkMode: {
          light: "#25343f",         // 3段目：ダークモード背景（ダークスレート）
          lightgray: "#354754",     // 枠線・検索窓・コードブロック背景
          gray: "#8597a5",          // メタ情報・サブテキスト
          darkgray: "#bfc9d1",      // 2段目：本文テキスト（ライトスレート）
          dark: "#eaefef",          // 1段目：見出し・強調テキスト（明るいアイスグレー）
          secondary: "#ff9b51",     // 4段目：リンク色・アクセント（オレンジ）
          tertiary: "#ffb076",      // ホバー時の明るいオレンジ
          highlight: "rgba(255, 155, 81, 0.15)",
          textHighlight: "#ff9b5144",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.HardLineBreaks(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
      Plugin.AutoCardLinkRenderer(),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config