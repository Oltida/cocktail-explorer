
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [drinks, setDrinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    async function fetchCocktails() {
      setLoading(true)
      setError(null)

      try {
        const url = searchTerm
          ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`
          : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a'

        const response = await fetch(url, {
          signal: controller.signal
        })

        if (!response.ok) {
          throw new Error('Failed to fetch cocktails')
        }

        const data = await response.json()

        if (!controller.signal.aborted) {
          setDrinks(data.drinks || [])
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

    fetchCocktails()

    return () => controller.abort()
  }, [searchTerm])

  function handleSearch(event) {
    event.preventDefault()
    setSearchTerm(searchInput.trim())
  }

  return (
    <div className="app">
      <header className="navbar">
        <h2>Cocktail Explorer 🍸</h2>
        <nav>
          <a href="#home">Home</a>
          <a href="#explore">Explore</a>
        </nav>
      </header>

      <main>
        <section className="hero" id="home">
          <p className="subtitle">YOUR NEXT FAVORITE DRINK</p>
          <h1>Discover Your Perfect Cocktail</h1>
          <p>
            Explore delicious cocktails, discover new flavors,
            and find the perfect recipe for any occasion.
          </p>
        </section>

        <section className="explore" id="explore">
          <h2>Explore Cocktails</h2>

          <form className="search-form" onSubmit={handleSearch}>
            <input
              type="search"
              placeholder="Search cocktails..."
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              aria-label="Search cocktails by name"
            />
            <button type="submit">Search</button>
          </form>

          {loading ? (
            <p>Loading cocktails...</p>
          ) : error ? (
            <p>{error}</p>
          ) : drinks.length === 0 ? (
            <p>No cocktails found.</p>
          ) : (
            <div className="cocktail-grid">
              {drinks.map((drink) => (
                <div className="cocktail-card" key={drink.idDrink}>
                  <img
                    src={drink.strDrinkThumb}
                    alt={drink.strDrink}
                  />
                  <div className="cocktail-info">
                    <h3>{drink.strDrink}</h3>
                    <p>{drink.strCategory}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  )
}

export default App
