import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProbabilityMeter from './ProbabilityMeter';
import InterestTrendChart from './InterestTrendChart';
import ServicesCard from './ServicesCard';
import ImprovementAction from './ImprovementAction';
import VisitsTable from './VisitTable';
import ExternalLinks from './ExternalLinks';
import MetricsSection from './MetricsSection';
import DashboardHeader from './DashboardHeader';
import BrokerageStatusStepper from './BrokerageStatusStepper';
import { DashboardData } from '../../types';
import { useParams } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { uuid } = useParams();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const baseUrl = import.meta.env.DEV ? '/api' : 'https://woperty.com/api';
        const response = await axios.get<DashboardData>(
          `${baseUrl}/external_dashboard/index/${uuid}`,
          { headers: { 'Accept': 'application/json', 'Content-Type': 'application/json', 'ngrok-skip-browser-warning': 'true' } }
        );
        console.log('Fetched data:', response.data);
        setData(response.data);
        setError(null);
      } catch (err) {
        setError('Error al cargar los datos del corretaje');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando datos del corretaje...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-md text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button onClick={() => window.location.reload()} className="px-4 py-2 bg-primary text-white rounded hover:bg-primary-dark transition-colors">
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!data) return null;

  console.log('Dashboard data:', data);
  const totalWeeks = data.interest_trend.length;

  const safeChange = (current: number, previous: number): number => {
    if (previous === 0) return 0;
    return Math.round(((current - previous) / previous) * 100);
  };

  const weeklyInterestData = data.interest_trend.map((visits, index) => ({ week: `Hace ${totalWeeks - index} semana${(totalWeeks - index) === 1 ? '' : 's'}`, visits, price: data.price_trend[index] }));
  // const weeklyInterestData = data.interest_trend.map((visits, index) => ({ week: `Semana ${index + 1}`, visits, price: data.price_trend[index] }));
  const externalPortals = [
    { name: 'Portal Inmobiliario', visits: data.external_links.portal_inmobiliario.visits_count, url: data.external_links.portal_inmobiliario.url, icon: 'home' },
    { name: 'Mercado Libre', visits: data.external_links.mercado_libre.visits_count, url: data.external_links.mercado_libre.url, icon: 'shopping-bag' },
    { name: 'TocToc', visits: data.external_links.toctoc.visits_count, url: data.external_links.toctoc.url, icon: 'bell' }
  ];
  const metrics = [
    { label: 'Visitas semanales', value: data.kpis.weekly_visits, change: safeChange(data.kpis.weekly_visits, data.kpis.previous_weekly_visits) },
    { label: 'Contactos generados', value: data.kpis.generated_contacts, change: safeChange(data.kpis.generated_contacts, data.kpis.previous_generated_contacts) }
  ];


  return (
    <div className="bg-gray-50 min-h-screen">
      <header className="bg-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <a href="https://www.woperty.com" target="_blank" rel="noopener noreferrer"><img src="/woperty-logo-2.png" alt="Woperty" className="h-8" /></a>
            <div className="text-right">
              <h1 className="text-right text-xl sm:text-xl font-bold text-gray-900">Resumen de tu arriendo</h1>
              <p className="text-sm sm:text-base text-gray-600 mt-1">{data.property_address}</p>
            </div>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 mt-4">
        
        <DashboardHeader userName={data.user_name} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <div className="flex flex-col gap-6 h-full">
            <ProbabilityMeter value={data.rental_probability} />
            <MetricsSection metrics={metrics} />
          </div>
          <InterestTrendChart data={weeklyInterestData} />
        </div>
        
        <div className="mb-6">
          <ServicesCard services={data.services} />
        </div>

        <div className="mb-6">
          <BrokerageStatusStepper currentStep={data.current_step as 1 | 2 | 3 | 4 | 5} />
        </div>
        {/* data.current_step as 1 | 2 | 3 | 4 | 5 */}
        
        <div className="mb-6">
          <ImprovementAction suggestions={data.improvement_suggestions} propertyAncillaryId={uuid!} currentPrice={data.property_price}/>
        </div>

        <div className="mb-6">
          <VisitsTable visits={data.visits} />
        </div>
        
        <div className="mb-6">
          <ExternalLinks portals={externalPortals} similarPropertiesUrl={data.external_links.benchmark_link}/>
        </div>
        
      </main>
      
      <footer className="bg-gray-900 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center">
          <a href="https://www.woperty.com" target="_blank" rel="noopener noreferrer">
            <img src="/white-logo.png" alt="Woperty" className="h-8" />
          </a>
        </div>
      </footer>
    </div>
  );
};

export default Dashboard;