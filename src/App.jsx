
import { useState } from 'react'
import useFetch from './hooks/useFetch'
import './App.css'

function App() {
  const [searchInput, setSearchInput] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [filter, setFilter] = useState('all')

  const url = searchTerm
    ? `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${encodeURIComponent(searchTerm)}`
    : 'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a'

  const { data, loading, error } = useFetch(url)

  const drinks = data?.drinks || []

  function handleSearch(event) {
    event.preventDefault()
    setSearchTerm(searchInput.trim())
  }

  const filteredDrinks = drinks.filter((drink) => {
    if (filter === 'all') {
      return true
    }

    return drink.strAlcoholic === filter
  })

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

          <div className="filter-buttons">
            <button
              type="button"
              className={filter === 'all' ? 'active' : ''}
              onClick={() => setFilter('all')}
              aria-pressed={filter === 'all'}
            >
              All Drinks
            </button>

            <button
              type="button"
              className={filter === 'Alcoholic' ? 'active' : ''}
              onClick={() => setFilter('Alcoholic')}
              aria-pressed={filter === 'Alcoholic'}
            >
              Alcoholic
            </button>

            <button
              type="button"
              className={filter === 'Non alcoholic' ? 'active' : ''}
              onClick={() => setFilter('Non alcoholic')}
              aria-pressed={filter === 'Non alcoholic'}
            >
              Non-Alcoholic
            </button>
          </div>

          {loading ? (
            <p>Loading cocktails...</p>
          ) : error ? (
            <p>{error}</p>
          ) : drinks.length === 0 ? (
            <p>No cocktails found.</p>
          ) : filteredDrinks.length === 0 ? (
            <p>No cocktails match this filter.</p>
          ) : (
            <div className="cocktail-grid">
              {filteredDrinks.map((drink) => (
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
