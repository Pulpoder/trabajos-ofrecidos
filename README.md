# 🚀 Trabajos Ofrecidos

**Plataforma Completa de Servicios Profesionales con IA**

Conecta con profesionales verificados para cualquier trabajo: gomero, plomería, electricidad, carpintería y más. Disponible 24/7 en toda Argentina.

![Version](https://img.shields.io/badge/version-2.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61dafb.svg)
![Supabase](https://img.shields.io/badge/Supabase-Latest-green.svg)
![Tailwind](https://img.shields.io/badge/Tailwind-3.3.3-38bdf8.svg)

## ✨ Características Principales

### 🔧 Servicios Disponibles
- **🚗 Gomero** - Reparación de gomas y neumáticos (NUEVO)
- **🔧 Plomería** - Filtraciones, destapes, instalaciones
- **⚡ Electricidad** - Tableros, cableado, reparaciones
- **🔑 Cerrajería** - Apertura, cambio de cerraduras
- **🔨 Carpintería** - Muebles, reparaciones de madera
- **🎨 Pintura** - Interior y exterior
- **🧹 Limpieza** - Profunda y post-obra
- **🌱 Jardinería** - Mantenimiento y paisajismo
- **💻 Tecnología** - PC, WiFi, redes
- **🚚 Transporte** - Fletes, mudanzas, viajes

### 🚨 Servicios de Emergencia 24/7
- Gomero en ruta
- Plomería urgente
- Electricidad de emergencia
- Cerrajería 24hs

### 🌟 Funcionalidades
- ✅ Profesionales 100% verificados
- 📱 Responsive y mobile-first
- 🔍 Búsqueda inteligente con filtros
- ⭐ Sistema de calificaciones
- 💬 Chat en tiempo real
- 📍 Geolocalización
- 💰 Precios transparentes
- 🔔 Notificaciones push
- 📊 Dashboard para profesionales

## 🚀 Tecnologías

### Frontend
- **React 18** - Biblioteca de UI
- **Vite** - Build tool rápido
- **Tailwind CSS** - Framework de estilos
- **Lucide React** - Iconos modernos
- **Framer Motion** - Animaciones

### Backend
- **Supabase** - Backend as a Service
- **PostgreSQL** - Base de datos
- **Realtime** - Actualizaciones en tiempo real
- **Row Level Security** - Seguridad a nivel de fila

### Deploy
- **Vercel** - Hosting y CI/CD
- **GitHub** - Control de versiones

## 📦 Instalación

### Prerrequisitos
- Node.js 16+ 
- npm o yarn
- Cuenta en Supabase

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/trabajos-ofrecidos.git
cd trabajos-ofrecidos
```

### 2. Instalar dependencias
```bash
npm install
# o
yarn install
```

### 3. Configurar variables de entorno
```bash
cp .env.example .env.local
```

Edita `.env.local` con tus credenciales:
```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
```

### 4. Configurar base de datos
```bash
# Ejecutar en Supabase SQL Editor:
# Copiar contenido de supabase-config.sql
```

### 5. Ejecutar en desarrollo
```bash
npm run dev
# o
yarn dev
```

Visita `http://localhost:3000`

## 🗄️ Estructura del Proyecto

```
trabajos-ofrecidos/
├── src/
│   ├── components/          # Componentes React
│   │   ├── DynamicServices.jsx
│   │   ├── DynamicStats.jsx
│   │   └── BookingModal.jsx
│   ├── supabase.js         # Configuración Supabase
│   ├── App.jsx             # Componente principal
│   ├── main.jsx            # Entrada de la app
│   └── index.css           # Estilos globales
├── public/                 # Archivos estáticos
├── supabase-config.sql     # Script de base de datos
├── .env.local             # Variables de entorno
├── vite.config.js         # Configuración Vite
├── tailwind.config.js     # Configuración Tailwind
└── package.json           # Dependencias
```

## 🛠️ Scripts Disponibles

```bash
npm run dev          # Desarrollo
npm run build        # Compilar para producción
npm run preview      # Vista previa de producción
npm run setup        # Configuración inicial
npm run deploy       # Deploy a Vercel
```

## 🗃️ Base de Datos

### Tablas Principales
- `users` - Usuarios (clientes y profesionales)
- `services` - Catálogo de servicios
- `professional_services` - Relación profesionales-servicios
- `bookings` - Reservas y solicitudes
- `messages` - Chat entre usuarios
- `ratings` - Calificaciones y reviews
- `payments` - Gestión de pagos
- `notifications` - Sistema de notificaciones

### Servicios Incluidos
El proyecto incluye 18 servicios predefinidos organizados en 8 categorías:

**🏠 Hogar:** Plomería, Electricidad, Aire Acondicionado
**🏗️ Construcción:** Carpintería, Pintura, Albañilería  
**🧹 Limpieza:** Profunda, Post-obra
**🌱 Exterior:** Jardinería, Poda de árboles
**🚗 Automotriz:** **Gomero (NUEVO)**, Mecánica móvil, Lavadero
**💻 Tecnología:** Reparación PC, WiFi
**🚚 Transporte:** Fletes, Remis
**🔐 Seguridad:** Cerrajería

## 🌍 Deploy

### Vercel (Recomendado)
```bash
# 1. Instalar Vercel CLI
npm i -g vercel

# 2. Deploy
vercel --prod

# 3. Configurar variables de entorno en Vercel Dashboard
```

### Variables de Entorno en Producción
```env
VITE_SUPABASE_URL=tu_supabase_url
VITE_SUPABASE_ANON_KEY=tu_supabase_anon_key
VITE_APP_URL=https://tu-dominio.vercel.app
```

## 🎨 Personalización

### Colores
Modifica `tailwind.config.js` para cambiar la paleta:
```js
colors: {
  primary: { ... },
  gomero: { ... },
  emergency: { ... }
}
```

### Servicios
Agrega nuevos servicios en `supabase-config.sql`:
```sql
INSERT INTO services (name, slug, description, icon, category, ...)
VALUES ('Nuevo Servicio', 'nuevo-servicio', '...', '🔧', 'Categoría', ...);
```

## 🔧 Configuración Avanzada

### Mapas (Opcional)
```env
VITE_GOOGLE_MAPS_API_KEY=tu_google_maps_key
VITE_MAPBOX_TOKEN=tu_mapbox_token
```

### Pagos (Opcional)
```env
VITE_MERCADOPAGO_PUBLIC_KEY=tu_mercadopago_key
VITE_STRIPE_PUBLIC_KEY=tu_stripe_key
```

### Analytics (Opcional)
```env
VITE_GOOGLE_ANALYTICS_ID=tu_ga_id
```

## 📱 PWA (Progresivo)

El proyecto está preparado para ser una Progressive Web App:
- Service Worker configurado
- Manifest.json incluido
- Offline support (próximamente)

## 🧪 Testing

```bash
# Ejecutar tests (próximamente)
npm run test

# Coverage
npm run test:coverage
```

## 📈 Monitoring

### Supabase Dashboard
- Métricas de base de datos
- Logs en tiempo real
- Performance monitoring

### Vercel Analytics
- Web vitals
- Performance insights
- User analytics

## 🤝 Contribuir

1. Fork del proyecto
2. Crear feature branch (`git checkout -b feature/nueva-funcionalidad`)
3. Commit cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push to branch (`git push origin feature/nueva-funcionalidad`)
5. Abrir Pull Request

### Estándares de Código
- ESLint para JavaScript
- Prettier para formateo
- Conventional Commits
- Component naming: PascalCase
- File naming: kebab-case

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para detalles.

## 🆘 Soporte

### Documentación
- [Supabase Docs](https://supabase.com/docs)
- [React Docs](https://react.dev/)
- [Tailwind Docs](https://tailwindcss.com/)

### Contacto
- **Email:** info@trabajosofrecidos.com
- **WhatsApp:** +54 351 123-4567
- **Issues:** [GitHub Issues](https://github.com/tu-usuario/trabajos-ofrecidos/issues)

### FAQ

**P: ¿Cómo agrego un nuevo servicio?**
R: Edita `supabase-config.sql` y agrega el INSERT correspondiente.

**P: ¿Puedo cambiar los colores?**
R: Sí, modifica `tailwind.config.js` en la sección de colores.

**P: ¿Cómo funciona el servicio de gomero?**
R: Es un servicio móvil 24/7 para reparación de gomas en ruta o domicilio.

## 🗺️ Roadmap

### v2.1 (Próximamente)
- [ ] Chat en tiempo real
- [ ] Notificaciones push
- [ ] Sistema de pagos
- [ ] App móvil (React Native)

### v2.2
- [ ] IA para matching profesional-cliente
- [ ] Sistema de recompensas
- [ ] Integración con mapas
- [ ] Modo offline

### v3.0
- [ ] Marketplace de herramientas
- [ ] Formación y certificaciones
- [ ] API pública
- [ ] White-label solution

---

## ⭐ Si te gusta el proyecto, ¡dale una estrella!

**Desarrollado con ❤️ en Villa Dolores, Córdoba 🇦🇷**

*Conectando profesionales confiables en toda Argentina*