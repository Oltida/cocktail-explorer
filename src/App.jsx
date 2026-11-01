
import './App.css'

function App() {
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
          <p>Your cocktail collection will appear here soon!</p>
        </section>
      </main>
    </div>
  )
}

export default App
