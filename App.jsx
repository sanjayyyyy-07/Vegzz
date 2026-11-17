import React, { useMemo, useState } from "react";
import {
  Search, ShoppingBasket, MapPin, Menu, X, Plus, Minus, Leaf,
  ArrowRight, Clock3, ShieldCheck, Truck, Star, Trash2
} from "lucide-react";

const products = [
  { id: 1, name: "Fresh Red Onion", category: "Vegetables", unit: "1 kg", price: 48, oldPrice: 60, tag: "Best seller", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=700&auto=format&fit=crop&q=85" },
  { id: 2, name: "Ooty Carrot", category: "Vegetables", unit: "500 g", price: 35, oldPrice: 45, tag: "Fresh pick", image: "https://images.unsplash.com/photo-1445282768818-728615cc910a?w=700&auto=format&fit=crop&q=85" },
  { id: 3, name: "Farm Fresh Tomato", category: "Vegetables", unit: "1 kg", price: 32, oldPrice: 40, tag: "Popular", image: "https://images.unsplash.com/photo-1546094096-0df4bcaaa337?w=700&auto=format&fit=crop&q=85" },
  { id: 4, name: "Green Capsicum", category: "Vegetables", unit: "500 g", price: 42, oldPrice: 50, tag: "", image: "https://images.unsplash.com/photo-1563565375-f3fdfdbefa83?w=700&auto=format&fit=crop&q=85" },
  { id: 5, name: "Fresh Broccoli", category: "Vegetables", unit: "1 pc", price: 55, oldPrice: 65, tag: "Healthy choice", image: "https://images.unsplash.com/photo-1459411621453-7b03977f4bfc?w=700&auto=format&fit=crop&q=85" },
  { id: 6, name: "Farm Spinach", category: "Vegetables", unit: "1 bunch", price: 20, oldPrice: 25, tag: "", image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=700&auto=format&fit=crop&q=85" },
  { id: 7, name: "Sweet Red Apples", category: "Fruits", unit: "1 kg", price: 145, oldPrice: 170, tag: "Premium", image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?w=700&auto=format&fit=crop&q=85" },
  { id: 8, name: "Fresh Bananas", category: "Fruits", unit: "1 dozen", price: 55, oldPrice: 65, tag: "", image: "https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=700&auto=format&fit=crop&q=85" },
  { id: 9, name: "Farm Potatoes", category: "Vegetables", unit: "1 kg", price: 38, oldPrice: 45, tag: "", image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=700&auto=format&fit=crop&q=85" },
  { id: 10, name: "Fresh Green Grapes", category: "Fruits", unit: "500 g", price: 75, oldPrice: 90, tag: "Seasonal", image: "https://images.unsplash.com/photo-1537640538966-79f369143f8f?w=700&auto=format&fit=crop&q=85" },
  { id: 11, name: "Farm Cucumbers", category: "Vegetables", unit: "500 g", price: 25, oldPrice: 30, tag: "", image: "https://images.unsplash.com/photo-1604977042946-1eecc30f269e?w=700&auto=format&fit=crop&q=85" },
  { id: 12, name: "Fresh Oranges", category: "Fruits", unit: "1 kg", price: 90, oldPrice: 110, tag: "", image: "https://images.unsplash.com/photo-1547514701-42782101795e?w=700&auto=format&fit=crop&q=85" }
];

const categories = ["All", "Vegetables", "Fruits"];

function App() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [notice, setNotice] = useState("");

  const filtered = useMemo(() => products.filter(p =>
    (activeCategory === "All" || p.category === activeCategory) &&
    p.name.toLowerCase().includes(search.toLowerCase())
  ), [activeCategory, search]);

  const cartItems = products.filter(p => cart[p.id] > 0);
  const count = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = cartItems.reduce((sum, p) => sum + p.price * cart[p.id], 0);

  function updateCart(id, change) {
    setCart(current => {
      const next = { ...current, [id]: Math.max(0, (current[id] || 0) + change) };
      if (!next[id]) delete next[id];
      return next;
    });
  }

  function addToCart(product) {
    updateCart(product.id, 1);
    setNotice(`${product.name} added to your basket`);
    window.setTimeout(() => setNotice(""), 2200);
  }

  return (
    <div className="site-shell">
      <div className="top-strip">
        <span><Leaf size={14}/> Fresh from farms, carefully delivered</span>
        <span className="top-right"><Truck size={14}/> Free delivery on orders above ₹499</span>
      </div>

      <header className="header">
        <button className="icon-btn mobile-menu-btn" onClick={() => setMobileMenu(!mobileMenu)} aria-label="Open menu">
          {mobileMenu ? <X /> : <Menu />}
        </button>
        <a className="brand" href="#" aria-label="VEGZZ home">
          <span className="brand-mark"><Leaf size={23} fill="currentColor"/></span>
          <span>VEG<span>ZZ</span><small>FRESH MARKET</small></span>
        </a>
        <div className="delivery-location"><MapPin size={18}/><div><small>Delivering to</small><strong>Coimbatore, Tamil Nadu</strong></div></div>
        <label className="search-box">
          <Search size={19}/>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search for vegetables, fruits..." />
          {search && <button onClick={() => setSearch("")} aria-label="Clear search"><X size={16}/></button>}
        </label>
        <button className="cart-button" onClick={() => setCartOpen(true)}>
          <ShoppingBasket size={20}/><span>My Basket</span><b>{count}</b>
        </button>
      </header>

      {mobileMenu && <div className="mobile-nav">
        {categories.map(c => <button key={c} onClick={() => {setActiveCategory(c);setMobileMenu(false);}}>{c}</button>)}
      </div>}

      <main>
        <section className="hero">
          <div className="hero-copy">
            <div className="eyebrow"><span></span> GOOD FOOD. GOOD MOOD.</div>
            <h1>Freshness you can<br/><em>taste every day.</em></h1>
            <p>Bring home farm-fresh vegetables and juicy fruits. Handpicked with care and delivered to your doorstep.</p>
            <button className="primary-btn" onClick={() => document.getElementById("shop").scrollIntoView({behavior:"smooth"})}>
              Shop fresh groceries <ArrowRight size={18}/>
            </button>
            <div className="hero-points">
              <span><ShieldCheck size={17}/> Quality checked</span>
              <span><Clock3 size={17}/> Fresh daily</span>
            </div>
          </div>
          <div className="hero-visual">
            <div className="hero-image"></div>
            <div className="fresh-stamp"><Leaf size={19}/><span>100%<small>FRESH PICKS</small></span></div>
            <div className="hero-note"><b>From farm to home</b><small>Freshness in every basket</small></div>
          </div>
        </section>

        <section className="benefits">
          <div><span className="benefit-icon"><Truck/></span><p><b>Fast delivery</b><small>At your doorstep</small></p></div>
          <div><span className="benefit-icon"><Leaf/></span><p><b>Farm fresh</b><small>Picked with care</small></p></div>
          <div><span className="benefit-icon"><ShieldCheck/></span><p><b>Quality promise</b><small>Freshness guaranteed</small></p></div>
          <div><span className="benefit-icon"><Star/></span><p><b>Great prices</b><small>Everyday value</small></p></div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <div><div className="eyebrow">THE GOODNESS YOU NEED</div><h2>Shop fresh groceries</h2><p>Everyday essentials, selected just for you.</p></div>
            <div className="category-tabs">
              {categories.map(c => <button key={c} className={activeCategory === c ? "active" : ""} onClick={() => setActiveCategory(c)}>{c}</button>)}
            </div>
          </div>

          <div className="product-grid">
            {filtered.map(product => (
              <article className="product-card" key={product.id}>
                <div className="product-image-wrap">
                  {product.tag && <span className="product-tag">{product.tag}</span>}
                  <img src={product.image} alt={product.name} loading="lazy"/>
                  <button className="quick-add" onClick={() => addToCart(product)} aria-label={`Add ${product.name} to basket`}><Plus size={19}/></button>
                </div>
                <div className="product-info">
                  <span className="product-category">{product.category}</span>
                  <h3>{product.name}</h3>
                  <small className="unit">{product.unit}</small>
                  <div className="product-bottom">
                    <div><strong>₹{product.price}</strong><del>₹{product.oldPrice}</del></div>
                    {cart[product.id] ? <div className="quantity-control">
                      <button onClick={() => updateCart(product.id,-1)} aria-label="Decrease quantity"><Minus size={14}/></button>
                      <b>{cart[product.id]}</b>
                      <button onClick={() => updateCart(product.id,1)} aria-label="Increase quantity"><Plus size={14}/></button>
                    </div> : <button className="add-btn" onClick={() => addToCart(product)}>Add <Plus size={14}/></button>}
                  </div>
                </div>
              </article>
            ))}
          </div>
          {filtered.length === 0 && <div className="empty-search"><Search size={28}/><h3>No groceries found</h3><p>Try searching with another product name.</p></div>}
        </section>

        <section className="newsletter">
          <div><span className="eyebrow">A LITTLE FRESHNESS IN YOUR INBOX</span><h2>Good things grow here.</h2><p>Get fresh picks, seasonal offers and grocery updates.</p></div>
          <form onSubmit={e => {e.preventDefault();setNotice("Thanks for subscribing to VEGZZ!");e.target.reset();window.setTimeout(()=>setNotice(""),2500);}}>
            <input type="email" placeholder="Enter your email address" required/>
            <button className="primary-btn">Subscribe <ArrowRight size={17}/></button>
          </form>
        </section>
      </main>

      <footer className="footer">
        <a className="brand footer-brand" href="#"><span className="brand-mark"><Leaf size={22} fill="currentColor"/></span><span>VEG<span>ZZ</span><small>FRESH MARKET</small></span></a>
        <p>Fresh choices. Happy homes. © 2026 VEGZZ.</p>
        <span>Made for everyday freshness</span>
      </footer>

      {notice && <div className="toast"><span>✓</span>{notice}</div>}

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}>
        <aside className="cart-drawer" onClick={e => e.stopPropagation()}>
          <div className="drawer-header"><div><h2>Your basket</h2><small>{count} items selected</small></div><button className="icon-btn" onClick={() => setCartOpen(false)}><X/></button></div>
          {cartItems.length === 0 ? <div className="empty-cart"><ShoppingBasket size={42}/><h3>Your basket is empty</h3><p>Add some fresh picks to get started.</p><button className="primary-btn" onClick={() => setCartOpen(false)}>Explore groceries</button></div> :
            <>
              <div className="cart-list">{cartItems.map(p => <div className="cart-row" key={p.id}>
                <img src={p.image} alt=""/><div className="cart-product"><b>{p.name}</b><small>{p.unit} · ₹{p.price}</small><div className="quantity-control"><button onClick={() => updateCart(p.id,-1)}><Minus size={13}/></button><b>{cart[p.id]}</b><button onClick={() => updateCart(p.id,1)}><Plus size={13}/></button></div></div><strong>₹{p.price * cart[p.id]}</strong>
              </div>)}</div>
              <div className="cart-summary"><div><span>Subtotal</span><b>₹{subtotal}</b></div><div><span>Delivery</span><b>{subtotal >= 499 ? "FREE" : "₹30"}</b></div><div className="total"><span>Total</span><b>₹{subtotal + (subtotal >= 499 ? 0 : 30)}</b></div><button className="primary-btn checkout-btn" onClick={() => setNotice("Checkout demo: connect a payment and order API to accept orders.")}>Continue to checkout <ArrowRight size={17}/></button><small className="demo-note">Demo frontend only — checkout is not connected to a payment service.</small></div>
            </>}
        </aside>
      </div>}
    </div>
  );
}

export default App;