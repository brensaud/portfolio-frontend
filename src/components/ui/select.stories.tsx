import type { Meta, StoryObj } from '@storybook/react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from './select'

const meta = {
  title: 'UI/Select',
  component: Select,
  tags: ['autodocs'],
} satisfies Meta<typeof Select>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Select defaultValue="react">
      <SelectTrigger className="w-[240px]" aria-label="Frontend framework">
        <SelectValue placeholder="Select a framework…" />
      </SelectTrigger>
      <SelectContent>
        <SelectLabel>Frontend</SelectLabel>
        <SelectItem value="react">React</SelectItem>
        <SelectItem value="vue">Vue</SelectItem>
        <SelectItem value="svelte">Svelte</SelectItem>
        <SelectSeparator />
        <SelectLabel>Backend</SelectLabel>
        <SelectItem value="fastapi">FastAPI</SelectItem>
        <SelectItem value="django">Django</SelectItem>
      </SelectContent>
    </Select>
  ),
}

export const Placeholder: Story = {
  render: () => (
    <Select>
      <SelectTrigger className="w-[240px]" aria-label="Status">
        <SelectValue placeholder="Select a status…" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="available">Available for work</SelectItem>
        <SelectItem value="busy">Currently busy</SelectItem>
        <SelectItem value="unavailable">Not available</SelectItem>
      </SelectContent>
    </Select>
  ),
}
