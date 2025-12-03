document.addEventListener("DOMContentLoaded", () => {
    
  const hamburgerBtn = document.getElementById('hamburgerBtn');
  const navOverlay = document.getElementById('navOverlay');
  const mobileNav = document.getElementById('mobileNav');
  const desktopNav = document.getElementById('desktopNav');
  const mobileButtonsContainer = document.querySelector('.nav-mobile-buttons');

  const columnsContainer = document.getElementById("columnsContainer");
  const mainTitle = document.getElementById("mainTitle");
  const subcategoriesContainer = document.getElementById("subcategoriesContainer");
  const mainMenuContainer = document.getElementById("mainMenuContainer");
  const menuContainer = document.getElementById("menu-container") || mainMenuContainer;
  
  const photoModal = document.getElementById("photoModal");
  const modalImage = document.getElementById("modalImage");
  const modalTitle = document.getElementById("modalTitle");
  const modalDesc = document.getElementById("modalDesc");
  const modalPrice = document.getElementById("modalPrice");
  const closeModal = document.getElementById("closeModal");
  
  const cartaBtn = document.getElementById("cartaBtn");
  const cartaContainer = document.getElementById("cartaContainer");
  const pdfViewer = document.getElementById("pdfViewer");
  const backFromCartaBtn = document.getElementById("backFromCartaBtn");

  function initHamburgerMenu() {
      if (!hamburgerBtn || !desktopNav || !mobileButtonsContainer) return;
      
      const buttons = desktopNav.querySelectorAll('.filter-btn:not(.carta-btn)');
      buttons.forEach(button => {
          const clone = button.cloneNode(true);
          mobileButtonsContainer.appendChild(clone);
      });
      
      function toggleMenu() {
          hamburgerBtn.classList.toggle('active');
          navOverlay.classList.toggle('active');
          mobileNav.classList.toggle('active');
          document.body.classList.toggle('menu-open');
      }
      
      if (hamburgerBtn) hamburgerBtn.addEventListener('click', toggleMenu);
      if (navOverlay) navOverlay.addEventListener('click', toggleMenu);
      
      function checkScreenSize() {
          if (window.innerWidth > 767) {
              hamburgerBtn.classList.remove('active');
              navOverlay.classList.remove('active');
              mobileNav.classList.remove('active');
              document.body.classList.remove('menu-open');
          }
      }
      
      window.addEventListener('resize', checkScreenSize);
      checkScreenSize();
  }
  
  initHamburgerMenu();

  const filterBtns = document.querySelectorAll(".filter-btn");

  const categoryMetadata = {
    "pizzas": { title: "Pizzas", description: "Hechas con masa casera e ingredientes frescos" },
    "menu-diario": { title: "Menú Diario", description: "Platos del día elaborados con ingredientes frescos" },
    "milanesas": { title: "Milanesas al Plato", description: "Crujientes por fuera, jugosas por dentro" },
    "empanadas": { title: "Empanadas", description: "Hechas al horno con masa casera" },
    "burgers": { title: "Hamburguesas", description: "Las mejores hamburguesas artesanales" },
    "sandwiches": { title: "Sandwiches y Lomos", description: "En pan casero y con los mejores ingredientes" },
    "papas-fritas": { title: "Papas Fritas", description: "Para compartir o acompañar" },
    "ensaladas": { title: "Ensaladas", description: "Opciones frescas y saludables" },
    "postres": { title: "Postres", description: "El toque dulce para el final" },
    "menu-infantil": { title: "Menú Infantil", description: "Pensado para los más pequeños" },
    "otros": { title: "Otros Platos y Adicionales", description: "Variedades especiales de la casa" }
  };

  let loadedProducts = {};
  let allProductsList = [];

  function initializeColumns() {
    const columnPositions = [
      { id: "col-left-1", class: "column-left-1" },
      { id: "col-left-2", class: "column-left-2" },
      { id: "col-left-3", class: "column-left-3" },
      { id: "col-right-1", class: "column-right-1" },
      { id: "col-right-2", class: "column-right-2" },
      { id: "col-right-3", class: "column-right-3" },
    ];

    columnPositions.forEach((pos) => {
      const columnWrapper = document.createElement("div");
      columnWrapper.className = `column-wrapper ${pos.class}`;
      columnWrapper.id = pos.id;
      columnsContainer.appendChild(columnWrapper);
      createElegantColumn(pos.id);
    });

    setInterval(() => {
      document.querySelectorAll(".spear-tip-top, .spear-tip-bottom").forEach((tip) => {
        if (!tip.style.filter.includes("drop-shadow")) {
          tip.style.filter = "drop-shadow(0 0 15px rgba(255, 255, 255, 0.7)) drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))";
        }
      });
    }, 1000);

    setTimeout(() => {
      document.querySelectorAll(".column-wrapper").forEach((wrapper, index) => {
        wrapper.style.animationDelay = `${index * 0.5}s`;
      });
    }, 100);
  }

  function createElegantColumn(containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = `
      <div class="column-container">
        <div class="light-beam-top"></div>
        <div class="light-beam-bottom"></div>
        <div class="center-glow"></div>
        <div class="spear-tip-top"></div>
        <div class="spear-tip-bottom"></div>
        <div class="column"></div>
        <div class="petal petal-1"></div>
        <div class="petal petal-2"></div>
        <div class="petal petal-3"></div>
        <div class="petal petal-4"></div>
        <div class="petal-small petal-small-1"></div>
        <div class="petal-small petal-small-2"></div>
        <div class="petal-small petal-small-3"></div>
        <div class="petal-small petal-small-4"></div>
      </div>
    `;
  }

  function handleResize() {
    const isMobile = window.innerWidth < 768;
    document.querySelectorAll(".column-wrapper").forEach((wrapper) => {
      const wrapperId = wrapper.id;
      if (isMobile) {
        if (wrapperId.includes("-2") || wrapperId.includes("-3")) {
          wrapper.style.display = "none";
        } else {
          wrapper.style.display = "block";
        }
      } else {
        wrapper.style.display = "block";
      }
    });
    adjustPdfViewerForMobile();
  }
  
  async function loadMenuData() {
    try {
      const response = await fetch('productos.json');
      if (!response.ok) throw new Error('Error al cargar JSON');
      
      const data = await response.json();
      allProductsList = data.productos;
      
      const categoryMapping = {
        "Pizzas": "pizzas",
        "Menú Diario": "menu-diario",
        "Milanesas al plato": "milanesas",
        "Empanadas": "empanadas",
        "Hamburguesas": "burgers",
        "Sandwiches": "sandwiches",
        "Papas Fritas": "papas-fritas",
        "Ensaladas": "ensaladas",
        "Postres": "postres",
        "Menú Infantil": "menu-infantil",
        "Otros Platos": "otros",
        "Adicionales": "otros"
      };
      
      Object.keys(categoryMetadata).forEach(cat => {
        loadedProducts[cat] = [];
      });
      loadedProducts["otros"] = []; 
      loadedProducts["all"] = [...allProductsList];
      
      data.productos.forEach(product => {
        const catKey = categoryMapping[product.categoria] || "otros";
        if (!loadedProducts[catKey]) {
          loadedProducts[catKey] = [];
        }
        loadedProducts[catKey].push(product);
      });

      renderMainMenu();

    } catch (error) {
      console.error("Error cargando productos:", error);
      mostrarProductosDeEjemplo();
    }
  }

  function mostrarProductosDeEjemplo() {
    allProductsList = [
      { id: "ejemplo1", nombre: "Pizza Margarita", precio: 14000, categoria: "Pizzas", descripcion: "Salsa, muzzarella y parmesano", image: "" },
      { id: "ejemplo2", nombre: "Hamburguesa Clásica", precio: 16000, categoria: "Hamburguesas", descripcion: "Doble medallón con queso", image: "" }
    ];
    
    Object.keys(categoryMetadata).forEach(cat => {
      loadedProducts[cat] = [];
    });
    
    loadedProducts["all"] = [...allProductsList];
    loadedProducts["pizzas"] = [allProductsList[0]];
    loadedProducts["burgers"] = [allProductsList[1]];
    
    renderMainMenu();
  }

  function renderMainMenu() {
      mainMenuContainer.innerHTML = "";
      mainMenuContainer.style.display = "block";
      subcategoriesContainer.style.display = "none";
      
      Object.keys(categoryMetadata).forEach(key => {
        const products = loadedProducts[key];
        
        if (products && products.length > 0) {
            const titleContainer = document.createElement("div");
            titleContainer.className = "category-group-header";
            titleContainer.style.width = "100%";
            titleContainer.style.margin = "30px 0 15px 0";
            titleContainer.style.borderBottom = "2px solid var(--neon-blue, #0ff)";
            
            const title = document.createElement("h2");
            title.textContent = categoryMetadata[key].title;
            title.style.color = "var(--neon-main, #fff)";
            title.style.fontFamily = "'Orbitron', sans-serif";
            title.style.fontSize = "1.8rem";
            title.style.marginBottom = "10px";
            title.style.textShadow = "0 0 10px rgba(0, 255, 255, 0.5)";
            
            titleContainer.appendChild(title);
            mainMenuContainer.appendChild(titleContainer);

            const itemsContainer = document.createElement("div");
            itemsContainer.className = "category-group-items";
            
            let itemsHTML = "";
            products.forEach(item => {
                itemsHTML += createProductHTML(item);
            });
            itemsContainer.innerHTML = itemsHTML;
            
            mainMenuContainer.appendChild(itemsContainer);
        }
      });

      if (mainMenuContainer.innerHTML === "") {
        mainMenuContainer.innerHTML = '<div class="no-products">No hay productos disponibles</div>';
      }

      attachDynamicListeners(mainMenuContainer);
  }

  function backToMainMenu() {
    if (cartaContainer && cartaContainer.style.display === "block") hideCarta();
    
    renderMainMenu();
    
    subcategoriesContainer.style.display = "none";
    subcategoriesContainer.innerHTML = "";
    if (mainMenuContainer) mainMenuContainer.style.display = "block";
    
    const menuTitle = document.getElementById("menu-title");
    if (menuTitle) menuTitle.textContent = "TODOS LOS PRODUCTOS";
    
    document.querySelectorAll(".column-wrapper").forEach((wrapper) => {
      wrapper.style.opacity = "1";
    });
  }

  function showSubcategory(category) {
    if (cartaContainer && cartaContainer.style.display === "block") hideCarta();
    
    const products = loadedProducts[category] || [];
    renderMenuItems(products);
    
    const menuTitle = document.getElementById("menu-title");
    if (menuTitle) {
      const formattedCategory = category.toUpperCase().replace(/-/g, ' ').replace('MENU', 'MENÚ');
      menuTitle.textContent = formattedCategory;
    }
    
    document.querySelectorAll(".column-wrapper").forEach((wrapper) => {
      wrapper.style.opacity = "1";
    });
  }

  function renderMenuItems(products) {
    const container = mainMenuContainer || document.getElementById("menu-container");
    if (!container) return;
    
    container.style.display = "block"; 

    if (products.length === 0) {
      container.innerHTML = '<div class="no-products">No hay productos en esta categoría</div>';
      return;
    }
    
    let html = '';
    products.forEach(product => {
      html += createProductHTML(product);
    });
    container.innerHTML = html;
    attachDynamicListeners(container);
  }

  function createProductHTML(item) {
      return `
        <div class="menu-item fade-in">
          <div class="item-info">
            <div class="item-name">${item.nombre}</div>
            <div class="item-desc">${item.descripcion || ''}</div>
          </div>
          <div class="item-price-container">
            <div class="item-price">$${item.precio}</div>
            <button class="view-photo-btn" 
              data-img="${item.image || ''}" 
              data-title="${item.nombre}" 
              data-desc="${item.descripcion || ''}" 
              data-price="$${item.precio}">
              Click aquí
            </button>
          </div>
        </div>
      `;
  }

  function attachDynamicListeners(container) {
    container.querySelectorAll(".view-photo-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const { img, title, desc, price } = btn.dataset;
        showProductPhoto(img, title, desc, price);
        triggerColumnEffect();
      });
    });

    container.querySelectorAll(".menu-item").forEach((item) => {
      item.addEventListener("click", function () {
        this.style.backgroundColor = "#2a2a2a";
        this.style.borderColor = "var(--neon-main)";
        setTimeout(() => {
          this.style.backgroundColor = "var(--card-bg)";
          this.style.borderColor = "transparent";
        }, 200);
        mainTitle.style.textShadow = "0 0 10px #ff00ff, 0 0 40px #ff00ff";
        setTimeout(() => mainTitle.style.textShadow = "", 300);
        triggerColumnEffect();
      });
    });
  }

  function triggerColumnEffect() {
    document.querySelectorAll(".column-wrapper").forEach((wrapper) => {
      wrapper.style.opacity = "0.7";
      wrapper.style.transform = "scale(1.05)";
      setTimeout(() => {
        wrapper.style.opacity = "0.5";
        wrapper.style.transform = "scale(1)";
      }, 500);
    });
  }

  function showProductPhoto(imgUrl, title, desc, price) {
    modalImage.src = imgUrl && imgUrl.trim() !== "" ? imgUrl : "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
    modalImage.alt = `Foto de ${title}`;
    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalPrice.textContent = price;
    photoModal.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closePhotoModal() {
    photoModal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
  
  function showCarta() {
    if (mainMenuContainer) mainMenuContainer.style.display = "none";
    subcategoriesContainer.style.display = "none";
    cartaContainer.style.display = "block";
    
    filterBtns.forEach(btn => {
      btn.classList.remove("active");
      if (btn === cartaBtn) btn.classList.add("active");
    });
    
    document.body.classList.add("carta-active");
    
    pdfViewer.src = "./src/Carta.pdf";
    
    document.querySelectorAll(".column-wrapper").forEach((wrapper) => {
      wrapper.style.opacity = "0.2";
      wrapper.style.filter = "blur(2px)";
    });
    
    cartaContainer.scrollIntoView({ behavior: 'smooth' });
    adjustPdfViewerForMobile();
  }
  
  function hideCarta() {
    if (mainMenuContainer) mainMenuContainer.style.display = "block";
    subcategoriesContainer.style.display = "none";
    cartaContainer.style.display = "none";
    
    filterBtns.forEach(btn => btn.classList.remove("active"));
    if (filterBtns[0]) filterBtns[0].classList.add("active");
    
    document.body.classList.remove("carta-active");
    
    document.querySelectorAll(".column-wrapper").forEach((wrapper) => {
      wrapper.style.opacity = "0.5";
      wrapper.style.filter = "none";
    });
    
    document.querySelector(".category-nav").scrollIntoView({ behavior: 'smooth' });
  }
  
  function adjustPdfViewerForMobile() {
    const isMobile = window.innerWidth < 768;
    const pdfViewer = document.getElementById('pdfViewer');
    
    if (isMobile && pdfViewer) {
      pdfViewer.style.height = "400px";
    } else if (pdfViewer) {
      pdfViewer.style.height = "600px";
    }
  }
  
  initializeColumns();
  window.addEventListener("resize", handleResize);
  loadMenuData();

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      
      if (mobileNav && mobileNav.classList.contains('active')) {
           hamburgerBtn.classList.remove('active');
           navOverlay.classList.remove('active');
           mobileNav.classList.remove('active');
           document.body.classList.remove('menu-open');
      }
      
      if (btn === cartaBtn) {
        showCarta();
        return;
      }
      
      const category = btn.getAttribute("data-category");
      
      const allBtns = document.querySelectorAll('.filter-btn');
      allBtns.forEach(b => b.classList.remove("active"));
      
      const activeBtns = document.querySelectorAll(`.filter-btn[data-category="${category}"]`);
      activeBtns.forEach(b => b.classList.add("active"));
      
      if (category === "all") {
        backToMainMenu();
      } else {
        showSubcategory(category);
      }

      document.querySelectorAll(".column-wrapper").forEach((wrapper) => {
        wrapper.style.opacity = "0.3";
        setTimeout(() => wrapper.style.opacity = "0.5", 300);
      });
    });
  });

  closeModal.addEventListener("click", closePhotoModal);
  
  photoModal.addEventListener("click", (e) => {
    if (e.target === photoModal) closePhotoModal();
  });

  backFromCartaBtn.addEventListener("click", hideCarta);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (photoModal.classList.contains("active")) {
        closePhotoModal();
      } else if (cartaContainer.style.display === "block") {
        hideCarta();
      }
    }
  });
  
  adjustPdfViewerForMobile();
});