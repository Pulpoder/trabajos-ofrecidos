import React, { useState, useEffect } from 'react';
import { Star, Users, TrendingUp, Activity, MapPin, Award } from 'lucide-react';
import { getPlatformStats } from '../supabase';

const DynamicStats = () => {
  const [stats, setStats] = useState({
    totalServices: 0,
    totalProfessionals: 0,
    completedBookings: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const result = await getPlatformStats();
      if (result.success) {
        setStats(result.data);
      }
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  const statItems = [
    {
      icon: <Activity className="w-8 h-8 text-blue-600" />,
      value: stats.totalServices,
      label: 'Servicios Disponibles',
      description: 'Incluyendo gomero y servicios de emergencia',
      color: 'bg-blue-50 border-blue-200'
    },
    {
      icon: <Users className="w-8 h-8 text-green-600" />,
      value: stats.totalProfessionals,
      label: 'Profesionales Verificados',
      description: 'Expertos listos para ayudarte',
      color: 'bg-green-50 border-green-200'
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      value: stats.completedBookings,
      label: 'Trabajos Completados',
      description: 'Clientes satisfechos en toda Argentina',
      color: 'bg-purple-50 border-purple-200'
    },
    {
      icon: <Award className="w-8 h-8 text-yellow-600" />,
      value: '4.8',
      label: 'Rating Promedio',
      description: 'Calificación de nuestros profesionales',
      color: 'bg-yellow-50 border-yellow-200'
    }
  ];

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[1, 2, 3, 4].map(i => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-lg animate-pulse">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-gray-200 rounded-lg"></div>
              <div className="flex-1">
                <div className="h-6 bg-gray-200 rounded mb-2"></div>
                <div className="h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Título de la sección */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          🚀 Trabajos Ofrecidos en Números
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Conectamos a miles de personas con profesionales confiables en toda Argentina
        </p>
      </div>

      {/* Grid de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statItems.map((item, index) => (
          <StatCard
            key={index}
            icon={item.icon}
            value={item.value}
            label={item.label}
            description={item.description}
            color={item.color}
            delay={index * 100}
          />
        ))}
      </div>

      {/* Información adicional */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-3xl font-bold">24/7</div>
            <div className="text-sm opacity-90">Servicios de Emergencia</div>
            <div className="text-xs opacity-75">Gomero, plomería, electricidad</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold">100%</div>
            <div className="text-sm opacity-90">Profesionales Verificados</div>
            <div className="text-xs opacity-75">Identidad y experiencia confirmada</div>
          </div>
          <div className="space-y-2">
            <div className="text-3xl font-bold">🇦🇷</div>
            <div className="text-sm opacity-90">Cobertura Nacional</div>
            <div className="text-xs opacity-75">Desde Villa Dolores a todo el país</div>
          </div>
        </div>
      </div>

      {/* Testimonios rápidos */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            text: "Excelente servicio de gomero. Llegó en 20 minutos y resolvió mi problema en ruta.",
            author: "María L.",
            service: "Gomero",
            rating: 5
          },
          {
            text: "El plomero muy profesional, trabajo limpio y precio justo. Lo recomiendo.",
            author: "Carlos R.",
            service: "Plomería",
            rating: 5
          },
          {
            text: "Rápido y eficiente. El electricista solucionó mi emergencia al toque.",
            author: "Ana M.",
            service: "Electricidad",
            rating: 5
          }
        ].map((testimonial, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-3">
              {[...Array(testimonial.rating)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-gray-600 text-sm mb-3">"{testimonial.text}"</p>
            <div className="flex items-center justify-between">
              <span className="font-medium text-gray-900">{testimonial.author}</span>
              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {testimonial.service}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const StatCard = ({ icon, value, label, description, color, delay = 0 }) => {
  const [animated, setAnimated] = useState(false);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnimated(true);
      // Animar el número si es numérico
      if (typeof value === 'number' && value > 0) {
        const duration = 1500;
        const steps = 60;
        const increment = value / steps;
        let current = 0;
        
        const counter = setInterval(() => {
          current += increment;
          if (current >= value) {
            setDisplayValue(value);
            clearInterval(counter);
          } else {
            setDisplayValue(Math.floor(current));
          }
        }, duration / steps);
      } else {
        setDisplayValue(value);
      }
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return (
    <div className={`bg-white rounded-2xl p-6 shadow-lg border-2 transition-all duration-300 hover:shadow-xl hover:scale-105 ${color} ${
      animated ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4'
    }`}>
      <div className="flex items-center space-x-4">
        <div className="flex-shrink-0">
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          <div className="text-2xl font-bold text-gray-900 mb-1">
            {typeof displayValue === 'number' ? displayValue.toLocaleString() : displayValue}
          </div>
          <div className="text-sm font-medium text-gray-900 mb-1">
            {label}
          </div>
          <div className="text-xs text-gray-600">
            {description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DynamicStats;