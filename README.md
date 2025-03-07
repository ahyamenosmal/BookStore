# Scripta Frontend

Este proyecto es la parte frontend de la aplicación Scripta, una tienda en línea para libros. Se ha desarrollado utilizando **React** y **Vite**, y se conecta a un backend (API) para gestionar productos, usuarios, favoritos, carrito y compras. Además, se han implementado contextos para gestionar el estado global (API, Autenticación, Carrito y Favoritos), animaciones con **Framer Motion** y **Lottie** para feedback visual, y rutas protegidas para la administración.

## Características

- **Autenticación de Usuarios:**
  - Inicio de sesión y registro, con persistencia del estado en `localStorage`.
  - Diferenciación entre usuarios y administradores; el login determina si el usuario es admin para redirigir a áreas específicas.

- **Gestión del Carrito:**
  - Permite agregar, actualizar y eliminar productos del carrito, sincronizando el estado local con la API.

- **Favoritos:**
  - Agregar y quitar productos de favoritos, con persistencia en `localStorage` y sincronización con la API.
  - El componente de favoritos es reutilizable y muestra una animación Lottie mientras se cargan los datos.

- **Historial de Compras:**
  - Visualización del historial de compras en formato de lista.
  - Cada pedido se muestra con un menú desplegable (acordeón) que, al expandirse, realiza una petición a la API para obtener los detalles del pedido.
  - Se muestran datos como fecha, total, estado y, al expandir, se muestran los detalles con nombre e imagen de cada producto.

- **Navegación y Rutas:**
  - Uso de **React Router** para gestionar rutas de la aplicación.
  - Se han implementado rutas protegidas tanto para usuarios como para administradores.

- **Animaciones y Feedback Visual:**
  - Uso de **Framer Motion** para animaciones en componentes y menús.
  - Uso de **Lottie** para mostrar animaciones de carga, ofreciendo una experiencia de usuario dinámica.

## Instalación

1. **Clona el repositorio:**

```bash
git clone https://github.com/tu-usuario/scripta-frontend.git
cd scripta-frontend
```

2. **Instala las dependencias:**

```bash
npm install
```

3. **Configura las variables de entorno:**

Crea un archivo .env en la raíz del proyecto y define la - URL de la API:

```env
VITE_API_URL=https://bookstore-backend-bw7r.onrender.com
```

## Scripts Disponibles

- **Desarrollo:**

```bash
npm run dev
```

Inicia el entorno de desarrollo con Hot Module Replacement (HMR) y soporte de React.

- **Build:**

```bash

npm run build
```

Compila la aplicación para producción.

- **Preview:**

```bash
npm run preview -- --host
```

Inicia un servidor de previsualización de la versión de producción (requiere configurar allowedHosts en vite.config.js ).

## Estructura del Proyecto

- src/
  - assets/: Recursos estáticos (imágenes, logos, etc.).
  - components/
    - Admin/: Componentes para la sección de administración.
    - Catalog/: Componentes relacionados con el catálogo de productos (Sidebar, etc.).
    - General/: Componentes reutilizables (ProductCard, ProductIdCard, Layout, etc.).
    - User/: Componentes para la sección del usuario (UserProfile, PurchaseHistoryList, etc.).
  - contexts/
    - APIContext.jsx: Provee datos de categorías y productos desde la API.
    - AuthContext.jsx: Gestiona la autenticación de usuarios (login, logout, registro) y distingue administradores.
    - CartContext.jsx: Maneja la lógica del carrito, con sincronización con la API.
    - FavoritesContext.jsx: Gestiona los favoritos, con persistencia en localStorage y sincronización con la API.
  - hooks/: Hooks personalizados (por ejemplo, useCheckout para enviar la compra a la API).
  - views/
    - Client/: Vistas para usuarios (Home, Catalog, Cart, Login, Purchase History, etc.).
    - Admin/: Vistas para administradores.
- App.jsx: Componente principal que integra rutas y contextos.
- main.jsx: Punto de entrada de la aplicación.
