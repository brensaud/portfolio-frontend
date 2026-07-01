import type { Meta, StoryObj } from '@storybook/react'
import { Badge } from './badge'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'accent', 'success', 'warning', 'error', 'outline'],
    },
    size: { control: 'select', options: ['sm', 'md'] },
  },
  args: { children: 'Badge', variant: 'default', size: 'md' },
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}
export const Accent: Story = { args: { variant: 'accent', children: 'New' } }
export const Success: Story = { args: { variant: 'success', children: 'Available' } }
export const Warning: Story = { args: { variant: 'warning', children: 'Busy' } }
export const Error: Story = { args: { variant: 'error', children: 'Error' } }
export const Outline: Story = { args: { variant: 'outline', children: 'Draft' } }

export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="default">Default</Badge>
      <Badge variant="accent">Accent</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="error">Error</Badge>
      <Badge variant="outline">Outline</Badge>
    </div>
  ),
}
