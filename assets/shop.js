/* ─────────────────────────────────────────────────────────────────
   SANMARTINO SHOP  ·  carrito · auth · detalle de producto
   ───────────────────────────────────────────────────────────────── */
(function () {
'use strict';

/* ── CONFIGURACIÓN ─────────────────────────────────────────────── */
const WA   = '5493584203393';
const SALT = 'sm-sanmartino-2026';
/*
  Para activar Google Sign-In:
  1. console.cloud.google.com → Credentials → OAuth 2.0 Client ID → Web application
  2. Agregá tu dominio (o http://localhost) en "Authorized JavaScript origins"
  3. Pegá el Client ID abajo
  NOTA: no funciona sobre file:// → usá Live Server en VS Code o un dominio real.
*/
const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com';

/* ── CATÁLOGO ──────────────────────────────────────────────────── */
const PRODUCTS = {
  'proline-pecho':   { line:'Línea ProLine',       tag:'Musculación profesional', name:'Pectorales / Hombros',      desc:'Press de pecho selectorado, contractor, apertura y elevaciones laterales. Estructura en acero pintado al horno con tapizado importado de alta densidad. Diseñada para trabajo de fuerza e hipertrofia en gimnasios comerciales.', images:['assets/fotos/proline1.jpg'], icon:'dumbbell', features:['Acero pintado al horno','Tapizado importado alta densidad','Selector con pasador de acero','Garantía de fábrica'] },
  'proline-espalda': { line:'Línea ProLine',       tag:'Musculación profesional', name:'Espalda / Poleas',           desc:'Jalón al pecho, polea baja, remo selectorado y pullover. Cables de acero de alta resistencia con poleas de acero inoxidable para movimientos fluidos y seguros durante miles de repeticiones.', images:['assets/fotos/proline2.jpg'], icon:'dumbbell', features:['Cables de acero de alta resistencia','Poleas inoxidables','Rango completo de movimiento','Ajuste fino de posición'] },
  'proline-piernas': { line:'Línea ProLine',       tag:'Musculación profesional', name:'Piernas / Abdominales',      desc:'Prensa, extensión, curl, aductor, abductor y abdominales selectorados. Diseño ergonómico que respeta la biomecánica natural de la rodilla, ideal para todos los niveles.', images:['assets/fotos/proline3.jpg'], icon:'dumbbell', features:['Diseño ergonómico certificado','Selector cromado','Protección lateral de seguridad','Tapizado antidesgarros'] },
  'max-pecho':       { line:'Línea Max',           tag:'Alta resistencia',        name:'Press de Pecho Max',         desc:'Estructura extra-reforzada para cargas máximas con sistema de selector doble. Diseñada para soportar uso intensivo en gimnasios de alto volumen sin perder precisión ni seguridad.', images:[], icon:'zap', features:['Caño de mayor calibre','Selector doble hasta 120 kg','Soportes antidesgaste','Apto uso comercial intensivo'] },
  'max-jalon':       { line:'Línea Max',           tag:'Alta resistencia',        name:'Jalón Max',                  desc:'Polea de alta capacidad con cable de acero trenzado y selector de 120 kg. La versión reforzada de nuestro jalón clásico, preparada para el uso continuo más exigente.', images:[], icon:'zap', features:['Cable de acero trenzado','Selector hasta 120 kg','Polea de alta resistencia','Asiento regulable'] },
  'max-prensa':      { line:'Línea Max',           tag:'Alta resistencia',        name:'Prensa de Piernas Max',      desc:'Capacidad de hasta 400 kg con guías de teflón y angulación de 45°. La máquina más robusta de nuestra línea, ideal para powerlifters y gimnasios de rendimiento.', images:[], icon:'zap', features:['Capacidad hasta 400 kg','Guías de teflón','Angulación óptima 45°','Topes de seguridad dobles'] },
  'palanca-pecho':   { line:'Línea a Palanca',     tag:'Biomecánica optimizada',  name:'Press de Pecho a Palanca',   desc:'Movimiento convergente que reproduce el patrón natural del pecho. Compatible con discos olímpicos estándar. Menor stress articular que las máquinas de cable tradicionales.', images:['assets/fotos/palanca1.jpg'], icon:'activity', features:['Compatible con discos olímpicos','Movimiento convergente natural','Menor stress articular','Ideal para rehabilitación'] },
  'palanca-espalda': { line:'Línea a Palanca',     tag:'Biomecánica optimizada',  name:'Espalda a Palanca',          desc:'Remo y jalón con tecnología de palanca para máxima activación muscular. El movimiento de arco reproduce el patrón natural de la espalda distribuyendo la carga eficientemente.', images:[], icon:'activity', features:['Remo con arco natural','Jalón convergente','Agarre multiprisión','Compatible con olímpico'] },
  'palanca-piernas': { line:'Línea a Palanca',     tag:'Biomecánica optimizada',  name:'Piernas a Palanca',          desc:'Curl femoral, extensión y sentadilla con biomecánica libre de impacto. El sistema de palanca elimina el estrés de inicio que generan los selectores tradicionales.', images:[], icon:'activity', features:['Sin estrés de inicio','Curl y extensión integrados','Guías de precisión','Múltiples ángulos de trabajo'] },
  'aerobica-cintas':     { line:'Línea Aeróbica',  tag:'Cardio & resistencia',    name:'Cintas de Correr',           desc:'Motor AC silencioso de alta potencia, superficie de amortiguación multicapa y panel digital LCD. Ideal para uso comercial continuo en gimnasios con alto flujo de usuarios.', images:['assets/fotos/cardio1.jpg'], icon:'bike', features:['Motor AC silencioso','Amortiguación multicapa','Panel LCD con métricas','Apto uso comercial'] },
  'aerobica-bicicletas': { line:'Línea Aeróbica',  tag:'Cardio & resistencia',    name:'Bicicletas Ergométricas',    desc:'Verticales y horizontales con resistencia magnética y display de calorías, tiempo y frecuencia cardíaca. Diseño ergonómico con asiento regulable en múltiples posiciones.', images:['assets/fotos/cardio2.jpg'], icon:'bike', features:['Resistencia magnética silenciosa','Sensor de frecuencia cardíaca','Asiento multirregulable','Display LCD 5 en 1'] },
  'aerobica-elipticos':  { line:'Línea Aeróbica',  tag:'Cardio & resistencia',    name:'Elípticos & Trepadoras',     desc:'Zero impacto articular, movimiento fluido y resistencia electromagnética regulable. Los elípticos Sanmartino combinan bicicleta y caminadora para un cardio completo.', images:['assets/fotos/cardio3.jpg'], icon:'bike', features:['Zero impacto articular','Movimiento natural pendular','Resistencia electromagnética','Brazo de impulso doble'] },
  'hogar-banco':   { line:'Línea Hogar',           tag:'Entrenamiento en casa',   name:'Banco Regulable Hogar',      desc:'Múltiples posiciones de inclinación, estructura compacta ideal para mancuernas. Misma solidez de fabricación que nuestros equipos de gimnasio en tamaño doméstico.', images:['assets/fotos/hogar1.jpg'], icon:'home', features:['5 posiciones de inclinación','Tapizado antidesgarros','Plegado rápido','Capacidad 150 kg'] },
  'hogar-multi':   { line:'Línea Hogar',           tag:'Entrenamiento en casa',   name:'Multifuerza Hogar',          desc:'Máquina multifunción para trabajar todo el cuerpo en poco espacio. Pecho, espalda, bíceps, tríceps y piernas en una sola máquina compacta para el hogar.', images:[], icon:'home', features:['7 ejercicios en 1','Plegado en 40 cm','Sistema de poleas integrado','Hasta 100 kg de resistencia'] },
  'hogar-cardio':  { line:'Línea Hogar',           tag:'Entrenamiento en casa',   name:'Bicicleta & Cinta Hogar',    desc:'Versiones compactas de menor tamaño, perfectas para usar en casa. Plegado rápido y ruedas de transporte. La misma calidad de fabricación en un formato que cabe en tu habitación.', images:[], icon:'home', features:['Plegado rápido','Ruedas de transporte','Pantalla LCD básica','Silencioso para departamento'] },
  'funcional-racks':       { line:'Funcional & CrossFit', tag:'Entrenamiento funcional', name:'Racks & Jaulas',          desc:'Racks de sentadilla, jaulas de potencia y torres multifunción para halterofilia y powerlifting. Estructura de acero de alta resistencia con múltiples puntos de anclaje.', images:['assets/fotos/funcional1.jpg'], icon:'flame', features:['Acero 3 mm de espesor','Múltiples alturas de J-hooks','Barras de dominadas incluidas','Anclaje al piso disponible'] },
  'funcional-pesos':       { line:'Funcional & CrossFit', tag:'Entrenamiento funcional', name:'Pesos Libres',             desc:'Mancuernas hexagonales, kettlebells, discos olímpicos y barras de todos los pesos. Stock permanente disponible con precios mayoristas para equipar tu box completo.', images:['assets/fotos/funcional2.jpg'], icon:'flame', features:['Mancuernas 1 kg a 50 kg','Kettlebells de fundición','Barras olímpicas certificadas','Discos con recubrimiento de goma'] },
  'funcional-plataformas': { line:'Funcional & CrossFit', tag:'Entrenamiento funcional', name:'Plataformas & Boxes',      desc:'Plataformas de levantamiento de madera laminada, boxes pliométricos en 3 alturas y battle ropes de cáñamo. Todo para montar un box de CrossFit profesional.', images:['assets/fotos/funcional3.jpg'], icon:'flame', features:['Plataforma madera laminada','Box pliométrico 3 alturas','Battle rope 15 m','Anillas de suspensión'] },
  'aire-circuito': { line:'Aire Libre',            tag:'Espacios exteriores',     name:'Circuito de Parques',        desc:'Módulos de ejercicio para espacios públicos y plazas. Certificados para uso público permanente, con pintura electrostática resistente a rayos UV y humedad.', images:[], icon:'sun', features:['Certificado uso público','Pintura electrostática UV','Sin partes móviles complejas','Instalación en hormigón'] },
  'aire-outdoor':  { line:'Aire Libre',            tag:'Espacios exteriores',     name:'Equipos Outdoor',            desc:'Máquinas selectoradas con tratamiento anticorrosión total para instalación permanente en exteriores. Hoteles, condominios, clubes y espacios deportivos abiertos.', images:[], icon:'sun', features:['Anticorrosión total','Apto agua y humedad','Mantenimiento mínimo','Vida útil +10 años'] },
  'aire-barras':   { line:'Aire Libre',            tag:'Espacios exteriores',     name:'Juegos de Barras',           desc:'Barras de dominadas, paralelas y estaciones de calistenia outdoor. Tubos de acero galvanizado con anclaje profundo al suelo. Ideal para parques corporales.', images:[], icon:'sun', features:['Acero galvanizado','Anclaje profundo certificado','Alturas variables','Pintura antideslizante'] },
  'acc-protecciones': { line:'Accesorios',         tag:'Complementos',            name:'Protecciones',               desc:'Muñequeras, tobilleras, fajas lumbares y guantes de entrenamiento de alta calidad. Complementá tu sesión con protección profesional al mejor precio.', images:[], icon:'package', features:['Stock permanente','Material respirable','Múltiples talles','Precio accesible'] },
  'acc-elementos':    { line:'Accesorios',         tag:'Complementos',            name:'Elementos de Entrenamiento', desc:'Sogas de saltar, steps, colchonetas, bandas de resistencia y TRX. Todo para complementar el entrenamiento funcional y de flexibilidad en tu gimnasio.', images:[], icon:'package', features:['Bandas 5 resistencias','Steps regulables','TRX profesional','Colchonetas 10 mm'] },
  'acc-mobiliario':   { line:'Accesorios',         tag:'Complementos',            name:'Mobiliario de Gimnasio',     desc:'Espejos de pared templados, soportes de discos, porta-mancuernas piramidal y bebederos. Todo lo que necesitás para terminar de equipar tu gimnasio con calidad profesional.', images:[], icon:'package', features:['Espejos templados 4 mm','Porta-disco de 10 pares','Porta-mancuernas piramidal','Instalación disponible'] }
};

/* ── AUTH — email/password local ──────────────────────────────── */
function hashPwd(email, pwd) {
  return btoa(unescape(encodeURIComponent(email.toLowerCase() + ':' + pwd + ':' + SALT)));
}
function getAccounts() { try { return JSON.parse(localStorage.getItem('sm_accounts') || '[]'); } catch { return []; } }
function saveAccounts(a) { localStorage.setItem('sm_accounts', JSON.stringify(a)); }

function loginEmail() {
  const email = val('sm-login-email'), pwd = val('sm-login-pwd');
  const err = document.getElementById('sm-login-err');
  err.textContent = '';
  if (!email || !pwd) { err.textContent = 'Completá todos los campos.'; return; }
  const acc = getAccounts().find(a => a.email === email.toLowerCase());
  if (!acc)              { err.textContent = 'No existe una cuenta con ese email.'; return; }
  if (acc.hash !== hashPwd(email, pwd)) { err.textContent = 'Contraseña incorrecta.'; return; }
  setUser({ name: acc.name, email: acc.email, picture: acc.picture });
  afterAuth();
}

function registerEmail() {
  const name = val('sm-reg-name'), email = val('sm-reg-email');
  const pwd  = val('sm-reg-pwd'),  pwd2  = val('sm-reg-pwd2');
  const err  = document.getElementById('sm-reg-err');
  err.textContent = '';
  if (!name || !email || !pwd || !pwd2) { err.textContent = 'Completá todos los campos.'; return; }
  if (pwd.length < 6)  { err.textContent = 'La contraseña debe tener al menos 6 caracteres.'; return; }
  if (pwd !== pwd2)    { err.textContent = 'Las contraseñas no coinciden.'; return; }
  const accs = getAccounts();
  if (accs.find(a => a.email === email.toLowerCase())) { err.textContent = 'Ya existe una cuenta con ese email.'; return; }
  const picture = `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=FF6600&color=080808&bold=true&size=96`;
  accs.push({ name, email: email.toLowerCase(), hash: hashPwd(email, pwd), picture });
  saveAccounts(accs);
  setUser({ name, email: email.toLowerCase(), picture });
  afterAuth();
}

function val(id) { return (document.getElementById(id)?.value || '').trim(); }

function afterAuth() {
  closeLogin();
  const pendingEl = document.getElementById('sm-login-pending');
  const pid = pendingEl?.dataset?.pending;
  if (pid) { delete pendingEl.dataset.pending; addToCart(pid); }
}

/* ── AUTH — Google ────────────────────────────────────────────── */
window.handleGoogleCredential = function(resp) {
  try {
    const raw  = resp.credential.split('.')[1].replace(/-/g,'+').replace(/_/g,'/');
    const p    = JSON.parse(atob(raw));
    // Registrar cuenta Google si no existe
    const accs = getAccounts();
    if (!accs.find(a => a.email === p.email.toLowerCase())) {
      accs.push({ name: p.name, email: p.email.toLowerCase(), hash: null, picture: p.picture });
      saveAccounts(accs);
    }
    setUser({ name: p.name, email: p.email, picture: p.picture });
    afterAuth();
  } catch(e) { console.error('Auth error', e); }
};

function initGoogleAuth() {
  if (!window.google?.accounts?.id) return;
  google.accounts.id.initialize({ client_id: GOOGLE_CLIENT_ID, callback: window.handleGoogleCredential, auto_select: false });
}
function renderGoogleBtn() {
  const el = document.getElementById('sm-google-btn');
  if (!el || el.hasChildNodes() || !window.google?.accounts?.id) return;
  google.accounts.id.renderButton(el, { theme:'filled_black', size:'large', text:'signin_with', locale:'es', width:320 });
}

/* ── AUTH — session ───────────────────────────────────────────── */
function getUser()  { try { return JSON.parse(localStorage.getItem('sm_user') || 'null'); } catch { return null; } }
function setUser(u) { localStorage.setItem('sm_user', JSON.stringify(u)); renderAuthUI(); }
function doLogout() {
  const u = getUser();
  if (u && window.google?.accounts?.id) google.accounts.id.revoke(u.email || '', ()=>{});
  localStorage.removeItem('sm_user'); renderAuthUI();
}

function switchTab(tab) {
  const login = document.getElementById('sm-panel-login');
  const reg   = document.getElementById('sm-panel-register');
  const btnL  = document.getElementById('sm-tab-btn-login');
  const btnR  = document.getElementById('sm-tab-btn-register');
  if (!login || !reg) return;
  if (tab === 'login') {
    login.style.display = ''; reg.style.display = 'none';
    btnL?.classList.add('active'); btnR?.classList.remove('active');
  } else {
    login.style.display = 'none'; reg.style.display = '';
    btnR?.classList.add('active'); btnL?.classList.remove('active');
  }
}

/* ── CART ──────────────────────────────────────────────────────── */
function getCart()      { try { return JSON.parse(localStorage.getItem('sm_cart') || '[]'); } catch { return []; } }
function saveCart(cart) { localStorage.setItem('sm_cart', JSON.stringify(cart)); updateBadge(); }

function addToCart(pid) {
  const p = PRODUCTS[pid]; if (!p) return;
  const cart = getCart(), item = cart.find(i => i.id === pid);
  if (item) { item.qty++; } else { cart.push({ id:pid, name:p.name, line:p.line, qty:1, image:p.images[0]||null, icon:p.icon }); }
  saveCart(cart); renderCart(); openCart();
}
function addToCartDirect(pid) { addToCart(pid); }   // desde tarjeta, sin modal
function removeFromCart(pid)  { saveCart(getCart().filter(i => i.id !== pid)); renderCart(); }
function updateQty(pid, d)    {
  const cart = getCart(), item = cart.find(i => i.id === pid);
  if (!item) return; item.qty = Math.max(1, item.qty + d); saveCart(cart); renderCart();
}
function clearCart() { saveCart([]); renderCart(); }

function updateBadge() {
  const n = getCart().reduce((s,i) => s + i.qty, 0);
  document.querySelectorAll('.sm-cart-badge').forEach(el => { el.textContent = n; el.style.display = n ? 'flex' : 'none'; });
}

function buildWAMsg() {
  const cart = getCart(); if (!cart.length) return '';
  let msg = 'Hola! Me gustaría consultar disponibilidad y precio de:\n\n';
  cart.forEach(i => { msg += `• ${i.name} (${i.line}) x${i.qty}\n`; });
  msg += '\n¿Pueden darme presupuesto?';
  return encodeURIComponent(msg);
}

/* ── CART UI ───────────────────────────────────────────────────── */
function renderCart() {
  const list   = document.getElementById('sm-cart-list');
  const footer = document.getElementById('sm-cart-footer');
  if (!list) return;
  const cart = getCart(), user = getUser();
  if (!cart.length) {
    list.innerHTML = `<div class="sm-cart-empty">
      <svg xmlns="http://www.w3.org/2000/svg" width="44" height="44" viewBox="0 0 24 24" fill="none" stroke="rgba(255,102,0,0.22)" stroke-width="1.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      <p>Tu carrito está vacío</p><span>Explorá el catálogo y agregá productos</span></div>`;
    if (footer) footer.style.display = 'none';
  } else {
    list.innerHTML = cart.map(item => `
      <div class="sm-cart-item">
        <div class="sm-cart-thumb">${item.image
          ? `<img src="${item.image}" alt="${item.name}">`
          : `<svg data-lucide="${item.icon}" style="width:22px;height:22px;stroke:rgba(255,102,0,0.55);fill:none;"></svg>`}</div>
        <div class="sm-cart-item-info">
          <div class="sm-cart-item-name">${item.name}</div>
          <div class="sm-cart-item-line">${item.line}</div>
        </div>
        <div class="sm-cart-qty">
          <button onclick="Shop.updateQty('${item.id}',-1)">−</button>
          <span>${item.qty}</span>
          <button onclick="Shop.updateQty('${item.id}',1)">+</button>
        </div>
        <button class="sm-cart-remove" onclick="Shop.removeFromCart('${item.id}')" title="Eliminar">✕</button>
      </div>`).join('');
    if (footer) {
      footer.style.display = 'block';
      footer.innerHTML = `
        ${user ? `<div class="sm-cart-user-info"><img src="${user.picture}" class="sm-ava-sm"> Pedido de <strong>${user.name.split(' ')[0]}</strong></div>` : ''}
        <a href="https://wa.me/${WA}?text=${buildWAMsg()}" target="_blank" class="sm-wa-btn">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="#fff"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
          Consultar por WhatsApp
        </a>
        <button class="sm-clear-cart" onclick="Shop.clearCart()">Vaciar carrito</button>`;
    }
  }
  if (window.lucide) lucide.createIcons();
}

/* ── OPEN / CLOSE ──────────────────────────────────────────────── */
function openCart()   { toggle('sm-cart-drawer','sm-cart-overlay',true); }
function closeCart()  { toggle('sm-cart-drawer','sm-cart-overlay',false); }
function openLogin(pendingPid) {
  toggle('sm-login-modal','sm-login-overlay',true);
  if (pendingPid) { const el=document.getElementById('sm-login-pending'); if(el) el.dataset.pending=pendingPid; }
  setTimeout(renderGoogleBtn, 140);
}
function closeLogin() { toggle('sm-login-modal','sm-login-overlay',false); }

function toggle(panelId, overlayId, open) {
  document.getElementById(panelId)?.classList.toggle('open', open);
  document.getElementById(overlayId)?.classList.toggle('open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}

/* ── AUTH UI ───────────────────────────────────────────────────── */
function renderAuthUI() {
  const user = getUser();
  document.querySelectorAll('.sm-auth-area').forEach(area => {
    area.innerHTML = user
      ? `<div class="sm-user-pill">
           <img src="${user.picture}" class="sm-user-avatar" alt="${user.name}">
           <span>${user.name.split(' ')[0]}</span>
           <button onclick="Shop.doLogout()" title="Cerrar sesión">
             <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
           </button>
         </div>`
      : `<button class="sm-login-btn" onclick="Shop.openLogin()">Ingresar</button>`;
  });
}

/* ── PRODUCT MODAL ─────────────────────────────────────────────── */
let currentPid = null, slide = 0;

function openProduct(pid) {
  const p = PRODUCTS[pid]; if (!p) return;
  currentPid = pid; slide = 0;
  const modal = document.getElementById('sm-product-modal'); if (!modal) return;
  document.getElementById('sm-prod-tag').textContent  = p.tag;
  document.getElementById('sm-prod-line').textContent = p.line;
  document.getElementById('sm-prod-name').textContent = p.name;
  document.getElementById('sm-prod-desc').textContent = p.desc;
  document.getElementById('sm-prod-features').innerHTML =
    p.features.map(f => `<li><svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#FF6600" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${f}</li>`).join('');
  renderCarousel(p);
  toggle('sm-product-modal','sm-product-overlay',true);
  if (window.lucide) lucide.createIcons();
}

function renderCarousel(p) {
  const imgEl    = document.getElementById('sm-carousel-img');
  const iconWrap = document.getElementById('sm-carousel-icon-wrap');
  const dotsEl   = document.getElementById('sm-carousel-dots');
  const arrows   = document.querySelectorAll('.sm-c-arrow');
  if (p.images?.length) {
    imgEl.style.display = 'block'; iconWrap.style.display = 'none';
    imgEl.src = p.images[0]; imgEl.alt = p.name;
    const multi = p.images.length > 1;
    dotsEl.innerHTML = multi ? p.images.map((_,i) =>
      `<button class="sm-dot${i===0?' active':''}" onclick="Shop.setSlide(${i})"></button>`).join('') : '';
    arrows.forEach(a => a.style.display = multi ? 'flex' : 'none');
  } else {
    imgEl.style.display = 'none'; iconWrap.style.display = 'flex';
    iconWrap.innerHTML = `<svg data-lucide="${p.icon}" style="width:88px;height:88px;stroke:rgba(255,102,0,0.4);fill:none;"></svg>`;
    dotsEl.innerHTML = ''; arrows.forEach(a => a.style.display = 'none');
    if (window.lucide) lucide.createIcons();
  }
}

function setSlide(i) {
  const p = PRODUCTS[currentPid]; if (!p) return; slide = i;
  const imgEl = document.getElementById('sm-carousel-img');
  if (imgEl) imgEl.src = p.images[i];
  document.querySelectorAll('.sm-dot').forEach((d,idx) => d.classList.toggle('active', idx===i));
}
function prevSlide() { const p=PRODUCTS[currentPid]; if(p?.images.length) setSlide((slide-1+p.images.length)%p.images.length); }
function nextSlide() { const p=PRODUCTS[currentPid]; if(p?.images.length) setSlide((slide+1)%p.images.length); }
function closeProduct() { toggle('sm-product-modal','sm-product-overlay',false); currentPid=null; }
function addCurrentToCart() { if (currentPid) addToCart(currentPid); }   // sin require login

/* ── CSS ───────────────────────────────────────────────────────── */
function injectStyles() {
  const css = `
  /* ─ NAV CART BTN ─ */
  .sm-cart-nav-btn { position:relative; background:none; border:none; cursor:pointer; padding:4px 6px; display:flex; align-items:center; color:var(--light,#ccc); transition:color .2s; }
  .sm-cart-nav-btn:hover { color:#FF6600; }
  .sm-cart-badge { position:absolute; top:-5px; right:-6px; background:#FF6600; color:#080808; font-size:.58rem; font-weight:800; min-width:17px; height:17px; border-radius:50%; display:none; align-items:center; justify-content:center; font-family:'Montserrat',sans-serif; padding:0 3px; }

  /* ─ AUTH ─ */
  .sm-auth-area { display:flex; align-items:center; }
  .sm-login-btn { background:#f0ede8; color:#080808; padding:.6rem 1.6rem; border-radius:6px; border:none; font-family:'Montserrat',sans-serif; font-size:.8rem; font-weight:800; letter-spacing:.5px; cursor:pointer; transition:background .2s; white-space:nowrap; }
  .sm-login-btn:hover { background:#dedad4; }
  .sm-user-pill { display:flex; align-items:center; gap:.45rem; background:rgba(255,102,0,0.09); border:1px solid rgba(255,102,0,0.2); border-radius:100px; padding:3px 10px 3px 3px; }
  .sm-user-avatar { width:26px; height:26px; border-radius:50%; object-fit:cover; }
  .sm-ava-sm { width:20px; height:20px; border-radius:50%; object-fit:cover; }
  .sm-user-pill > span { font-size:.74rem; font-weight:600; color:#FF6600; font-family:'Montserrat',sans-serif; }
  .sm-user-pill > button { background:none; border:none; cursor:pointer; color:#666; padding:2px; display:flex; transition:color .2s; }
  .sm-user-pill > button:hover { color:#FF6600; }

  /* ─ OVERLAY ─ */
  .sm-overlay { position:fixed; inset:0; background:rgba(0,0,0,.75); z-index:2000; opacity:0; pointer-events:none; transition:opacity .3s; backdrop-filter:blur(5px); }
  .sm-overlay.open { opacity:1; pointer-events:all; }

  /* ─ CART DRAWER ─ */
  .sm-cart-drawer { position:fixed; top:0; right:0; bottom:0; width:380px; max-width:100vw; background:#0f0f0f; z-index:2001; transform:translateX(100%); transition:transform .35s cubic-bezier(.32,0,.15,1); display:flex; flex-direction:column; border-left:1px solid rgba(255,102,0,0.14); }
  .sm-cart-drawer.open { transform:translateX(0); }
  .sm-cart-header { display:flex; justify-content:space-between; align-items:center; padding:1.3rem 1.5rem; border-bottom:1px solid rgba(255,255,255,.06); flex-shrink:0; }
  .sm-cart-header h3 { font-family:'Montserrat',sans-serif; font-size:.85rem; font-weight:700; text-transform:uppercase; letter-spacing:2px; color:#fff; }
  .sm-close-x { background:none; border:none; color:#666; font-size:1.2rem; cursor:pointer; padding:4px 6px; transition:color .2s; }
  .sm-close-x:hover { color:#FF6600; }
  #sm-cart-list { flex:1; overflow-y:auto; padding:1rem 1.5rem; scrollbar-width:thin; scrollbar-color:rgba(255,102,0,.25) transparent; }
  .sm-cart-empty { display:flex; flex-direction:column; align-items:center; justify-content:center; gap:.8rem; height:220px; text-align:center; }
  .sm-cart-empty p { font-family:'Montserrat',sans-serif; font-size:.82rem; color:#666; font-weight:600; }
  .sm-cart-empty span { font-family:'Montserrat',sans-serif; font-size:.72rem; color:#444; }
  .sm-cart-item { display:flex; align-items:center; gap:.8rem; padding:.85rem 0; border-bottom:1px solid rgba(255,255,255,.05); }
  .sm-cart-thumb { width:48px; height:48px; border-radius:8px; background:#1c1c1c; flex-shrink:0; display:flex; align-items:center; justify-content:center; overflow:hidden; }
  .sm-cart-thumb img { width:100%; height:100%; object-fit:cover; }
  .sm-cart-item-info { flex:1; min-width:0; }
  .sm-cart-item-name { font-family:'Montserrat',sans-serif; font-size:.77rem; font-weight:700; color:#fff; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; }
  .sm-cart-item-line { font-family:'Montserrat',sans-serif; font-size:.67rem; color:#FF6600; margin-top:2px; }
  .sm-cart-qty { display:flex; align-items:center; gap:.35rem; }
  .sm-cart-qty button { background:rgba(255,255,255,.07); border:none; color:#ccc; width:24px; height:24px; border-radius:4px; cursor:pointer; font-size:1rem; display:flex; align-items:center; justify-content:center; transition:background .2s; }
  .sm-cart-qty button:hover { background:rgba(255,102,0,.22); color:#fff; }
  .sm-cart-qty span { font-family:'Montserrat',sans-serif; font-size:.78rem; font-weight:700; color:#fff; width:20px; text-align:center; }
  .sm-cart-remove { background:none; border:none; color:#3a3a3a; cursor:pointer; font-size:.85rem; padding:4px 6px; transition:color .2s; }
  .sm-cart-remove:hover { color:#ff4444; }
  #sm-cart-footer { padding:1.2rem 1.5rem; border-top:1px solid rgba(255,255,255,.06); flex-shrink:0; }
  .sm-cart-user-info { font-family:'Montserrat',sans-serif; font-size:.71rem; color:#666; margin-bottom:.8rem; display:flex; align-items:center; gap:.4rem; }
  .sm-wa-btn { display:flex; align-items:center; justify-content:center; gap:.5rem; background:#25D366; color:#fff; padding:.82rem; border-radius:8px; font-family:'Montserrat',sans-serif; font-size:.8rem; font-weight:700; text-decoration:none; transition:background .2s; }
  .sm-wa-btn:hover { background:#1ea952; }
  .sm-clear-cart { background:none; border:none; color:#444; font-family:'Montserrat',sans-serif; font-size:.68rem; cursor:pointer; margin-top:.75rem; text-decoration:underline; display:block; width:100%; text-align:center; transition:color .2s; }
  .sm-clear-cart:hover { color:#ff4444; }

  /* ─ AUTH MODAL ─ */
  .sm-login-modal { position:fixed; top:50%; left:50%; transform:translate(-50%,-50%) scale(.92); background:#181818; border:1px solid rgba(255,102,0,0.15); border-radius:20px; padding:2rem; z-index:2002; width:420px; max-width:92vw; opacity:0; pointer-events:none; transition:all .3s cubic-bezier(.34,1.46,.64,1); }
  .sm-login-modal.open { opacity:1; pointer-events:all; transform:translate(-50%,-50%) scale(1); }
  .sm-login-modal-close { position:absolute; top:.9rem; right:.9rem; background:rgba(255,255,255,.05); border:none; border-radius:50%; width:30px; height:30px; display:flex; align-items:center; justify-content:center; color:#777; font-size:1rem; cursor:pointer; transition:all .2s; }
  .sm-login-modal-close:hover { background:rgba(255,102,0,.12); color:#FF6600; }
  .sm-auth-logo-wrap { text-align:center; margin-bottom:1.2rem; }
  .sm-auth-logo { height:38px; object-fit:contain; filter:brightness(1.1); }
  #sm-google-btn { display:flex; justify-content:center; min-height:44px; margin-bottom:.2rem; }
  .sm-or-divider { display:flex; align-items:center; gap:.8rem; margin:.9rem 0; }
  .sm-or-divider::before,.sm-or-divider::after { content:''; flex:1; height:1px; background:rgba(255,255,255,.07); }
  .sm-or-divider span { font-family:'Montserrat',sans-serif; font-size:.62rem; color:#555; white-space:nowrap; letter-spacing:.5px; text-transform:uppercase; }
  .sm-auth-tabs { display:flex; gap:0; margin-bottom:1rem; background:rgba(255,255,255,.04); border-radius:9px; padding:3px; }
  .sm-tab { flex:1; padding:.5rem; border:none; background:transparent; color:#666; font-family:'Montserrat',sans-serif; font-size:.74rem; font-weight:700; cursor:pointer; border-radius:7px; transition:all .2s; text-transform:uppercase; letter-spacing:.5px; }
  .sm-tab.active { background:rgba(255,102,0,0.14); color:#FF6600; }
  .sm-tab-panel { display:flex; flex-direction:column; gap:.6rem; }
  .sm-input { width:100%; padding:.7rem .9rem; background:rgba(255,255,255,0.04); border:1px solid rgba(255,255,255,0.09); border-radius:8px; color:#fff; font-family:'Montserrat',sans-serif; font-size:.8rem; transition:border-color .2s; box-sizing:border-box; }
  .sm-input:focus { outline:none; border-color:rgba(255,102,0,0.4); background:rgba(255,102,0,0.04); }
  .sm-input::placeholder { color:#444; }
  .sm-submit-btn { width:100%; padding:.82rem; background:linear-gradient(135deg,#FF6600,#FF4400); border:none; border-radius:8px; color:#080808; font-family:'Montserrat',sans-serif; font-size:.82rem; font-weight:800; cursor:pointer; transition:all .2s; letter-spacing:.5px; margin-top:.2rem; }
  .sm-submit-btn:hover { transform:translateY(-1px); box-shadow:0 6px 18px rgba(255,102,0,.35); }
  .sm-form-err { font-family:'Montserrat',sans-serif; font-size:.71rem; color:#ff6b6b; text-align:center; min-height:1rem; }

  /* ─ PRODUCT MODAL ─ */
  .sm-product-modal { position:fixed; top:50%; left:50%; transform:translate(-50%,-50%) scale(.93); background:#141414; border:1px solid rgba(255,255,255,.07); border-radius:20px; z-index:2002; width:920px; max-width:95vw; max-height:88vh; opacity:0; pointer-events:none; transition:all .3s cubic-bezier(.34,1.2,.64,1); overflow:hidden; }
  .sm-product-modal.open { opacity:1; pointer-events:all; transform:translate(-50%,-50%) scale(1); }
  .sm-product-modal-close { position:absolute; top:.9rem; right:.9rem; background:rgba(0,0,0,.55); border:1px solid rgba(255,255,255,.1); border-radius:50%; width:34px; height:34px; display:flex; align-items:center; justify-content:center; color:#ccc; font-size:1.1rem; cursor:pointer; z-index:3; transition:all .2s; }
  .sm-product-modal-close:hover { background:rgba(255,102,0,.2); border-color:rgba(255,102,0,.4); color:#FF6600; }
  .sm-prod-inner { display:grid; grid-template-columns:1fr 1fr; max-height:88vh; }
  .sm-carousel-panel { background:#0d0d0d; display:flex; flex-direction:column; min-height:320px; }
  .sm-carousel-main { flex:1; position:relative; display:flex; align-items:center; justify-content:center; overflow:hidden; }
  #sm-carousel-img { width:100%; height:100%; object-fit:cover; display:block; }
  #sm-carousel-icon-wrap { width:100%; height:100%; display:flex; align-items:center; justify-content:center; background:linear-gradient(135deg,#1a1a1a,#252525); }
  .sm-c-arrow { position:absolute; top:50%; transform:translateY(-50%); background:rgba(0,0,0,.55); border:1px solid rgba(255,255,255,.1); border-radius:50%; width:38px; height:38px; display:flex; align-items:center; justify-content:center; cursor:pointer; color:#fff; font-size:1.4rem; transition:all .2s; z-index:2; line-height:1; }
  .sm-c-arrow:hover { background:rgba(255,102,0,.65); border-color:transparent; }
  .sm-c-prev { left:10px; } .sm-c-next { right:10px; }
  .sm-carousel-dots { display:flex; justify-content:center; gap:6px; padding:10px; background:#0d0d0d; }
  .sm-dot { width:7px; height:7px; border-radius:50%; border:none; background:rgba(255,255,255,.18); cursor:pointer; transition:background .2s; padding:0; }
  .sm-dot.active { background:#FF6600; }
  .sm-prod-info { padding:2rem; overflow-y:auto; display:flex; flex-direction:column; gap:.75rem; scrollbar-width:thin; scrollbar-color:rgba(255,102,0,.2) transparent; }
  .sm-prod-tag { font-family:'Montserrat',sans-serif; font-size:.58rem; font-weight:700; letter-spacing:3.5px; text-transform:uppercase; color:#FF6600; }
  .sm-prod-line-label { font-family:'Montserrat',sans-serif; font-size:.7rem; font-weight:600; color:#555; }
  .sm-prod-title { font-family:'Montserrat',sans-serif; font-size:1.45rem; font-weight:900; color:#fff; line-height:1.15; text-transform:uppercase; }
  .sm-prod-desc-text { font-family:'Montserrat',sans-serif; font-size:.8rem; color:#999; line-height:1.8; font-weight:300; }
  .sm-prod-feats { list-style:none; padding:0; display:flex; flex-direction:column; gap:.45rem; }
  .sm-prod-feats li { font-family:'Montserrat',sans-serif; font-size:.76rem; color:#ccc; font-weight:600; display:flex; align-items:center; gap:.5rem; }
  .sm-add-cart-btn { margin-top:auto; background:linear-gradient(135deg,#FF6600,#FF4400); color:#080808; padding:.9rem 1.5rem; border:none; border-radius:8px; font-family:'Montserrat',sans-serif; font-size:.8rem; font-weight:800; letter-spacing:.5px; text-transform:uppercase; cursor:pointer; transition:all .3s; display:flex; align-items:center; justify-content:center; gap:.5rem; }
  .sm-add-cart-btn:hover { transform:translateY(-2px); box-shadow:0 8px 24px rgba(255,102,0,.4); }

  /* ─ CARD ACTION BUTTONS ─ */
  .sm-card-actions { display:flex; gap:.45rem; margin-top:.75rem; padding-top:.75rem; border-top:1px solid rgba(255,255,255,0.05); }
  .sm-card-detail,.sm-card-add { flex:1; padding:.48rem .4rem; border-radius:6px; font-family:'Montserrat',sans-serif; font-size:.65rem; font-weight:700; cursor:pointer; transition:all .22s; text-transform:uppercase; letter-spacing:.3px; border:1px solid; text-align:center; }
  .sm-card-detail { background:transparent; border-color:rgba(255,255,255,.1); color:#999; }
  .sm-card-detail:hover { border-color:rgba(255,102,0,.35); color:#FF6600; background:rgba(255,102,0,0.05); }
  .sm-card-add { background:rgba(255,102,0,0.1); border-color:rgba(255,102,0,0.22); color:#FF6600; }
  .sm-card-add:hover { background:#FF6600; color:#080808; border-color:transparent; }
  .cat-item[data-product] { cursor:pointer; }

  /* ─ RESPONSIVE ─ */
  @media (max-width:680px) {
    .sm-prod-inner { grid-template-columns:1fr; }
    .sm-carousel-panel { max-height:220px; }
    .sm-prod-info { padding:1.2rem; max-height:50vh; }
  }`;
  const s = document.createElement('style'); s.textContent = css;
  document.head.appendChild(s);
}

/* ── HTML INJECTION ────────────────────────────────────────────── */
function injectHTML() {
  document.body.insertAdjacentHTML('beforeend', `
    <div class="sm-overlay" id="sm-cart-overlay" onclick="Shop.closeCart()"></div>
    <div class="sm-cart-drawer" id="sm-cart-drawer">
      <div class="sm-cart-header"><h3>Tu Carrito</h3><button class="sm-close-x" onclick="Shop.closeCart()">✕</button></div>
      <div id="sm-cart-list"></div>
      <div id="sm-cart-footer" style="display:none;"></div>
    </div>

    <div class="sm-overlay" id="sm-login-overlay" onclick="Shop.closeLogin()"></div>
    <div class="sm-login-modal" id="sm-login-modal">
      <button class="sm-login-modal-close" onclick="Shop.closeLogin()">✕</button>

      <div class="sm-auth-logo-wrap">
        <img src="assets/logoNuevoSinFondo.png" alt="Sanmartino" class="sm-auth-logo">
      </div>

      <div id="sm-google-btn"></div>

      <div class="sm-or-divider"><span>o continuá con email</span></div>

      <div class="sm-auth-tabs">
        <button class="sm-tab active" id="sm-tab-btn-login"    onclick="Shop.switchTab('login')">Ingresar</button>
        <button class="sm-tab"        id="sm-tab-btn-register" onclick="Shop.switchTab('register')">Crear cuenta</button>
      </div>

      <div class="sm-tab-panel" id="sm-panel-login">
        <input type="email"    class="sm-input" id="sm-login-email" placeholder="Correo electrónico" autocomplete="email">
        <input type="password" class="sm-input" id="sm-login-pwd"   placeholder="Contraseña"         autocomplete="current-password">
        <button class="sm-submit-btn" onclick="Shop.loginEmail()">Ingresar →</button>
        <p class="sm-form-err" id="sm-login-err"></p>
      </div>

      <div class="sm-tab-panel" id="sm-panel-register" style="display:none;">
        <input type="text"     class="sm-input" id="sm-reg-name"  placeholder="Tu nombre completo"        autocomplete="name">
        <input type="email"    class="sm-input" id="sm-reg-email" placeholder="Correo electrónico"         autocomplete="email">
        <input type="password" class="sm-input" id="sm-reg-pwd"   placeholder="Contraseña (mín. 6 caracteres)" autocomplete="new-password">
        <input type="password" class="sm-input" id="sm-reg-pwd2"  placeholder="Repetir contraseña"         autocomplete="new-password">
        <button class="sm-submit-btn" onclick="Shop.registerEmail()">Crear cuenta →</button>
        <p class="sm-form-err" id="sm-reg-err"></p>
      </div>

      <div id="sm-login-pending" style="display:none;"></div>
    </div>

    <div class="sm-overlay" id="sm-product-overlay" onclick="Shop.closeProduct()"></div>
    <div class="sm-product-modal" id="sm-product-modal">
      <button class="sm-product-modal-close" onclick="Shop.closeProduct()">✕</button>
      <div class="sm-prod-inner">
        <div class="sm-carousel-panel">
          <div class="sm-carousel-main">
            <img id="sm-carousel-img" src="" alt="" style="display:none;">
            <div id="sm-carousel-icon-wrap" style="display:none;"></div>
            <button class="sm-c-arrow sm-c-prev" onclick="Shop.prevSlide()">‹</button>
            <button class="sm-c-arrow sm-c-next" onclick="Shop.nextSlide()">›</button>
          </div>
          <div id="sm-carousel-dots" class="sm-carousel-dots"></div>
        </div>
        <div class="sm-prod-info">
          <div class="sm-prod-tag" id="sm-prod-tag"></div>
          <div class="sm-prod-line-label" id="sm-prod-line"></div>
          <h2 class="sm-prod-title" id="sm-prod-name"></h2>
          <p class="sm-prod-desc-text" id="sm-prod-desc"></p>
          <ul class="sm-prod-feats" id="sm-prod-features"></ul>
          <button class="sm-add-cart-btn" onclick="Shop.addCurrentToCart()">
            <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>`);
}

/* ── NAV ITEMS ─────────────────────────────────────────────────── */
function injectNavItems() {
  const nav = document.querySelector('.nav-links');
  if (!nav || nav.querySelector('.sm-cart-nav-btn')) return;
  const last = nav.querySelector('li:last-child');

  // Auth area ANTES de Contactar
  const authLi = document.createElement('li');
  authLi.innerHTML = '<div class="sm-auth-area"></div>';
  nav.insertBefore(authLi, last);

  // Carrito AL FINAL (después de Contactar)
  const cartLi = document.createElement('li');
  cartLi.innerHTML = `<button class="sm-cart-nav-btn" onclick="Shop.openCart()" title="Tu carrito">
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
    <span class="sm-cart-badge">0</span>
  </button>`;
  nav.appendChild(cartLi);
}

/* ── CARD BUTTONS ──────────────────────────────────────────────── */
function injectCardButtons() {
  document.querySelectorAll('.cat-item[data-product]').forEach(el => {
    const pid  = el.dataset.product;
    const body = el.querySelector('.cat-item-body');
    if (!body || body.querySelector('.sm-card-actions')) return;
    body.insertAdjacentHTML('beforeend', `
      <div class="sm-card-actions">
        <button class="sm-card-detail" onclick="event.stopPropagation();Shop.openProduct('${pid}')">Ver detalles</button>
        <button class="sm-card-add"    onclick="event.stopPropagation();Shop.addToCartDirect('${pid}')">+ Carrito</button>
      </div>`);
  });
}

/* ── PRODUCT CLICK ─────────────────────────────────────────────── */
function attachListeners() {
  document.querySelectorAll('.cat-item[data-product]').forEach(el => {
    el.addEventListener('click', () => Shop.openProduct(el.dataset.product));
  });
}

/* ── INIT ──────────────────────────────────────────────────────── */
function init() {
  injectStyles(); injectHTML(); injectNavItems();
  injectCardButtons(); attachListeners();
  const gs = document.createElement('script');
  gs.src = 'https://accounts.google.com/gsi/client';
  gs.async = true; gs.defer = true; gs.onload = initGoogleAuth;
  document.head.appendChild(gs);
  renderAuthUI(); renderCart(); updateBadge();
}

/* ── PUBLIC API ────────────────────────────────────────────────── */
window.Shop = {
  openCart, closeCart, openLogin, closeLogin,
  openProduct, closeProduct, addCurrentToCart,
  prevSlide, nextSlide, setSlide,
  addToCart, addToCartDirect, removeFromCart, updateQty, clearCart,
  doLogout, loginEmail, registerEmail, switchTab
};

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();

})();
