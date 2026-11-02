
import { useEffect, useState } from 'react'

function useFetch(urls) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchData() {
      setLoading(true)
      setError(null)
      setData(null)

      try {
        const results = await Promise.all(
          urls.map(async (url) => {
            const response = await fetch(url, {
              signal: controller.signal
            })

            if (!response.ok) {
              throw new Error('Failed to load cocktails')
            }

            return response.json()
          })
        )

        if (!controller.signal.aborted) {
          setData(results)
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(
            'Could not load cocktails. Please check your connection and try again.'
          )
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => controller.abort()
  }, [urls, retryCount])

  function retry() {
    setRetryCount((previous) => previous + 1)
  }

  return { data, loading, error, retry }
}

export default useFetch
