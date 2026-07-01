import type { Meta, StoryObj } from '@storybook/react'
import { Textarea } from './textarea'

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
  tags: ['autodocs'],
  argTypes: {
    isError: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { placeholder: 'Write your message here…' },
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithError: Story = {
  args: {
    isError: true,
    errorMessage: 'Message cannot be empty.',
  },
}

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Cannot edit this field.' },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex w-80 flex-col gap-1.5">
      <label htmlFor="msg" className="text-sm font-medium text-text-primary">
        Message
      </label>
      <Textarea id="msg" rows={4} placeholder="Describe your project…" />
    </div>
  ),
}
