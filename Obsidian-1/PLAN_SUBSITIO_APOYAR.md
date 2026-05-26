# Plan Completo — Desarrollo del Subsitio de Apoyo (`apoyo.aethosai.org`)

Este documento presenta la arquitectura, estrategia de gamificación, flujo conversacional por Inteligencia Artificial y la hoja de ruta técnica para el desarrollo del subsitio **`apoyo.aethosai.org`**. 

Inspirado en la interactividad y fluidez de `https://risk.aethosai.org/`, este subsitio funcionará como un **embudo interactivo y altamente gamificado** que convertirá a los visitantes de la landing en donantes financieros o colaboradores de talento a través de una experiencia guiada por un asistente de IA.

---

## 1. Arquitectura de Rutas y Estructura del Sitio

El subsitio se construirá como una aplicación moderna de **Next.js (App Router)** independiente o como un subproyecto en el monorepo.

```
apoyo.aethosai.org/
├── /                     # Home: Interfaz del Asistente Conversacional de IA (Aethos Guide)
├── /donaciones           # Embudo financiero: Calculadora de impacto + Pasarelas de pago
├── /voluntarios          # Embudo de talento: Perfilamiento interactivo + Oportunidades
└── /exito                # Agradecimiento: Dashboard gamificado, reclamo de badges y compartir
```

---

## 2. El Corazón del Sitio: Asistente Conversacional IA (Aethos Guide)

El Home (`/`) presentará una pantalla limpia con un fondo oscuro elegante, efectos de partículas sutiles y un avatar conversacional interactivo (llamado **Aethos Core**).

### Flujo de Interacción del Asistente:

```mermaid
graph TD
    A[Usuario ingresa a la web] --> B[Aethos Core saluda y presenta opciones]
    B --> C["Aporte Financiero 💰 (Ruta /donaciones)"]
    B --> D["Aporte de Talento 🧠 (Ruta /voluntarios)"]
    
    C --> C1[AI pregunta: ¿Qué impacto te gustaría financiar hoy?]
    C1 --> C2[Calculadora de Impacto Dinámica]
    C2 --> C3[Campaña GoFundMe / Donación Directa]
    C3 --> E[Generación de Badge de Donante]
    
    D --> D1[AI pregunta: ¿Cuál es tu superpoder o perfil?]
    D1 --> D2[AI analiza en tiempo real y sugiere vacantes (ej. Analista de Datos)]
    D2 --> D3[Cuestionario interactivo y carga de GitHub/LinkedIn]
    D3 --> F[Generación de Badge de Postulante + Registro en Trello/GitHub]
    
    E --> G[Página de Éxito /exito]
    F --> G
```

### Funciones del Asistente Conversacional:
*   **Perfilamiento Dinámico:** En lugar de formularios tradicionales, el asistente pregunta de forma natural sobre la experiencia, disponibilidad y motivaciones del usuario.
*   **Análisis de Perfil (Matchmaking):** Si un voluntario menciona habilidades en Python o APIs, el asistente responde con entusiasmo y le propone la postulación al rol de **Analista de Datos** (`SOLICITUD_ANALISTA.md`).
*   **Estimación de Impacto Financiero:** Si el donante indica un monto, el asistente le explica de forma tangible qué costo operativo cubre ese monto (ej: *"Con $25 USD aseguras la infraestructura del mapa LATAM por 3 meses"*).

---

## 3. Estrategia de Gamificación y UX Premium

Para maximizar la conversión y el engagement, el subsitio utilizará dinámicas de juego:

1.  **Barra de Progreso Interactiva:** Un indicador visual animado en la parte superior que se va completando a medida que interactúas con el asistente.
2.  **Calculadora de Impacto Visual:**
    *   Un deslizador dinámico de montos ($10, $25, $50, $100, $250+ USD) que ilumina en el mapa LATAM las capas o servidores que se sostienen con dicho aporte.
3.  **Generación de Badges Digitales (Logros):**
    *   **"Socio Fundador"** (Aporte Financiero recurrente).
    *   **"Guardián de Datos"** (Postulante a Analista/Desarrollador voluntario).
    *   **"Evangelista Aethos"** (Embajadores de Difusión).
4.  **Botones de Compartido en un Clic:** Diseños optimizados para compartir el logro digital directamente en LinkedIn y Twitter/X con un copy que incentive a otros a sumarse.

---

## 4. Diseño de Interfaces (UI) y Animaciones

Mantendremos el lenguaje visual premium de Aethos AI utilizando **Tailwind CSS v4** y **Framer Motion**, pero adaptado a una experiencia conversacional inmersiva:

