import React, { useState } from 'react';
import { Search, Phone, Mail, MapPin, Star, Menu, X, Smartphone, CheckCircle } from 'lucide-react';
import DynamicServices from './components/DynamicServices';
import DynamicStats from './components/DynamicStats';
import BookingModal from './components/BookingModal';

function App() {
  const [selectedService, setSelectedService] = useState(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setShowBookingModal(true);
  };

  const handleCloseBookingModal = () => {
    setShowBookingModal(false);
    setSelectedService(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header mejorado */}
      <header className="bg-white shadow-lg sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🔧</div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Trabajos Ofrecidos</h1>
                <p className="text-xs text-gray-600">Tu plataforma de confianza</p>
              </div>
            </div>

            {/* Navigation desktop */}
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#servicios" className="text-gray-700 hover:text-blue-600 transition-colors">
                Servicios
              </a>
              <a href="#profesionales" className="text-gray-700 hover:text-blue-600 transition-colors">
                Profesionales
              </a>
              <a href="#como-funciona" className="text-gray-700 hover:text-blue-600 transition-colors">
                Cómo Funciona
              </a>
              <a href="#contacto" className="text-gray-700 hover:text-blue-600 transition-colors">
                Contacto
              </a>
            </nav>

            {/* CTA buttons desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <button className="text-blue-600 hover:text-blue-700 font-medium">
                Ingresar
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Registrarse
              </button>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-4 py-4 space-y-4">
              <a href="#servicios" className="block text-gray-700 hover:text-blue-600">
                Servicios
              </a>
              <a href="#profesionales" className="block text-gray-700 hover:text-blue-600">
                Profesionales
              </a>
              <a href="#como-funciona" className="block text-gray-700 hover:text-blue-600">
                Cómo Funciona
              </a>
              <a href="#contacto" className="block text-gray-700 hover:text-blue-600">
                Contacto
              </a>
              <hr className="border-gray-200" />
              <button className="block w-full text-left text-blue-600 font-medium">
                Ingresar
              </button>
              <button className="block w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                Registrarse
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Hero Section mejorado */}
      <section className="bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Encuentra el <span className="text-yellow-300">Profesional</span>
                <br />
                que Necesitas
              </h1>
              <p className="text-xl md:text-2xl opacity-90 max-w-3xl mx-auto">
                Desde gomeros hasta electricistas, conectamos tu necesidad con profesionales verificados en toda Argentina
              </p>
            </div>

            {/* Características destacadas */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl mb-3">🚗</div>
                <h3 className="text-lg font-semibold mb-2">Servicios 24/7</h3>
                <p className="text-sm opacity-80">Gomero, plomería y electricidad disponible las 24 horas</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl mb-3">✅</div>
                <h3 className="text-lg font-semibold mb-2">Profesionales Verificados</h3>
                <p className="text-sm opacity-80">Todos nuestros profesionales están verificados y calificados</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6">
                <div className="text-3xl mb-3">💰</div>
                <h3 className="text-lg font-semibold mb-2">Precios Transparentes</h3>
                <p className="text-sm opacity-80">Sin sorpresas, conoce el precio antes de contratar</p>
              </div>
            </div>

            {/* CTA principal */}
            <div className="space-y-4">
              <button 
                onClick={() => document.getElementById('servicios')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white text-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-gray-100 transition-all transform hover:scale-105 shadow-lg"
              >
                Ver Todos los Servicios
              </button>
              <p className="text-sm opacity-75">
                🇦🇷 Disponible en toda Argentina • Villa Dolores, Córdoba y más
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sección de estadísticas */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DynamicStats />
        </div>
      </section>

      {/* Sección de servicios */}
      <section id="servicios" className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <DynamicServices onServiceSelect={handleServiceSelect} />
        </div>
      </section>

      {/* Cómo funciona */}
      <section id="como-funciona" className="py-16 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              ¿Cómo Funciona?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              En solo 3 pasos simples conectas con el profesional que necesitas
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                step: 1,
                icon: <Search className="w-8 h-8 text-blue-600" />,
                title: "Busca el Servicio",
                description: "Encuentra el servicio que necesitas: gomero, plomero, electricista, y más."
              },
              {
                step: 2,
                icon: <Smartphone className="w-8 h-8 text-blue-600" />,
                title: "Solicita y Compara",
                description: "Describe tu necesidad y recibe presupuestos de profesionales verificados."
              },
              {
                step: 3,
                icon: <CheckCircle className="w-8 h-8 text-blue-600" />,
                title: "Contrata y Disfruta",
                description: "Elige el mejor profesional y recibe un servicio de calidad garantizada."
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {item.icon}
                </div>
                <div className="text-sm font-bold text-blue-600 mb-2">PASO {item.step}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Lo que Dicen Nuestros Clientes
            </h2>
            <p className="text-lg text-gray-600">
              Miles de personas ya confían en Trabajos Ofrecidos
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "María González",
                service: "Gomero",
                rating: 5,
                text: "Se me pinchó la goma en la ruta y el gomero llegó súper rápido. Excelente servicio y muy amable.",
                location: "Villa Dolores"
              },
              {
                name: "Carlos Rodríguez",
                service: "Electricista",
                rating: 5,
                text: "Problema eléctrico en casa resuelto en 2 horas. Profesional, limpio y precio justo.",
                location: "Córdoba Capital"
              },
              {
                name: "Ana Martínez",
                service: "Plomero",
                rating: 5,
                text: "Filtración en el baño solucionada perfectamente. Muy recomendable la plataforma.",
                location: "Villa Dolores"
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">"{testimonial.text}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-sm text-gray-500">{testimonial.location}</div>
                  </div>
                  <div className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                    {testimonial.service}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contacto" className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Logo y descripción */}
            <div className="md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="text-2xl">🔧</div>
                <h3 className="text-xl font-bold">Trabajos Ofrecidos</h3>
              </div>
              <p className="text-gray-400 mb-4">
                La plataforma líder en Argentina para conectar con profesionales confiables. 
                Desde Villa Dolores para todo el país.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white">
                  📘 Facebook
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  📷 Instagram
                </a>
                <a href="#" className="text-gray-400 hover:text-white">
                  🐦 Twitter
                </a>
              </div>
            </div>

            {/* Servicios populares */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Servicios Populares</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">🚗 Gomero</a></li>
                <li><a href="#" className="hover:text-white">🔧 Plomería</a></li>
                <li><a href="#" className="hover:text-white">⚡ Electricidad</a></li>
                <li><a href="#" className="hover:text-white">🔑 Cerrajería</a></li>
                <li><a href="#" className="hover:text-white">🎨 Pintura</a></li>
              </ul>
            </div>

            {/* Contacto */}
            <div>
              <h4 className="text-lg font-semibold mb-4">Contacto</h4>
              <div className="space-y-2 text-gray-400">
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>+54 351 123-4567</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>info@trabajosofrecidos.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>Villa Dolores, Córdoba</span>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Trabajos Ofrecidos. Todos los derechos reservados.</p>
            <p className="text-sm mt-2">Conectando profesionales confiables en toda Argentina 🇦🇷</p>
          </div>
        </div>
      </footer>

      {/* Modal de booking */}
      <BookingModal
        isOpen={showBookingModal}
        onClose={handleCloseBookingModal}
        service={selectedService}
      />
    </div>
  );
}

export default App;