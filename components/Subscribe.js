import React, { useState } from 'react'
import axios from 'axios'

function Subscribe() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle')
  const [errorMsg, setErrorMsg] = useState(null)

  const subscribe = async (e) => {
    e.preventDefault()
    setState('Loading')

    try {
      await axios.post('/api/subscribe', { email })
      setState('Success')
      setEmail('')
    } catch (err) {
      setErrorMsg(err.response?.data?.error ?? 'Something went wrong')
      setState('Error')
    }
  }

  return (
    <div className="border-t border-b border-rule py-6 my-10">
      <p className="text-sm uppercase tracking-widest text-muted mb-3">
        Newsletter
      </p>
      <p className="text-base text-ink mb-4">
        A few times a year. No noise.
      </p>
      <form onSubmit={subscribe}>
        <div className="flex gap-3 items-baseline border-b border-rule pb-2">
          <input
            required
            className="flex-1 bg-transparent text-ink placeholder:text-muted focus:outline-none text-base"
            id="email-input"
            name="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            disabled={state === 'Loading'}
            type="submit"
            className="text-sm uppercase tracking-widest text-ink hover:text-accent disabled:text-muted"
          >
            {state === 'Loading' ? 'Sending' : 'Subscribe'}
          </button>
        </div>
        <div className="mt-3 text-sm">
          {state === 'Error' && (
            <p className="text-accent">{errorMsg}</p>
          )}
          {state === 'Success' && (
            <p className="text-muted">Subscribed. Thank you.</p>
          )}
        </div>
      </form>
    </div>
  )
}

export default Subscribe