*   **Dark Mode por Defecto:** Fondo profundo (`#0d0d0d`) para mayor enfoque e inmersión, combinado con el color oro/ámbar (`#c9a227`) para elementos interactivos destacados.
*   **Efecto "Glowing Cards" (Glassmorphism):** Bordes con gradientes dorados que reaccionan a la posición del cursor (hover reactivo).
*   **Micro-animaciones de Texto:** Las preguntas del asistente de IA se renderizarán letra por letra o palabra por palabra con suavidad.
*   **Transiciones tipo Slide Deck:** Los cambios entre las etapas del embudo utilizarán transiciones horizontales fluidas (desplazamientos de página sin recarga).

---

## 5. Arquitectura Técnica y Stack Sugerido

Para desarrollar un sitio fluido, interactivo y fácil de mantener:

*   **Frontend:** Next.js (App Router, React 19, TypeScript).
*   **UI & Animaciones:** Tailwind CSS v4, Lucide Icons, Radix UI (para componentes accesibles) y Framer Motion.
*   **Motor Conversacional (IA):**
    *   **Opción A (Rápida y potente):** API de Gemini con respuestas estructuradas (JSON Schema) para clasificar perfiles y guiar el flujo.
    *   **Opción B (Flexible):** Un chatbot frontend con árbol de decisiones estructurado que simula ser IA mediante respuestas demoradas y animadas. 
*   **Procesamiento de Pagos y Financiamiento:**
    *   **GoFundMe (Opción Recomendada por Simplicidad y Confianza):** Integración directa mediante redirección al perfil de la campaña oficial de Aethos AI. 
        *   *Cómo funciona:* Al final de la interacción gamificada en la página de `/donaciones`, en lugar de desarrollar una pasarela de pago nativa compleja que requiera backend, el asistente conversacional genera un botón dinámico con enlace directo para donar en la campaña de GoFundMe, sugiriendo el monto pre-calculado según el impacto elegido.
        *   *Pros:* Confianza de marca internacional, cero desarrollo backend/servidor, soporte inmediato para tarjetas globales, Google Pay, Apple Pay y transferencias seguras sin costos de cumplimiento normativo o seguridad.
        *   *Contras:* La cuenta de retiro de fondos debe estar configurada en un país soportado por GoFundMe (por ejemplo, si el equipo fundador tiene residencia legal o corporativa en EE. UU., España, etc.).
    *   **Stripe Checkout / Mercado Pago / PayPal (Alternativas de Integración Directa):** Para una experiencia 100% nativa embebida sin salir del sitio, ideal en una segunda fase si se requiere facturación formal en países de LATAM (como México o Chile) o si hay limitaciones de retiro en GoFundMe.
*   **Integración de Datos (Backend & CRM):**
    *   **Supabase / PostgreSQL:** Para guardar de forma segura las intenciones de voluntariado, perfiles y estado de postulaciones.
    *   **Zapier / Make / Webhooks:** Para notificar automáticamente al canal de Slack/Discord del equipo o crear tarjetas de postulantes en GitHub Issues/Trello.

---

## 6. Fases de Desarrollo (Cronograma de Trabajo)

Proponemos dividir el desarrollo en 3 fases incrementales:

### Fase 1: MVP Conversacional & Estructura Básica (Sprint 1 - 2 semanas)
*   Configuración del repositorio del subsitio Next.js y el sistema de diseño visual (estilo oscuro e iluminación dorada).
*   Implementación del chat con árbol de decisiones conversacional estructurado (simulador conversacional).
*   Desarrollo de las páginas `/donaciones` y `/voluntarios` con formularios interactivos.

### Fase 2: Configuración del Embudo e IA Real (Sprint 2 - 2 semanas)
*   Configuración y enlace del flujo de redirección hacia la campaña oficial de GoFundMe para las donaciones de prueba y producción.
*   Integración de la API de Gemini para analizar la postulación de los voluntarios en tiempo real y sugerirles áreas específicas.
*   Diseño de la página de éxito (`/exito`) y el generador dinámico de badges compartibles.

### Fase 3: Gamificación Avanzada & Lanzamiento (Sprint 3 - 1 semana)
*   Añadir sonidos sutiles e interacciones premium de hover/brillo en las tarjetas.
*   Configuración de DNS para el subdominio `apoyo.aethosai.org` en Vercel/Cloudflare.
*   Pruebas finales de QA (responsividad en mobile y seguridad en pasarelas de pago).

---

### ¿Cómo deseas proceder?
Puedo dejar este plan listo para ti en tu carpeta de Obsidian. Si quieres que comencemos con los preparativos de la estructura del subsitio o con cualquier otro paso, solo confírmamelo.
