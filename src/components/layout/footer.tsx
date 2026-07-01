import { Link } from 'react-router-dom'
import { FOOTER_LINKS } from '@/constants/navigation'
import { ROUTES } from '@/constants/routes'
import { SITE_META } from '@/constants/site'

/**
 * Footer — persistent site footer.
 *
 * Phase 1 scope:
 * - Site name + tagline
 * - Navigation link groups
 * - Social links (GitHub, LinkedIn)
 * - Copyright line
 *
 * Phase 2 additions:
 * - RSS feed link
 */
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-5xl px-6 py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:justify-between">
          {/* Brand column */}
          <div className="flex flex-col gap-3">
            <Link
              to={ROUTES.HOME}
              className="text-sm font-semibold text-text-primary transition-colors hover:text-accent"
            >
              {SITE_META.name}
            </Link>
            <p className="max-w-[240px] text-sm text-text-secondary">{SITE_META.tagline}</p>

            {/* Social links */}
            <div className="mt-1 flex items-center gap-4">
              <a
                href={SITE_META.github}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-tertiary transition-colors hover:text-text-secondary"
                aria-label="GitHub profile"
              >
                GitHub
              </a>
              <a
                href={SITE_META.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-text-tertiary transition-colors hover:text-text-secondary"
                aria-label="LinkedIn profile"
              >
                LinkedIn
              </a>
            </div>
          </div>

          {/* Navigation groups */}
          {FOOTER_LINKS.map((group) => (
            <div key={group.group} className="flex flex-col gap-3">
              <p className="text-xs font-medium uppercase tracking-wider text-text-muted">
                {group.group}
              </p>
              <ul role="list" className="flex flex-col gap-2">
                {group.links.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-sm text-text-secondary transition-colors hover:text-text-primary"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-10 border-t border-border-subtle pt-6">
          <p className="text-xs text-text-muted">
            © {currentYear} {SITE_META.name}. Built with React, TypeScript, and Tailwind CSS.
          </p>
        </div>
      </div>
    </footer>
  )
}
