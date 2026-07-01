import type { Meta, StoryObj } from '@storybook/react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from './tabs'

const meta = {
  title: 'UI/Tabs',
  component: Tabs,
  tags: ['autodocs'],
} satisfies Meta<typeof Tabs>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Tabs defaultValue="overview" className="w-[400px]">
      <TabsList>
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="tech">Tech Stack</TabsTrigger>
        <TabsTrigger value="links">Links</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <p className="text-sm text-text-secondary">
          A high-level overview of the project, its goals, and outcomes.
        </p>
      </TabsContent>
      <TabsContent value="tech">
        <p className="text-sm text-text-secondary">
          React, TypeScript, FastAPI, PostgreSQL, Redis, Docker.
        </p>
      </TabsContent>
      <TabsContent value="links">
        <p className="text-sm text-text-secondary">
          GitHub · Live Demo · Case Study
        </p>
      </TabsContent>
    </Tabs>
  ),
}
