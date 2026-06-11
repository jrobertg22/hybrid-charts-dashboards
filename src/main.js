import * as d3 from 'https://cdn.jsdelivr.net/npm/d3@7/+esm';

// Ruta exacta asignada al archivo local
const DATA_URL = './data/datos.json';

async function initDashboard() {
    try {
        // Ejecución del fetch nativo asíncrono
        const response = await fetch(DATA_URL);
        
        if (!response.ok) {
            throw new Error(`No se pudo acceder a ${DATA_URL} (Código: ${response.status})`);
        }
        
        const rawData = await response.json();

        // Tipado seguro y parsing explícito para evitar fallos en las escalas de D3
        const sanitizedData = rawData.map(d => ({
            category: String(d.category),
            value: Number(d.value),
            growth: Number(d.growth)
        }));

        /**
         * Carga de la librería de Google Charts con el paquete específico para gráficos de pastel y barras.
         * La función setOnLoadCallback asegura que los gráficos se rendericen solo después de que la librería esté completamente cargada.
         */
        google.charts.load('current', { packages: ['corechart'] });
        
        // Orquestación centralizada de callbacks una vez cargadas las dependencias de Google
        google.charts.setOnLoadCallback(() => {
            renderGoogleChart(sanitizedData);
            renderGoogleChartBar(sanitizedData);
            renderGoogleBubbleChart(sanitizedData);
        });

        // Renderizado síncrono e independiente del componente nativo D3
        renderD3Chart(sanitizedData);

    } catch (error) {
        console.error('[DASHBOARD_ERROR] Fallo en el flujo de datos:', error);
        
        document.body.insertAdjacentHTML('afterbegin', `
            <div style="padding: 15px; background: #fee2e2; color: #991b1b; margin-bottom: 20px; border-radius: 6px; font-weight: bold;">
                Error de Inicialización: ${error.message}
            </div>
        `);
    }
}

function renderGoogleChartBar(data) {
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Categoría');
    dataTable.addColumn('number', 'Valor');
    
    const rows = data.map(item => [item.category, item.value]);
    dataTable.addRows(rows);
    
    const options = {
        title: 'Valor por Categoría',
        colors: ['#1e3a8a', '#0f766e', '#15803d', '#b45309', '#9f1239'],    
        chartArea: { width: '70%', height: '70%' },
        legend: { position: 'none' }
    };
    
    const chartContainer = document.getElementById('chartjs_chart_canvas');
    if (chartContainer) {
        const chart = new google.visualization.BarChart(chartContainer);
        chart.draw(dataTable, options);
    }
}

function renderGoogleChart(data) {
    const dataTable = new google.visualization.DataTable();
    dataTable.addColumn('string', 'Categoría');
    dataTable.addColumn('number', 'Valor');

    const rows = data.map(item => [item.category, item.value]);
    dataTable.addRows(rows);

    const options = {
        pieHole: 0.4,
        colors: ['#1e3a8a', '#0f766e', '#15803d', '#b45309', '#9f1239'],
        chartArea: { width: '90%', height: '80%' },
        legend: { position: 'bottom' }
    };

    const chartContainer = document.getElementById('google_chart_div');
    if (chartContainer) {
        const chart = new google.visualization.PieChart(chartContainer);
        chart.draw(dataTable, options);
    }
}

function renderD3Chart(data) {
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = 500 - margin.left - margin.right;
    const height = 350 - margin.top - margin.bottom;

    d3.select("#d3_chart_div").selectAll("*").remove();

    const svg = d3.select("#d3_chart_div")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3.scaleBand()
        .domain(data.map(d => d.category))
        .range([0, width])
        .padding(0.2);

    const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.growth)])
        .nice()
        .range([height, 0]);

    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x))
        .selectAll("text")
        .attr("class", "axis-label");

    svg.append("g")
        .call(d3.axisLeft(y));

    svg.selectAll(".bar")
        .data(data)
        .enter()
        .append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.category))
        .attr("y", d => y(d.growth))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d.growth));
}

function renderGoogleBubbleChart(data) {
    const dataTable = new google.visualization.DataTable();
    
    /**
     * DEFINICIÓN DE COLUMNAS - ORDEN OBLIGATORIO DE GOOGLE CHARTS
     * 0: ID (string) -> Etiqueta de la burbuja
     * 1: X  (number) -> Eje Horizontal (Valor)
     * 2: Y  (number) -> Eje Vertical (Crecimiento)
     * 3: Color (string) -> Agrupador semántico 
     * 4: Tamaño (number) -> Radio físico de la burbuja
     */
    dataTable.addColumn('string', 'ID');
    dataTable.addColumn('number', 'Valor');
    dataTable.addColumn('number', 'Crecimiento (%)');
    dataTable.addColumn('string', 'Categoría');   
    dataTable.addColumn('number', 'Volumen Impacto');  

    // Construcción de filas inyectando las propiedades del JSON plano
    const rows = data.map(item => [
        String(item.category),            // 0: Etiqueta visible
        Number(item.value),               // 1: Posición X
        Number(item.growth),              // 2: Posición Y
        String(item.category),            // 3: Control de color único por fila
        Number(item.value * item.growth)  // 4: Control de tamaño (Radio)
    ]);
    dataTable.addRows(rows);

    const options = {
        title: 'Análisis Multidimensional: Crecimiento vs Valor (Tamaño = Impacto)',
        hAxis: { 
            title: 'Valor',
            textStyle: { color: '#64748b' },
            gridlines: { color: '#f1f5f9' }
        },
        vAxis: { 
            title: 'Crecimiento (%)',
            textStyle: { color: '#64748b' },
            gridlines: { color: '#f1f5f9' }
        },

        // Paleta de colores
        colors: ['#1e3a8a', '#0f766e', '#15803d', '#b45309', '#9f1239'],

        bubble: {
            textStyle: { 
                fontSize: 10,
                color: '#ffffff', // Texto claro dentro de la burbuja para legibilidad
                auraColor: 'none' // Elimina el resplandor por defecto de Google Charts
            }
        },

        // Configuración de animación nativa por hardware
        animation: { 
            startup: true, 
            duration: 800,
            easing: 'out'
        },
        chartArea: { width: '75%', height: '75%' },
        legend: { position: 'right' }
    };

    // Validación del ciclo de vida del DOM antes de compilar el dibujo
    const chartContainer = document.getElementById('google_bubble_chart_div');
    if (chartContainer) {
        const chart = new google.visualization.BubbleChart(chartContainer);
        chart.draw(dataTable, options);
    }
}

// Inicialización de la aplicación
initDashboard();