import { Visit, ExternalPortal, Metric } from '../types';

// Mock data for the dashboard

export const externalPortals: ExternalPortal[] = [
  {
    name: 'Portal Inmobiliario',
    visits: 245,
    url: 'https://www.portalinmobiliario.com',
    icon: 'home'
  },
  {
    name: 'Mercado Libre',
    visits: 187,
    url: 'https://www.mercadolibre.cl',
    icon: 'shopping-bag'
  },
  {
    name: 'TocToc',
    visits: 126,
    url: 'https://www.toctoc.com',
    icon: 'bell'
  }
];

export const weeklyInterestData = [
  { day: 'Lun', visits: 4 },
  { day: 'Mar', visits: 2 },
  { day: 'Mié', visits: 5 },
  { day: 'Jue', visits: 3 },
  { day: 'Vie', visits: 7 },
  { day: 'Sáb', visits: 12 },
  { day: 'Dom', visits: 8 }
];

export const metrics: Metric[] = [
  {
    label: 'Visitas semanales',
    value: 41,
    change: 8,
  },
  {
    label: 'Contactos generados',
    value: 12,
    change: 3,
  },
  {
    label: 'Tiempo promedio en portal',
    value: 18,
    unit: 'días',
    change: -2,
  },
  {
    label: 'Comparativa mercado',
    value: '15%',
    change: 5,
  }
];