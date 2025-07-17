import { createClient } from '@supabase/supabase-js'

// 🚀 TRABAJOS OFRECIDOS - Configuración Supabase
// Versión: 2.0 - Julio 2025

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Faltan variables de entorno de Supabase')
}

// Cliente de Supabase con configuración optimizada
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  },
  realtime: {
    params: {
      eventsPerSecond: 5
    }
  }
})

// ===============================================
// FUNCIONES HELPER PARA SERVICIOS
// ===============================================

/**
 * Obtiene todos los servicios activos
 */
export const getActiveServices = async () => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select(`
        *,
        total_professionals
      `)
      .eq('status', 'active')
      .order('display_order', { ascending: true })
      .order('name', { ascending: true })

    if (error) throw error

    return { success: true, data: data || [] }
  } catch (error) {
    console.error('Error cargando servicios:', error)
    return { success: false, error: error.message, data: [] }
  }
}

/**
 * Obtiene servicios por categoría
 */
export const getServicesByCategory = async (category) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .eq('category', category)
      .eq('status', 'active')
      .order('name', { ascending: true })

    if (error) throw error

    return { success: true, data: data || [] }
  } catch (error) {
    console.error('Error cargando servicios por categoría:', error)
    return { success: false, error: error.message, data: [] }
  }
}

/**
 * Busca servicios por término
 */
export const searchServices = async (searchTerm) => {
  try {
    const { data, error } = await supabase
      .from('services')
      .select('*')
      .or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,tags.cs.{${searchTerm}}`)
      .eq('status', 'active')
      .order('name', { ascending: true })

    if (error) throw error

    return { success: true, data: data || [] }
  } catch (error) {
    console.error('Error buscando servicios:', error)
    return { success: false, error: error.message, data: [] }
  }
}

/**
 * Obtiene profesionales por servicio
 */
export const getProfessionalsByService = async (serviceId, filters = {}) => {
  try {
    let query = supabase
      .from('users')
      .select(`
        *,
        professional_services!inner(
          price_per_hour,
          price_fixed,
          is_active,
          emergency_available,
          rating_average,
          total_bookings
        )
      `)
      .eq('user_type', 'profesional')
      .eq('is_active', true)
      .eq('is_available', true)
      .eq('professional_services.service_id', serviceId)
      .eq('professional_services.is_active', true)

    // Aplicar filtros opcionales
    if (filters.city) {
      query = query.eq('city', filters.city)
    }

    if (filters.verified) {
      query = query.eq('verified', true)
    }

    if (filters.emergency) {
      query = query.eq('professional_services.emergency_available', true)
    }

    // Ordenar por rating y número de trabajos
    query = query.order('rating_average', { ascending: false })
                 .order('completed_bookings', { ascending: false })

    const { data, error } = await query

    if (error) throw error

    return { success: true, data: data || [] }
  } catch (error) {
    console.error('Error cargando profesionales:', error)
    return { success: false, error: error.message, data: [] }
  }
}

/**
 * Obtiene estadísticas de la plataforma
 */
export const getPlatformStats = async () => {
  try {
    // Obtener estadísticas en paralelo
    const [servicesResult, professionalsResult, bookingsResult] = await Promise.all([
      supabase.from('services').select('*', { count: 'exact', head: true }).eq('status', 'active'),
      supabase.from('users').select('*', { count: 'exact', head: true }).eq('user_type', 'profesional').eq('is_active', true),
      supabase.from('bookings').select('*', { count: 'exact', head: true }).eq('status', 'completed')
    ])

    return {
      success: true,
      data: {
        totalServices: servicesResult.count || 0,
        totalProfessionals: professionalsResult.count || 0,
        completedBookings: bookingsResult.count || 0
      }
    }
  } catch (error) {
    console.error('Error cargando estadísticas:', error)
    return { 
      success: false, 
      error: error.message,
      data: { totalServices: 0, totalProfessionals: 0, completedBookings: 0 }
    }
  }
}

export default supabase