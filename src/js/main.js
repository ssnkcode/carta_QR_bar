document.addEventListener("DOMContentLoaded", () => {
    // ============================================
    // CÓDIGO DEL MENÚ HAMBURGUESA (AÑADIR AL INICIO)
    // ============================================
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const navOverlay = document.getElementById('navOverlay');
    const mobileNav = document.getElementById('mobileNav');
    const desktopNav = document.getElementById('desktopNav');
    const mobileButtonsContainer = document.querySelector('.nav-mobile-buttons');
    
    // Función para inicializar menú hamburguesa
    function initHamburgerMenu() {
        if (!hamburgerBtn || !desktopNav || !mobileButtonsContainer) return;
        
        // Copiar botones del nav desktop al móvil
        const buttons = desktopNav.querySelectorAll('.filter-btn:not(.carta-btn)');
        buttons.forEach(button => {
            const clone = button.cloneNode(true);
            mobileButtonsContainer.appendChild(clone);
        });
        
        // Abrir/cerrar menú hamburguesa
        function toggleMenu() {
            hamburgerBtn.classList.toggle('active');
            navOverlay.classList.toggle('active');
            mobileNav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        }
        
        // Event listeners
        if (hamburgerBtn) {
            hamburgerBtn.addEventListener('click', toggleMenu);
        }
        
        if (navOverlay) {
            navOverlay.addEventListener('click', toggleMenu);
        }
        
        // Cerrar menú al hacer clic en un botón (en móvil)
        if (mobileButtonsContainer) {
            mobileButtonsContainer.addEventListener('click', function(e) {
                if (e.target.classList.contains('filter-btn')) {
                    toggleMenu();
                    
                    // También activar el botón correspondiente en el nav desktop
                    const category = e.target.dataset.category;
                    const desktopBtn = desktopNav.querySelector(`[data-category="${category}"]`);
                    if (desktopBtn) {
                        // Simular clic en el botón desktop
                        desktopBtn.click();
                    }
                }
            });
        }
        
        // Ajustar visibilidad del botón hamburguesa según el tamaño de pantalla
        function checkScreenSize() {
            if (window.innerWidth > 767) {
                // Si estamos en desktop, asegurarse de que el menú móvil esté cerrado
                hamburgerBtn.classList.remove('active');
                if (navOverlay) navOverlay.classList.remove('active');
                if (mobileNav) mobileNav.classList.remove('active');
                document.body.classList.remove('menu-open');
            }
        }
        
        window.addEventListener('resize', checkScreenSize);
        checkScreenSize(); // Verificar al cargar
    }
    
    // Inicializar menú hamburguesa
    initHamburgerMenu();
    
    // ============================================
    // TU CÓDIGO ORIGINAL (CONTINÚA AQUÍ)
    // ============================================
    const columnsContainer = document.getElementById("columnsContainer");
    const filterBtns = document.querySelectorAll(".filter-btn");
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
    
    // VARIABLES PARA CARTA PDF
    const cartaBtn = document.getElementById("cartaBtn");
    const cartaContainer = document.getElementById("cartaContainer");
    const pdfViewer = document.getElementById("pdfViewer");
    const backFromCartaBtn = document.getElementById("backFromCartaBtn");
  
    const categoryMetadata = {
      "pizzas": { title: "🍕 Pizzas", description: "Hechas con masa casera e ingredientes frescos" },
      "menu-diario": { title: "🍽️ Menú Diario", description: "Platos del día elaborados con ingredientes frescos" },
      "milanesas": { title: "🥩 Milanesas al Plato", description: "Crujientes por fuera, jugosas por dentro" },
      "empanadas": { title: "🥟 Empanadas", description: "Hechas al horno con masa casera" },
      "burgers": { title: "🍔 Hamburguesas", description: "Las mejores hamburguesas artesanales" },
      "sandwiches": { title: "🥪 Sandwiches y Lomos", description: "En pan casero y con los mejores ingredientes" },
      "papas-fritas": { title: "🍟 Papas Fritas", description: "Para compartir o acompañar" },
      "ensaladas": { title: "🥗 Ensaladas", description: "Opciones frescas y saludables" },
      "postres": { title: "🍰 Postres", description: "El toque dulce para el final" },
      "menu-infantil": { title: "👶 Menú Infantil", description: "Pensado para los más pequeños" },
      "otros": { title: "🍽️ Otros Platos y Adicionales", description: "Variedades especiales de la casa" }
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
      
      // Ajustar visor PDF para móviles
      adjustPdfViewerForMobile();
    }
    
    // CORRECCION PARA FILTRADO DE PRODUCTOS
    async function loadMenuData() {
      try {
        console.log("Iniciando carga de datos...");
        const response = await fetch('productos.json');
        
        if (!response.ok) throw new Error('Error al cargar JSON');
        
        const data = await response.json();
        allProductsList = data.productos;
        
        // CORRECCIÓN 1: Mapeo completo de categorías
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
        
        // Inicializar categorías vacías (incluyendo "all" y "otros")
        Object.keys(categoryMetadata).forEach(cat => {
          loadedProducts[cat] = [];
        });
        loadedProducts["otros"] = []; // Asegurar que "otros" existe
        
        // Agregar categoría "all" para todos los productos
        loadedProducts["all"] = [...allProductsList];
        
        // Agrupar productos por categoría usando el mapping
        data.productos.forEach(product => {
          const catKey = categoryMapping[product.categoria] || "otros";
          if (!loadedProducts[catKey]) {
            loadedProducts[catKey] = []; // Crear la categoría si no existe
          }
          loadedProducts[catKey].push(product);
        });

        // CORRECCIÓN 2: Debug para verificar agrupación
        console.log("Productos cargados:", allProductsList.length, "productos");
        console.log("Agrupación por categorías:");
        Object.keys(loadedProducts).forEach(cat => {
          console.log(`${cat}: ${loadedProducts[cat]?.length || 0} productos`);
        });
        
        // Mostrar detalles de las categorías principales
        console.log("=== DETALLE POR CATEGORÍA ===");
        ['pizzas', 'menu-diario', 'milanesas', 'burgers', 'empanadas', 'sandwiches', 'otros'].forEach(cat => {
          if (loadedProducts[cat]) {
            console.log(`${cat.toUpperCase()}:`, loadedProducts[cat].map(p => p.nombre));
          }
        });

        renderMainMenu();

      } catch (error) {
        console.error("Error cargando productos:", error);
        // Mostrar productos de ejemplo si falla la carga
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
        
        let itemsHTML = "";
        
        console.log("Renderizando", allProductsList.length, "productos"); // Agrega esto
        
        allProductsList.forEach(item => {
            itemsHTML += createProductHTML(item);
        });

        console.log("HTML generado:", itemsHTML); // Agrega esto también
        
        mainMenuContainer.innerHTML = itemsHTML;
        attachDynamicListeners(mainMenuContainer);
    }

    // ==============================================
    // FUNCIONES PARA FILTRADO (AGREGADAS)
    // ==============================================

    function backToMainMenu() {
      console.log("Volviendo al menú principal");
      
      // Si estamos en carta, ocultarla primero
      if (cartaContainer && cartaContainer.style.display === "block") {
        hideCarta();
      }
      
      // Mostrar todos los productos
      const allProducts = loadedProducts.all || [];
      renderMenuItems(allProducts);
      
      // Actualizar visibilidad
      subcategoriesContainer.style.display = "none";
      subcategoriesContainer.innerHTML = "";
      if (mainMenuContainer) {
        mainMenuContainer.style.display = "block";
      }
      
      // Resetear botones
      filterBtns.forEach((b) => b.classList.remove("active"));
      if(filterBtns[0]) filterBtns[0].classList.add("active");
      
      // Actualizar título
      const menuTitle = document.getElementById("menu-title");
      if (menuTitle) {
        menuTitle.textContent = "TODOS LOS PRODUCTOS";
      }
      
      // Restaurar opacidad
      document.querySelectorAll(".column-wrapper").forEach((wrapper) => {
        wrapper.style.opacity = "1";
      });
    }

    function showSubcategory(category) {
      console.log("Mostrando subcategoría:", category);
      
      // Si estamos en carta, ocultarla primero
      if (cartaContainer && cartaContainer.style.display === "block") {
        hideCarta();
      }
      
      // Obtener productos de esta categoría
      const products = loadedProducts[category] || [];
      console.log(`Productos para ${category}:`, products);
      
      // Renderizar los productos
      renderMenuItems(products);
      
      // Actualizar título con formato bonito
      const menuTitle = document.getElementById("menu-title");
      if (menuTitle) {
        // Convertir "menu-diario" a "MENÚ DIARIO", "papas-fritas" a "PAPAS FRITAS", etc.
        const formattedCategory = category
          .toUpperCase()
          .replace(/-/g, ' ')
          .replace('MENU', 'MENÚ');
        menuTitle.textContent = formattedCategory;
      }
      
      // Actualizar botones activos
      filterBtns.forEach((b) => b.classList.remove("active"));
      const activeBtn = document.querySelector(`[data-category="${category}"]`);
      if(activeBtn) activeBtn.classList.add("active");
      
      // Restaurar opacidad
      document.querySelectorAll(".column-wrapper").forEach((wrapper) => {
        wrapper.style.opacity = "1";
      });
    }

    function renderMenuItems(products) {
      console.log("Renderizando", products.length, "productos");
      
      // Usar mainMenuContainer como contenedor principal
      const container = mainMenuContainer || document.getElementById("menu-container");
      if (!container) {
        console.error("No se encontró el contenedor del menú");
        return;
      }
      
      if (products.length === 0) {
        container.innerHTML = '<div class="no-products">No hay productos en esta categoría</div>';
        return;
      }
      
      let html = '';
      products.forEach(product => {
        html += createProductHTML(product);
      });
      
      container.innerHTML = html;
      
      // Re-asignar eventos
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
    
    // FUNCIONES PARA CARTA PDF
    function showCarta() {
      // Ocultar menú principal y mostrar carta
      if (mainMenuContainer) mainMenuContainer.style.display = "none";
      subcategoriesContainer.style.display = "none";
      cartaContainer.style.display = "block";
      
      // Resetear todos los botones
      filterBtns.forEach(btn => {
        btn.classList.remove("active");
        if (btn === cartaBtn) {
          btn.classList.add("active");
        }
      });
      
      // Añadir clase al body para estilos específicos
      document.body.classList.add("carta-active");
      
      // Asegurar que el PDF se cargue correctamente
      pdfViewer.src = "Carta.pdf";
      
      // Efecto en las columnas
      document.querySelectorAll(".column-wrapper").forEach((wrapper) => {
        wrapper.style.opacity = "0.2";
        wrapper.style.filter = "blur(2px)";
      });
      
      // Scroll suave al inicio de la carta
      cartaContainer.scrollIntoView({ behavior: 'smooth' });
      
      // Ajustar visor PDF
      adjustPdfViewerForMobile();
    }
    
    function hideCarta() {
      // Mostrar menú principal y ocultar carta
      if (mainMenuContainer) mainMenuContainer.style.display = "block";
      subcategoriesContainer.style.display = "none";
      cartaContainer.style.display = "none";
      
      // Resetear botones al estado inicial
      filterBtns.forEach(btn => btn.classList.remove("active"));
      if (filterBtns[0]) filterBtns[0].classList.add("active");
      
      // Remover clase del body
      document.body.classList.remove("carta-active");
      
      // Restaurar columnas
      document.querySelectorAll(".column-wrapper").forEach((wrapper) => {
        wrapper.style.opacity = "0.5";
        wrapper.style.filter = "none";
      });
      
      // Scroll suave al inicio del menú
      document.querySelector(".category-nav").scrollIntoView({ behavior: 'smooth' });
    }
    
    function adjustPdfViewerForMobile() {
      const isMobile = window.innerWidth < 768;
      const pdfViewer = document.getElementById('pdfViewer');
      
      if (isMobile && pdfViewer) {
        // En móviles, ajustar altura del visor
        pdfViewer.style.height = "400px";
      } else if (pdfViewer) {
        // En desktop, altura normal
        pdfViewer.style.height = "600px";
      }
    }
    
    // MANEJADORES DE EVENTOS
    initializeColumns();
    window.addEventListener("resize", handleResize);
    
    // Cargar datos
    loadMenuData();

    // Event listeners para los botones de filtro
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        // Prevenir eventos duplicados
        e.stopPropagation();
        
        console.log("Botón original clickeado:", btn.dataset.category);
        
        // Si es el botón de carta, manejarlo separadamente
        if (btn === cartaBtn) {
          showCarta();
          return;
        }
        
        const category = btn.getAttribute("data-category");
        console.log("Filtrando categoría:", category, "Productos disponibles:", loadedProducts[category]);

        // Resetear todos los botones
        filterBtns.forEach(b => b.classList.remove("active"));
        // Activar solo este botón
        btn.classList.add("active");
        
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
  
    // Agrega el evento para el botón "Volver al Menú" de la carta
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
    
    // Inicializar ajuste de PDF al cargar
    adjustPdfViewerForMobile();
});