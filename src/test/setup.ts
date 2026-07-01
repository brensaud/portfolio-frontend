// Vitest setup file — runs before every test file.
//
// Imports @testing-library/jest-dom to extend Vitest's `expect` with
// DOM-specific matchers such as:
//   expect(element).toBeInTheDocument()
//   expect(element).toHaveTextContent('...')
//   expect(element).toBeVisible()
//
// This import must stay here (not in individual test files) so the matchers
// are available everywhere without repetition.
import '@testing-library/jest-dom'
