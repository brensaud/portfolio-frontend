import type { Meta, StoryObj } from '@storybook/react'
import { Download, Plus, ArrowRight } from 'lucide-react'
import { Button } from './button'

const meta = {
  title: 'UI/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'ghost', 'danger'],
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
    },
    isLoading: { control: 'boolean' },
    disabled: { control: 'boolean' },
    iconOnly: { control: 'boolean' },
  },
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'md',
    isLoading: false,
    disabled: false,
  },
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

// ─── Variants ─────────────────────────────────────────────────────────────────

export const Primary: Story = { args: { variant: 'primary' } }

export const Secondary: Story = { args: { variant: 'secondary' } }

export const Ghost: Story = { args: { variant: 'ghost' } }

export const Danger: Story = { args: { variant: 'danger', children: 'Delete' } }

// ─── Sizes ────────────────────────────────────────────────────────────────────

export const Small: Story = { args: { size: 'sm' } }

export const Large: Story = { args: { size: 'lg' } }

// ─── States ───────────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: { isLoading: true, children: 'Saving…' },
}

export const Disabled: Story = {
  args: { disabled: true },
}

// ─── With icons ───────────────────────────────────────────────────────────────

export const WithLeftIcon: Story = {
  args: {
    leftIcon: <Plus size={16} />,
    children: 'New Project',
  },
}

export const WithRightIcon: Story = {
  args: {
    rightIcon: <ArrowRight size={16} />,
    children: 'View All',
    variant: 'ghost',
  },
}

export const IconOnlyPrimary: Story = {
  args: {
    iconOnly: true,
    children: <Download size={16} />,
    'aria-label': 'Download',
  },
}

// ─── All variants side-by-side ────────────────────────────────────────────────

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap items-center gap-3">
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="danger">Danger</Button>
    </div>
  ),
}

export const AllSizes: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-3">
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
    </div>
  ),
}
