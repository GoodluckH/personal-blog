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
      const response = await axios.post('/api/subscribe', { email })
      setState('Success')
      setEmail('')
    } catch (e) {
      setErrorMsg(e.response.data.error)
      setState('Error')
    }
  }

  return (
    <div className="bg-gray-50 border-gray-300 dark:border-slate-500 border-[2px] rounded-xl p-3 text-left drop-shadow-sm dark:bg-slate-800">
      <p className="mt-1 font-medium text-base md:text-xl text-gray-900 dark:text-slate-100">
        Subscribe and expect less than 5 posts a year.
      </p>
      <form onSubmit={subscribe}>
        <div className="flex flex-col items-center">
          <div className="mt-4 w-full">
            {/* align input and button horizontally center */}
            <input
              required
              className="w-3/5 px-2 py-1 border-gray-300 dark:border-slate-500 border-[2px] rounded-l-lg h-10 md:w-4/5"
              id="email-input"
              name="email"
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <button
              disabled={state === 'Loading'}
              type="submit"
              className="w-2/5 bg-gray-900 text-white font-bold py-2 px-4 rounded-r-lg md:w-1/5"
              onClick={subscribe}
            >
              Subscribe
            </button>
          </div>
        </div>
        <div className="mt-2">
          {state === 'Error' && (
            <h4 className="text-red-400">Something went wrong: {errorMsg}</h4>
          )}
          {state === 'Success' && (
            <h4 className="text-green-700 dark:text-green-600 font-semibold">
              Awesome, you have been subscribed!
            </h4>
          )}
        </div>
      </form>
    </div>
  )
}

export default Subscribe
