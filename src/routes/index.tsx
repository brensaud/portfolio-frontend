import { createBrowserRouter, type RouteObject } from 'react-router-dom'
import { RootLayout } from '@/components/layout/root-layout'
import { RootErrorBoundary } from '@/components/layout/error-boundary'
import { HomePage } from '@/pages/home-page'
import { AboutPage } from '@/pages/about-page'
import { ProjectsPage } from '@/pages/projects-page'
import { ProjectDetailPage } from '@/pages/project-detail-page'
import { EngineeringPage } from '@/pages/engineering-page'
import { BlogPage } from '@/pages/blog-page'
import { ResumePage } from '@/pages/resume-page'
import { ContactPage } from '@/pages/contact-page'
import { NotFoundPage } from '@/pages/not-found-page'

/**
 * Route definitions exported separately so test utilities can create a
 * MemoryRouter with the same route tree (src/test/utils.tsx).
 *
 * Naming convention for child paths: no leading slash (React Router v7 convention
 * for nested routes). The ROUTES constants (which have leading slashes) are used
 * in <Link> and <NavLink> components — not here.
 *
 * errorElement: RootErrorBoundary handles React Router-level errors (loader
 * failures, thrown responses). Render-time component crashes are caught by the
 * <ErrorBoundary> class component wrapped around individual subtrees.
 */
export const routes: RouteObject[] = [
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RootErrorBoundary />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'work', element: <ProjectsPage /> },
      { path: 'work/:slug', element: <ProjectDetailPage /> },
      { path: 'engineering', element: <EngineeringPage /> },
      { path: 'writing', element: <BlogPage /> },
      { path: 'resume', element: <ResumePage /> },
      { path: 'contact', element: <ContactPage /> },
      // Catch-all: handles any path not matched by the routes above
      { path: '*', element: <NotFoundPage /> },
    ],
  },
]

export const router = createBrowserRouter(routes)
