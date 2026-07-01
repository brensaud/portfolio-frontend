import { ROUTES } from './routes'

/**
 * Primary navigation items rendered in the Navbar.
 * Order determines the display order in the nav.
 */
export const NAV_ITEMS = [
  { label: 'Work', path: ROUTES.WORK },
  { label: 'Writing', path: ROUTES.WRITING },
  { label: 'Engineering', path: ROUTES.ENGINEERING },
  { label: 'Resume', path: ROUTES.RESUME },
  { label: 'About', path: ROUTES.ABOUT },
] as const

export type NavItem = (typeof NAV_ITEMS)[number]

/**
 * Footer link groups rendered in the site footer.
 */
export const FOOTER_LINKS = [
  {
    group: 'Pages',
    links: [
      { label: 'Work', path: ROUTES.WORK },
      { label: 'Writing', path: ROUTES.WRITING },
      { label: 'Engineering', path: ROUTES.ENGINEERING },
      { label: 'About', path: ROUTES.ABOUT },
      { label: 'Resume', path: ROUTES.RESUME },
      { label: 'Contact', path: ROUTES.CONTACT },
    ],
  },
] as const
