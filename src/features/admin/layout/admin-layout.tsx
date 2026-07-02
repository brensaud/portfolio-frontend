/**
 * AdminLayout — shell for all protected admin pages.
 *
 * Renders the AdminNav at the top and the active child route via <Outlet>.
 * This component itself is always rendered inside <RequireAdmin>, so by
 * the time it mounts the user is guaranteed to be authenticated.
 *
 * Structure:
 *   <div full-height>
 *     <AdminNav />          ← sticky header
 *     <main>
 *       <Outlet />          ← active admin page
 *     </main>
 *   </div>
 */

import { Outlet } from 'react-router-dom'
import { AdminNav } from './admin-nav'

export function AdminLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <AdminNav />
      <main
        id="admin-main"
        className="flex flex-1 flex-col"
        tabIndex={-1}
      >
        <Outlet />
      </main>
    </div>
  )
}
