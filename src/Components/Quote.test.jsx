import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, it, expect, vi } from 'vitest'
import Quote from './Quote'

// The real widget talks to Google's servers, so stand in a dumb checkbox.
vi.mock('react-google-recaptcha', () => ({
  default: ({ onChange }) => (
    <input aria-label="recaptcha" type="checkbox" onChange={() => onChange('test-token')} />
  ),
}))

describe('Quote form validation', () => {
  it('rejects a name shorter than 3 characters', async () => {
    const user = userEvent.setup()
    render(<Quote />)

    await user.type(screen.getByPlaceholderText('Name*'), 'Jo')

    expect(screen.getByText(/at least 3 characters/i)).toBeInTheDocument()
  })

  it('clears the name error once the name is valid', async () => {
    const user = userEvent.setup()
    render(<Quote />)

    const name = screen.getByPlaceholderText('Name*')
    await user.type(name, 'Jo')
    await user.type(name, 'hn')

    expect(screen.queryByText(/at least 3 characters/i)).not.toBeInTheDocument()
  })

  it('rejects a phone number that is not 10 digits or xxx-xxx-xxxx', async () => {
    const user = userEvent.setup()
    render(<Quote />)

    await user.type(screen.getByPlaceholderText('Phone Number*'), '5551234')

    expect(screen.getByText(/10 digits long/i)).toBeInTheDocument()
  })

  it('accepts a dashed phone number', async () => {
    const user = userEvent.setup()
    render(<Quote />)

    await user.type(screen.getByPlaceholderText('Phone Number*'), '555-123-4567')

    expect(screen.queryByText(/10 digits long/i)).not.toBeInTheDocument()
  })

  it('rejects a description containing a script tag', async () => {
    const user = userEvent.setup()
    render(<Quote />)

    await user.type(screen.getByPlaceholderText('Description:'), '<script>alert(1)</script>')

    expect(screen.getByText(/valid message or longer message/i)).toBeInTheDocument()
  })
})

describe('Quote form submission', () => {
  it('refuses to submit until the reCAPTCHA is solved', async () => {
    const user = userEvent.setup()
    const alertSpy = vi.spyOn(window, 'alert').mockImplementation(() => {})
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({}),
    })
    render(<Quote />)

    // Fill every required field so native validation does not block submit
    await user.type(screen.getByPlaceholderText('Name*'), 'John Doe')
    await user.type(screen.getByPlaceholderText('Phone Number*'), '5551234567')
    await user.type(screen.getByPlaceholderText('Email*'), 'john@example.com')
    await user.selectOptions(screen.getByRole('combobox'), 'Landscaping')
    await user.type(screen.getByPlaceholderText('Description:'), 'I need a new lawn installed.')
    // Intentionally leave the reCAPTCHA unchecked

    await user.click(screen.getByRole('button', { name: /submit/i }))

    expect(alertSpy).toHaveBeenCalledWith('Please complete the reCAPTCHA')
    expect(fetchSpy).not.toHaveBeenCalled()

    alertSpy.mockRestore()
    fetchSpy.mockRestore()
  })

  it('posts the form data to /send-quote once the reCAPTCHA is solved', async () => {
    const user = userEvent.setup()
    vi.spyOn(window, 'alert').mockImplementation(() => {})
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      ok: true,
      json: async () => ({}),
    })
    render(<Quote />)

    await user.type(screen.getByPlaceholderText('Name*'), 'John Doe')
    await user.type(screen.getByPlaceholderText('Phone Number*'), '5551234567')
    await user.type(screen.getByPlaceholderText('Email*'), 'john@example.com')
    await user.selectOptions(screen.getByRole('combobox'), 'Landscaping')  
    await user.type(screen.getByPlaceholderText('Description:'), 'I need a new lawn installed.')
    await user.click(screen.getByLabelText('recaptcha'))
    await user.click(screen.getByRole('button', { name: /submit/i }))

    expect(fetchSpy).toHaveBeenCalledOnce()
    const [url, options] = fetchSpy.mock.calls[0]
    expect(url).toBe('/send-quote')
    expect(JSON.parse(options.body)).toMatchObject({
      name: 'John Doe',
      phone: '5551234567',
      email: 'john@example.com',
      subject: 'Landscaping',
      captcha_Value: 'test-token',
    })

    vi.restoreAllMocks()
  })
})
