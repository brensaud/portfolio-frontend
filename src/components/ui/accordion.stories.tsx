import type { Meta, StoryObj } from '@storybook/react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from './accordion'

// AccordionRoot accepts a discriminated union (type: "single" | "multiple"), so
// we use a loose Meta type here rather than satisfies Meta<typeof Accordion>.
const meta: Meta = {
  title: 'UI/Accordion',
  component: Accordion,
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj

const items = [
  {
    value: 'why-python',
    trigger: 'Why Python for backend?',
    content:
      "Python's ecosystem for data pipelines, ML integration, and async I/O with FastAPI makes it the pragmatic choice for AI-adjacent products.",
  },
  {
    value: 'why-react',
    trigger: 'Why React for frontend?',
    content:
      'React has the largest ecosystem, best TypeScript support, and is the language frontend engineers speak. Switching costs outweigh any technical advantage of alternatives.',
  },
  {
    value: 'why-postgresql',
    trigger: 'Why PostgreSQL?',
    content:
      "It is the world's most advanced open-source relational database. JSON support, full-text search, and rock-solid ACID compliance make it a single tool for most data storage needs.",
  },
]

export const Single: Story = {
  render: () => (
    <Accordion type="single" collapsible className="w-[480px]">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
}

export const Multiple: Story = {
  render: () => (
    <Accordion type="multiple" className="w-[480px]">
      {items.map((item) => (
        <AccordionItem key={item.value} value={item.value}>
          <AccordionTrigger>{item.trigger}</AccordionTrigger>
          <AccordionContent>{item.content}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  ),
}
