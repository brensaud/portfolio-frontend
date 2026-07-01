/**
 * project-architecture-page.tsx — /projects/:slug/architecture
 *
 * Renders the interactive architecture explorer for a specific project.
 *
 * Layout (desktop):
 *   ┌─────────────────────────────────────────────────────────┐
 *   │  Hero: project name, tagline, metadata tags             │
 *   ├────────────────────────────┬────────────────────────────┤
 *   │  View tabs                 │  (side panel when open)    │
 *   ├────────────────────────────┤                            │
 *   │  Canvas / Flow / Deploy    │                            │
 *   ├────────────────────────────┴────────────────────────────┤
 *   │  Engineering decisions (full width)                     │
 *   └─────────────────────────────────────────────────────────┘
 *
 * The side panel takes up a fixed 380px column on the right. When no node
 * is selected, the canvas uses the full width.
 *
 * Accessibility:
 *   - usePageTitle sets the document title
 *   - Main landmark with aria-labelledby pointing to the hero heading
 *   - Side panel is role="complementary"
 */
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Calendar, Tag } from 'lucide-react'
import { usePageTitle } from '@/hooks/use-page-title'
import { Container } from '@/components/ui/container'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import { cn } from '@/lib/utils'
import { ROUTES } from '@/constants/routes'
import { ARCHITECTURES } from '@/data/architecture'
import {
  useArchitectureState,
  ArchitectureCanvas,
  ArchitectureMobile,
  ArchitectureSidePanel,
  RequestFlowView,
  DeploymentView,
  EngineeringDecisions,
  VIEW_DEFINITIONS,
} from '@/features/architecture'

// ─── Not found ────────────────────────────────────────────────────────────────

function ArchitectureNotFound({ slug }: { slug: string }) {
  usePageTitle('Architecture not found')
  return (
    <main className="flex min-h-[60vh] flex-col items-center justify-center gap-6 px-6 text-center">
      <p className="text-xs font-semibold uppercase tracking-widest text-text-tertiary">404</p>
      <h1 className="text-2xl font-bold text-text-primary">Architecture not found</h1>
      <p className="max-w-sm text-sm text-text-secondary">
        No architecture document found for{' '}
        <code className="font-mono text-text-primary">{slug}</code>.
      </p>
      <Link
        to={ROUTES.ARCHITECTURE}
        className="inline-flex items-center gap-1.5 rounded-lg border border-border px-4 py-2 text-sm text-text-secondary transition-colors hover:border-accent/30 hover:text-text-primary"
      >
        <ArrowLeft size={14} aria-hidden />
        Back to Architecture Explorer
      </Link>
    </main>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export function ProjectArchitecturePage() {
  const { slug } = useParams<{ slug: string }>()
  const arch = slug ? ARCHITECTURES[slug] : undefined

  usePageTitle(arch ? `${arch.projectName} — Architecture` : 'Architecture')

  if (!arch || !slug) {
    return <ArchitectureNotFound slug={slug ?? 'unknown'} />
  }

  return <ArchitectureExplorer arch={arch} />
}

// Separated so the hook isn't called conditionally
function ArchitectureExplorer({
  arch,
}: {
  arch: NonNullable<(typeof ARCHITECTURES)[string]>
}) {
  const { selectedNodeId, activeView, selectNode, clearSelection, setView } =
    useArchitectureState()

  const selectedNode = selectedNodeId ? arch.nodes[selectedNodeId] : undefined
  const isPanelOpen = selectedNode !== undefined

  return (
    <main aria-labelledby="arch-hero-heading">
      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <div className="border-b border-border">
        <Container className="pb-10 pt-8">
          <Link
            to={ROUTES.ARCHITECTURE}
            className="mb-4 inline-flex items-center gap-1.5 text-xs text-text-tertiary transition-colors hover:text-text-secondary"
          >
            <ArrowLeft size={12} aria-hidden />
            Architecture Explorer
          </Link>

          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-text-tertiary">
            System design
          </p>
          <h1
            id="arch-hero-heading"
            className="text-2xl font-bold tracking-tight text-text-primary sm:text-3xl"
          >
            {arch.projectName}
          </h1>
          <p className="mt-2 max-w-2xl text-base leading-relaxed text-text-secondary">
            {arch.tagline}
          </p>

          {/* Meta row */}
          <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-text-tertiary">
            <span className="flex items-center gap-1.5">
              <Calendar size={12} aria-hidden />
              Updated {arch.metadata.lastUpdated}
            </span>
            <span className="flex items-center gap-1.5">
              <Tag size={12} aria-hidden />
              {arch.metadata.tags.join(' · ')}
            </span>
          </div>

          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-text-secondary border-l-2 border-accent/30 pl-4">
            {arch.metadata.summary}
          </p>
        </Container>
      </div>

      {/* ── Explorer ─────────────────────────────────────────────────────── */}
      <Container className="py-10">

        {/* View tabs */}
        <Tabs
          value={activeView}
          onValueChange={(v) => { setView(v as typeof activeView) }}
        >
          <TabsList className="mb-6" aria-label="Architecture views">
            {VIEW_DEFINITIONS.map((view) => (
              <TabsTrigger key={view.mode} value={view.mode}>
                {view.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* ── Content + optional side panel ────────────────────────────── */}
          <div
            className={cn(
              'grid gap-6',
              isPanelOpen
                ? 'grid-cols-1 xl:grid-cols-[1fr,380px]'
                : 'grid-cols-1',
            )}
          >
            {/* Main view area */}
            <div className="min-w-0">

              {/* Logical architecture */}
              <TabsContent value="logical">
                {/* Desktop canvas */}
                <div className="hidden lg:block">
                  <ArchitectureCanvas
                    nodes={arch.nodes}
                    connections={arch.connections}
                    rows={arch.grid.rows}
                    cols={arch.grid.cols}
                    selectedNodeId={selectedNodeId}
                    onNodeSelect={selectNode}
                  />
                </div>
                {/* Mobile stacked list */}
                <div className="lg:hidden">
                  <ArchitectureMobile
                    nodes={arch.nodes}
                    selectedNodeId={selectedNodeId}
                    onNodeSelect={selectNode}
                  />
                </div>

                {!isPanelOpen && (
                  <p className="mt-4 text-xs text-text-tertiary">
                    Click any component to explore its design decisions.
                  </p>
                )}
              </TabsContent>

              {/* Request flow */}
              <TabsContent value="request-flow">
                <RequestFlowView
                  steps={arch.requestFlow}
                  nodes={arch.nodes}
                  onNodeSelect={selectNode}
                  selectedNodeId={selectedNodeId}
                />
              </TabsContent>

              {/* Deployment overview */}
              <TabsContent value="deployment">
                <DeploymentView stack={arch.deploymentStack} />
              </TabsContent>

            </div>

            {/* Side panel — only rendered when a node is selected */}
            {isPanelOpen && selectedNode && (
              <div>
                <ArchitectureSidePanel
                  node={selectedNode}
                  onClose={clearSelection}
                />
              </div>
            )}
          </div>
        </Tabs>

        {/* Engineering decisions */}
        <EngineeringDecisions decisions={arch.decisions} />

      </Container>
    </main>
  )
}
