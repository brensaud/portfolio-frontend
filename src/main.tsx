import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { AppProviders } from '@/app/providers'
import { router } from '@/routes'
import '@/styles/globals.css'

// Guard against a missing root element at startup rather than crashing silently.
const rootElement = document.getElementById('root')
if (!rootElement) {
  throw new Error(
    'Root element with id="root" not found. ' +
      'Ensure <div id="root"></div> exists in index.html.',
  )
}

createRoot(rootElement).render(
  <StrictMode>
    <AppProviders>
      <RouterProvider router={router} />
    </AppProviders>
  </StrictMode>,
)
