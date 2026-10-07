import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"

// full-width site header (rendered outside the 3-column grid in renderPage.tsx)
const Header: QuartzComponent = ({ children }: QuartzComponentProps) => {
  return children.length > 0 ? <header class="site-header">{children}</header> : null
}

Header.css = `
header.site-header {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  height: var(--site-nav-h);
  background-color: var(--light);
  border-bottom: 1px solid var(--lightgray);
}
`

export default (() => Header) satisfies QuartzComponentConstructor
