
import { useEffect, useState } from 'react'

function useFetch(url) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const controller = new AbortController()

    async function fetchData() {
      setLoading(true)
      setError(null)

      try {
        const response = await fetch(url, {
          signal: controller.signal
        })

        if (!response.ok) {
          throw new Error('Failed to fetch data')
        }

        const result = await response.json()

        if (!controller.signal.aborted) {
          setData(result)
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          setError(err.message)
        }
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false)
        }
      }
    }

    fetchData()

    return () => controller.abort()
  }, [url])

  return { data, loading, error }
}

export default useFetch
