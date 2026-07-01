import type { Meta, StoryObj } from '@storybook/react'
import { Card, CardHeader, CardBody, CardFooter, CardTitle, CardDescription } from './card'
import { Badge } from './badge'
import { Button } from './button'

const meta = {
  title: 'UI/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['default', 'interactive'] },
  },
  args: { variant: 'default' },
} satisfies Meta<typeof Card>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: (args) => (
    <Card {...args} className="w-80">
      <CardHeader>
        <CardTitle>Card Title</CardTitle>
        <CardDescription>A short description of the card content.</CardDescription>
      </CardHeader>
      <CardBody>
        <p className="text-sm text-text-secondary">Card body content goes here.</p>
      </CardBody>
      <CardFooter>
        <Button size="sm" variant="secondary">Action</Button>
      </CardFooter>
    </Card>
  ),
}

export const Interactive: Story = {
  args: { variant: 'interactive' },
  render: (args) => (
    <Card {...args} className="w-80 cursor-pointer">
      <CardHeader>
        <div className="mb-2 flex items-center gap-2">
          <Badge variant="accent" size="sm">Live</Badge>
        </div>
        <CardTitle>Portfolio Website</CardTitle>
        <CardDescription>
          A world-class portfolio built with React, TypeScript, and a custom design system.
        </CardDescription>
      </CardHeader>
      <CardBody>
        <div className="flex flex-wrap gap-1">
          <Badge size="sm">React</Badge>
          <Badge size="sm">TypeScript</Badge>
          <Badge size="sm">Tailwind</Badge>
        </div>
      </CardBody>
    </Card>
  ),
}
