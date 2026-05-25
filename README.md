# NeoMarket - Frontend

Este es el frontend del proyecto **NeoMarket**, la interfaz de usuario con la que interactuarán los clientes. Está construido utilizando tecnologías modernas para garantizar un rendimiento óptimo y una experiencia de desarrollo fluida.

## 🚀 Tecnologías y Dependencias

El proyecto utiliza `npm` para gestionar sus dependencias. Las principales herramientas son:
- **React (v19)**: Librería principal para construir las interfaces de usuario.
- **Vite (v8)**: Entorno de desarrollo ultrarrápido y empaquetador moderno (reemplaza a Create React App).
- **Tailwind CSS (v4)**: Framework de utilidades CSS para estilizar los componentes rápidamente sin salir del archivo JavaScript.
- **React Router DOM (v7)**: Para el enrutamiento y la navegación entre páginas (ej. pasar del inicio a la vista de productos).
- **Lucide React**: Biblioteca de iconos moderna y ligera.

## ⚙️ Configuración Actual

La configuración principal se encuentra en los siguientes archivos:
- **`vite.config.js`**: Configuración del servidor de desarrollo de Vite.
- **`tailwind.config.js`** / **`postcss.config.js`**: Configuración del motor de estilos de Tailwind.
- **Puerto de desarrollo:** Vite suele inicializarse en el puerto **`5173`** (a menos que esté ocupado, en cuyo caso usará el siguiente disponible).

## 🛠️ Cómo Ejecutar el Proyecto Localmente

Para correr el frontend necesitas tener instalado **Node.js** (versión 18 o superior).

1. **Abre tu terminal** y asegúrate de estar en la carpeta `frontend`.
2. **Instala las dependencias** (solo es necesario la primera vez o si se agregan nuevas librerías):
   ```bash
   npm install
   ```
3. **Inicia el servidor de desarrollo:**
   ```bash
   npm run dev
   ```
4. En tu consola aparecerá la URL local (usualmente `http://localhost:5173`). Haz clic en ella o cópiala en tu navegador web.

