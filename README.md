# Hybrid Charts Dashboards Core

Ejemplos de Dashboards con **Google Charts** y **D3.js**. Usando una arquitectura híbrida de renderizado , consumiendo datos estructurados en formato JSON local de manera asíncrona.

---

## 🚀 Características Principales

* **Arquitectura Híbrida:** Implementación paralela y limpia de Google Charts (paquete `corechart` para Pie, Bar y Bubble charts) junto con manipulación nativa del DOM de SVG mediante D3.js.
* **Consumo Asíncrono Seguro:** Flujo de datos basado en Fetch API asíncrono (`try/catch`) con sanitización y tipado explícito de datos en tiempo de ejecución.
* **Estética Ejecutiva Profunda:** Paleta de colores oscuros corporativos optimizada para entornos de alta concentración, garantizando contraste y legibilidad.
* **Live Reloading:** Configuración de entorno local ágil sin necesidad de empaquetadores complejos o compilaciones pesadas mediante soporte nativo de módulos ES6.

---

## 🛠️ Requisitos Previos

Antes de clonar e inicializar el proyecto, asegúrate de tener instalado en tu entorno local:

* [Node.js](https://nodejs.org/) (Versión v18 o superior recomendada)
* [Git](https://git-scm.com/)

---

## 🔧 Instalación y Despliegue Local

Sigue estos pasos detallados desde la terminal para clonar el proyecto oficial y levantar el servidor de desarrollo:

1. **Abre VS Code.**

2. **Abre la terminal integrada:** Puedes hacerlo con el atajo de teclado **`Ctrl + \``** (en Windows/Linux) o **`Cmd + \``** (en Mac), o dirigiéndote al menú superior: **Terminal > New Terminal**.

3. **Navega hasta la carpeta de tus proyectos:** Usa el comando `cd` para posicionarte en tu directorio de trabajo. Por ejemplo:
   
   cd Documents/MisProyectos

4. Clona el repositorio oficial: Ejecuta el comando de Git para descargar el código fuente en tu máquina:

    git clone [https://github.com/jrobertg22/hybrid-charts-dashboards.git](https://github.com/jrobertg22/hybrid-charts-dashboards.git)

5. Accede al directorio del proyecto: Entra a la carpeta exacta que se acaba de crear:
   
    cd hybrid-charts-dashboards

6. Instala las dependencias del servidor: Descarga los módulos necesarios (lite-server) para compilar los gráficos e iniciar el entorno local:
   
    npm install

7. Despliega el servidor de desarrollo: Levanta la aplicación con soporte de recarga en vivo e inicializa la interfaz:
    
    npm run dev

8. Una vez levantado el servicio, la terminal te mostrará los accesos de red. Abre tu navegador web e ingresa a:

    Local URL: http://localhost:3000

📁 Estructura del Proyecto

El repositorio mantiene un desacoplamiento estricto entre la lógica de renderizado y el origen de datos:

hybrid-charts-dashboards/
├── data/
│   └── datos.json      # Dataset plano con las métricas de rendimiento (Origen de Datos)
├── src/
│   └── main.js         # Orquestador asíncrono y lógica de gráficos (D3 / Google Charts)
├── index.html          # Interfaz de usuario base y estilos CSS corporativos
├── package.json        # Manifiesto de dependencias y scripts de Node.js
└── .gitignore          # Archivo de exclusión de artefactos para Git