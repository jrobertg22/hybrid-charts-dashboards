# Interactive Analytics Dashboard Core

Ejemplos de Dashboards con **Google Charts** y **D3.js**. Usando una arquitectura híbrida de renderizado , consumiendo datos estructurados en formato JSON local de manera asíncrona.

---

## 🚀 Características Principales

* **Arquitectura Híbrida:** Implementación paralela de Google Charts (paquete `corechart` para Pie, Bar y Bubble charts) junto con manipulación nativa del DOM de SVG mediante D3.js.
* **Consumo Asíncrono Seguro:** Flujo de datos basado en Fetch API asíncrono (`try/catch`) con sanitización y tipado explícito de datos en tiempo de ejecución.
* **Estética Dark Ejecutiva:** Paleta de colores optimizada para entornos corporativos de alta concentración, garantizando contraste y accesibilidad.
* **Live Reloading:** Configuración de entorno local ágil sin necesidad de empaquetadores complejos o compilaciones pesadas.

---

## 🛠️ Requisitos Previos

Antes de clonar e inicializar el proyecto, asegúrate de tener instalado en tu entorno local:

* [Node.js](https://nodejs.org/) (Versión v18 o superior recomendada)
* [Git](https://git-scm.com/)

---

## 🔧 Instalación y Despliegue Local

Sigue estos pasos detallados desde tu terminal para clonar el repositorio y levantar el servidor de desarrollo en Visual Studio Code:

### 1. Clonar el Repositorio
Clona el proyecto desde GitHub hacia tu máquina local e ingresa al directorio raíz:
```bash
git clone [https://github.com/TU_USUARIO/TU_REPOSITORIO.git](https://github.com/TU_USUARIO/TU_REPOSITORIO.git)
cd analytics-dashboard-core