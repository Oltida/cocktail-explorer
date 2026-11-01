
import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [drinks, setDrinks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchCocktails() {
      try {
        const response = await fetch(
          'https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a'
        )

        if (!response.ok) {
          throw new Error('Failed to fetch cocktails')
        }

        const data = await response.json()
        setDrinks(data.drinks || [])
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    fetchCocktails()
  }, [])

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
