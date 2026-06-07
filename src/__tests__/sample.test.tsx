import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'

function DummyComponent() {
  return <div>Hello Trinetra</div>
}

describe('Sample Test', () => {
  it('should render the dummy component', () => {
    render(<DummyComponent />)
    expect(screen.getByText('Hello Trinetra')).toBeDefined()
  })
})
