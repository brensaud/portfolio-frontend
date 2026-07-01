import type { Meta, StoryObj } from '@storybook/react'
import { Input } from './input'

const meta = {
  title: 'UI/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {
    isError: { control: 'boolean' },
    disabled: { control: 'boolean' },
  },
  args: { placeholder: 'Placeholder text…' },
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithValue: Story = { args: { defaultValue: 'john@example.com' } }

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'Cannot edit this' },
}

export const WithError: Story = {
  args: {
    isError: true,
    errorMessage: 'This field is required.',
    defaultValue: '',
  },
}

export const WithLabel: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-1.5">
      <label htmlFor="email-demo" className="text-sm font-medium text-text-primary">
        Email address
      </label>
      <Input id="email-demo" type="email" placeholder="you@example.com" />
    </div>
  ),
}

export const WithLabelAndError: Story = {
  render: () => (
    <div className="flex w-72 flex-col gap-1.5">
      <label htmlFor="email-error-demo" className="text-sm font-medium text-text-primary">
        Email address
      </label>
      <Input
        id="email-error-demo"
        type="email"
        defaultValue="invalid-email"
        isError
        errorMessage="Please enter a valid email address."
      />
    </div>
  ),
}
