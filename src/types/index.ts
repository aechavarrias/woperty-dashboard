export interface Visit {
  id: string;
  date: string;
  visitor_name: string;
  status: 'Descartada' | 'Pendiente' | 'Interesado' | 'Realizada';
  comment: string;
}

export interface ExternalPortal {
  name: string;
  visits: number;
  url: string;
  icon: string;
}

export interface Metric {
  label: string;
  value: number | string;
  change: number;
  unit?: string;
}

export interface Service {
  name: string;
  description: string;
  color: string;
  icon: string;
}

export interface DashboardData {
  user_name: string;
  property_address: string;
  property_price: number;
  current_step: number;
  services: Service[];
  rental_probability: number;
  interest_trend: number[];
  price_trend: number[];
  improvement_suggestions: {
    drop_price_endpoint: string;
    highlight_endpoint: string;
    has_review: boolean;
    is_highlighted: boolean;
  };
  visits: Visit[];
  external_links: {
    portal_inmobiliario: {
      url: string;
      visits_count: number;
    };
    mercado_libre: {
      url: string;
      visits_count: number;
    };
    toctoc: {
      url: string;
      visits_count: number;
    };
    benchmark_link: string;
  };
  kpis: {
    weekly_visits: number;
    previous_weekly_visits: number;
    generated_contacts: number;
    previous_generated_contacts: number;
  };
}