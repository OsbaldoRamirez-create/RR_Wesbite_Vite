import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router'
import { describe, it, expect } from 'vitest'
import Navbar from './Navbar'

// Components that use <NavLink> need a router around them, so give them one.
const renderWithRouter = (ui) => render(<MemoryRouter>{ui}</MemoryRouter>)

describe('Navbar', () => {
  it('links to every top-level page', () => {
    renderWithRouter(<Navbar />)

    expect(screen.getByRole('link', { name: 'Home' })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: 'About us' })).toHaveAttribute('href', '/About')
    expect(screen.getByRole('link', { name: 'Gallery' })).toHaveAttribute('href', '/gallery')
    expect(screen.getByRole('link', { name: 'Contact Us' })).toHaveAttribute('href', '/contact')
  })

  // The dropdown is revealed by a CSS :hover rule, so its links are display:none
  // until hover. jsdom can't trigger that, hence `hidden: true`.
  it('exposes the services dropdown links', () => {
    renderWithRouter(<Navbar />)

    expect(
      screen.getByRole('link', { name: /Maintenance Services/, hidden: true }),
    ).toHaveAttribute('href', '/maintenance')
    expect(
      screen.getByRole('link', { name: /Landscaping Services/, hidden: true }),
    ).toHaveAttribute('href', '/landscaping')
  })
})
