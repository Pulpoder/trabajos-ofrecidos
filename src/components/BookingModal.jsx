import React, { useState, useEffect } from 'react';
import { X, MapPin, Calendar, Clock, User, Phone, Mail, AlertCircle, Star, Check } from 'lucide-react';

const BookingModal = ({ isOpen, onClose, service, professional = null }) => {
  const [step, setStep] = useState(1); // 1: datos, 2: confirmación, 3: éxito
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    address: '',
    city: 'Villa Dolores',
    urgency_level: 'normal',
    requested_date: '',
    client_name: '',
    client_phone: '',
    client_email: '',
    estimated_price: 0,
    client_notes: ''
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (isOpen && service) {
      setFormData(prev => ({
        ...prev,
        title: `Solicitud de ${service.name}`,
        estimated_price: service.base_price || service.min_price || 0
      }));
    }
  }, [isOpen, service]);

  const urgencyOptions = [
    { value: 'low', label: 'Baja prioridad', color: 'text-green-600', description: 'Puedo esperar algunos días' },
    { value: 'normal', label: 'Normal', color: 'text-blue-600', description: 'En los próximos días' },
    { value: 'high', label: 'Urgente', color: 'text-orange-600', description: 'Necesito ayuda hoy' },
    { value: 'emergency', label: 'Emergencia', color: 'text-red-600', description: 'Es una emergencia' }
  ];

  const validateForm = () => {
    const newErrors = {};

    if (!formData.client_name.trim()) newErrors.client_name = 'Nombre requerido';
    if (!formData.client_phone.trim()) newErrors.client_phone = 'Teléfono requerido';
    if (!formData.client_email.trim()) newErrors.client_email = 'Email requerido';
    if (!formData.address.trim()) newErrors.address = 'Dirección requerida';
    if (!formData.description.trim()) newErrors.description = 'Descripción requerida';
    if (!formData.requested_date) newErrors.requested_date = 'Fecha requerida';

    // Validar email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.client_email && !emailRegex.test(formData.client_email)) {
      newErrors.client_email = 'Email inválido';
    }

    // Validar teléfono argentino
    const phoneRegex = /^(\+54|0)?[\s-]?(\d{2,4})[\s-]?\d{6,8}$/;
    if (formData.client_phone && !phoneRegex.test(formData.client_phone)) {
      newErrors.client_phone = 'Teléfono inválido (ej: +54 351 123-4567)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    try {
      // Simular envío (aquí conectarías con Supabase)
      await new Promise(resolve => setTimeout(resolve, 2000));
      setStep(3);
    } catch (error) {
      console.error('Error enviando solicitud:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setStep(1);
    setFormData({
      title: '',
      description: '',
      address: '',
      city: 'Villa Dolores',
      urgency_level: 'normal',
      requested_date: '',
      client_name: '',
      client_phone: '',
      client_email: '',
      estimated_price: 0,
      client_notes: ''
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{service?.icon || '🛠️'}</div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {step === 1 && 'Solicitar Servicio'}
                {step === 2 && 'Confirmar Solicitud'}
                {step === 3 && '¡Solicitud Enviada!'}
              </h3>
              <p className="text-gray-600">{service?.name}</p>
            </div>
          </div>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Progress bar */}
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((num) => (
              <div key={num} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step >= num 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {step > num ? <Check className="w-4 h-4" /> : num}
                </div>
                {num < 3 && (
                  <div className={`h-1 w-16 ml-2 ${
                    step > num ? 'bg-blue-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {step === 1 && (
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Información del cliente */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                  <User className="w-5 h-5 mr-2" />
                  Información de Contacto
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Nombre completo *
                    </label>
                    <input
                      type="text"
                      value={formData.client_name}
                      onChange={(e) => setFormData(prev => ({ ...prev, client_name: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.client_name ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="Tu nombre completo"
                    />
                    {errors.client_name && (
                      <p className="text-red-600 text-xs mt-1">{errors.client_name}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono *
                    </label>
                    <input
                      type="tel"
                      value={formData.client_phone}
                      onChange={(e) => setFormData(prev => ({ ...prev, client_phone: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.client_phone ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder="+54 351 123-4567"
                    />
                    {errors.client_phone && (
                      <p className="text-red-600 text-xs mt-1">{errors.client_phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    value={formData.client_email}
                    onChange={(e) => setFormData(prev => ({ ...prev, client_email: e.target.value }))}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.client_email ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder="tu@email.com"
                  />
                  {errors.client_email && (
                    <p className="text-red-600 text-xs mt-1">{errors.client_email}</p>
                  )}
                </div>
              </div>

              {/* Información del servicio */}
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-gray-900 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Detalles del Servicio
                </h4>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Descripción del trabajo *
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    rows={3}
                    className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                      errors.description ? 'border-red-300' : 'border-gray-300'
                    }`}
                    placeholder={service?.slug === 'gomero' 
                      ? "Ej: Tengo una goma pinchada en la ruta 20, km 15. Necesito cambio de goma o reparación urgente."
                      : `Describe qué necesitas para tu ${service?.name?.toLowerCase()}`
                    }
                  />
                  {errors.description && (
                    <p className="text-red-600 text-xs mt-1">{errors.description}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Dirección *
                    </label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.address ? 'border-red-300' : 'border-gray-300'
                      }`}
                      placeholder={service?.slug === 'gomero' 
                        ? "Ruta 20, km 15 o dirección exacta"
                        : "Tu dirección completa"
                      }
                    />
                    {errors.address && (
                      <p className="text-red-600 text-xs mt-1">{errors.address}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Ciudad
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Fecha preferida *
                    </label>
                    <input
                      type="datetime-local"
                      value={formData.requested_date}
                      onChange={(e) => setFormData(prev => ({ ...prev, requested_date: e.target.value }))}
                      min={new Date().toISOString().slice(0, 16)}
                      className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                        errors.requested_date ? 'border-red-300' : 'border-gray-300'
                      }`}
                    />
                    {errors.requested_date && (
                      <p className="text-red-600 text-xs mt-1">{errors.requested_date}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Urgencia
                    </label>
                    <select
                      value={formData.urgency_level}
                      onChange={(e) => setFormData(prev => ({ ...prev, urgency_level: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      {urgencyOptions.map(option => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Notas adicionales
                  </label>
                  <textarea
                    value={formData.client_notes}
                    onChange={(e) => setFormData(prev => ({ ...prev, client_notes: e.target.value }))}
                    rows={2}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Información adicional que el profesional debería saber..."
                  />
                </div>
              </div>

              {/* Precio estimado */}
              {service && (
                <div className="bg-blue-50 rounded-lg p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-gray-700">Precio estimado:</span>
                    <span className="text-lg font-bold text-blue-600">
                      {service.min_price && service.max_price 
                        ? `$${service.min_price} - $${service.max_price}`
                        : service.base_price 
                        ? `Desde $${service.base_price}`
                        : 'A confirmar'
                      }
                    </span>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    *El precio final se confirmará con el profesional
                  </p>
                </div>
              )}

              {/* Botones */}
              <div className="flex space-x-4">
                <button
                  type="button"
                  onClick={handleClose}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                  {loading ? 'Enviando...' : 'Continuar'}
                </button>
              </div>
            </form>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  Confirmar Solicitud
                </h4>
                <p className="text-gray-600">
                  Revisa los datos antes de enviar tu solicitud
                </p>
              </div>

              {/* Resumen */}
              <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                <div><strong>Servicio:</strong> {service?.name}</div>
                <div><strong>Cliente:</strong> {formData.client_name}</div>
                <div><strong>Teléfono:</strong> {formData.client_phone}</div>
                <div><strong>Dirección:</strong> {formData.address}, {formData.city}</div>
                <div><strong>Fecha:</strong> {new Date(formData.requested_date).toLocaleString()}</div>
                <div><strong>Urgencia:</strong> {urgencyOptions.find(o => o.value === formData.urgency_level)?.label}</div>
                <div><strong>Descripción:</strong> {formData.description}</div>
              </div>

              <div className="flex space-x-4">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Volver
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Confirmar y Enviar
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center space-y-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <Check className="w-8 h-8 text-green-600" />
              </div>

              <div>
                <h4 className="text-xl font-bold text-gray-900 mb-2">
                  ¡Solicitud Enviada Exitosamente!
                </h4>
                <p className="text-gray-600">
                  Tu solicitud ha sido enviada. Los profesionales disponibles se pondrán en contacto contigo pronto.
                </p>
              </div>

              <div className="bg-blue-50 rounded-lg p-4 text-left">
                <h5 className="font-semibold text-blue-900 mb-2">¿Qué sigue?</h5>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• Los profesionales verán tu solicitud</li>
                  <li>• Te contactarán para confirmar detalles</li>
                  <li>• Podrás elegir el mejor presupuesto</li>
                  <li>• Recibirás confirmación por email y SMS</li>
                </ul>
              </div>

              <button
                onClick={handleClose}
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookingModal;