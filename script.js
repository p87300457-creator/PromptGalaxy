/* script.js - frontend logic for ShopSmart AI demo */
const products = JSON.parse(document.getElementById('productsJSON').textContent);
const productsEl = document.getElementById('products');
const categoriesEl = document.getElementById('categories');
const cartCount = document.getElementById('cartCount');
const cartItemsEl = document.getElementById('cartItems');
const cartTotalEl = document.getElementById('cartTotal');

let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let user = JSON.parse(localStorage.getItem('shop_user') || 'null');

function renderCategories(){
  const cats = Array.from(new Set(products.map(p=>p.category)));
  categoriesEl.innerHTML = cats.map(c=>`<li><button class="catBtn" data-cat="${c}">${c}</button></li>`).join('');
  categoriesEl.innerHTML += '<li><button class="catBtn" data-cat="All">All</button></li>';
  document.querySelectorAll('.catBtn').forEach(b=>b.addEventListener('click',e=>{
    const cat = e.target.dataset.cat;
    renderProducts(cat==='All'?products:products.filter(p=>p.category===cat));
  }));
}

function renderProducts(list = products){
  productsEl.innerHTML = '';
  list.forEach(p=>{
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${p.img}" alt="${p.title}" />
      <h4>${p.title}</h4>
      <div class="meta">Rating: ${p.rating} • ${p.category}</div>
      <div class="price">₹${p.price}</div>
      <div style="display:flex;gap:8px;margin-top:8px">
        <button class="addBtn" data-id="${p.id}">Add to cart</button>
        <button class="viewBtn" data-id="${p.id}">View</button>
      </div>
    `;
    productsEl.appendChild(card);
  });
  document.querySelectorAll('.addBtn').forEach(b=>b.addEventListener('click',e=>{
    const id=+e.target.dataset.id;
    addToCart(id);
  }));
  document.querySelectorAll('.viewBtn').forEach(b=>b.addEventListener('click',e=>{
    const id=+e.target.dataset.id;
    const pr = products.find(x=>x.id===id);
    alert(pr.title + "\nPrice: ₹" + pr.price + "\nRating: " + pr.rating);
  }));
}

function addToCart(id){
  const pr = products.find(p=>p.id===id);
  cart.push(pr);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
}

function updateCartUI(){
  cartCount.textContent = cart.length;
  cartItemsEl.innerHTML = cart.map((c,i)=>`<div style="padding:6px 0;border-bottom:1px solid rgba(255,255,255,0.02)">${c.title} — ₹${c.price} <button data-i="${i}" class="removeBtn">Remove</button></div>`).join('') || '<div>Cart empty</div>';
  cartTotalEl.textContent = cart.reduce((s,p)=>s+p.price,0);
  document.querySelectorAll('.removeBtn').forEach(b=>b.addEventListener('click',e=>{
    const i = +e.target.dataset.i;
    cart.splice(i,1);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
  }));
}

document.getElementById('cartBtn').addEventListener('click',()=>{
  document.getElementById('cartDrawer').classList.toggle('hidden');
  updateCartUI();
});

document.getElementById('signinBtn').addEventListener('click',()=>{
  document.getElementById('authModal').classList.remove('hidden');
});

document.getElementById('closeAuth').addEventListener('click',()=>{
  document.getElementById('authModal').classList.add('hidden');
});

document.getElementById('saveUser').addEventListener('click',()=>{
  const name = document.getElementById('username').value.trim();
  const email = document.getElementById('email').value.trim();
  if(!name||!email){alert('Enter name and email');return;}
  user = {name,email};
  localStorage.setItem('shop_user', JSON.stringify(user));
  document.getElementById('authModal').classList.add('hidden');
  alert('Welcome ' + name);
});

document.getElementById('searchBtn').addEventListener('click',()=>{
  const q = document.getElementById('searchInput').value.trim().toLowerCase();
  if(!q) return;
  // If query looks like a compare/request, call AI (simulated)
  if(q.includes('compare') || q.includes('analysis') || q.includes('trend') || q.includes('which')){
    simulateAI(q);
    return;
  }
  const res = products.filter(p=>p.title.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
  renderProducts(res.length?res:[]);
});

function simulateAI(q){
  const aiResult = document.getElementById('aiResult');
  aiResult.textContent = 'Analyzing...';
  // Use ai.js analyzeProductQuery which will either call real API or simulate
  analyzeProductQuery(q).then(r=>{
    aiResult.innerHTML = '<pre style="white-space:pre-wrap;color:#dff4f8">'+r+'</pre>';
  }).catch(e=>{
    aiResult.textContent = 'AI analysis failed: ' + e.message;
  });
}

document.getElementById('aiAnalyze').addEventListener('click',()=>{
  const q = document.getElementById('aiQuery').value.trim();
  if(!q) return alert('Write a query for AI product research');
  simulateAI(q);
});

document.getElementById('checkout').addEventListener('click',()=>{
  if(!user) return alert('Please sign up / login before checkout');
  alert('Checked out! Order placed for ' + cart.length + ' items.');
  cart = [];
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartUI();
});

window.addEventListener('load',()=>{
  renderCategories();
  renderProducts();
  updateCartUI();
});