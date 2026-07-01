import type { Meta, StoryObj } from '@storybook/react'
import { Skeleton } from './skeleton'

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['text', 'circle', 'rect'] },
  },
  args: { variant: 'rect' },
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const TextLine: Story = {
  args: { variant: 'text', className: 'w-48' },
}

export const Circle: Story = {
  args: { variant: 'circle', className: 'h-12 w-12' },
}

export const Rect: Story = {
  args: { variant: 'rect', className: 'h-40 w-64' },
}

export const CardSkeleton: Story = {
  render: () => (
    <div className="w-72 space-y-3 rounded-xl border border-border p-6">
      <Skeleton variant="rect" className="h-40 w-full" />
      <div className="space-y-2">
        <Skeleton variant="text" className="w-3/4" />
        <Skeleton variant="text" className="w-1/2" />
      </div>
      <div className="flex gap-2">
        <Skeleton variant="text" className="h-5 w-16" />
        <Skeleton variant="text" className="h-5 w-16" />
      </div>
    </div>
  ),
}
