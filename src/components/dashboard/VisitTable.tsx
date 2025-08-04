import React, { useState } from 'react';
import { Visit } from '../../types';

interface VisitsTableProps {
  visits: Visit[];
}

const VisitsTable: React.FC<VisitsTableProps> = ({ visits: initialVisits }) => {
  const [visits] = useState<Visit[]>(initialVisits);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortField, setSortField] = useState<keyof Visit>('date');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [currentPage, setCurrentPage] = useState<number>(1);

  const pageSize = 5;

  const statusLabels: Record<string, string> = {
    visit_requested: "Esperando confirmación del interesado",
    rejected: "No aprobó evaluación financiera externa",
    settlement_sent: "Evaluando al interesado",
    visit_scheduled: "Visita agendada",
    canceled: "Visita cancelada por el interesado",
    follow_up: "“Visita realizada",
    no_show: "El interesado no asistió a la visita"
  };

  const getStatusStyle = (status: string) => {
    switch (status) {
      case 'visit_requested': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'settlement_sent': return 'bg-blue-100 text-blue-800';
      case 'visit_scheduled': return 'bg-blue-100 text-blue-800';
      case 'canceled': return 'bg-gray-100 text-gray-800';
      case 'follow_up': return 'bg-green-100 text-green-800';
      case 'no_show': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredVisits = visits.filter(visit => {
    if (statusFilter === 'all') return true;
    return visit.status === statusFilter;
  });

  const sortedVisits = [...filteredVisits].sort((a, b) => {
    if (a[sortField] < b[sortField]) return sortDirection === 'asc' ? -1 : 1;
    if (a[sortField] > b[sortField]) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  const totalPages = Math.ceil(sortedVisits.length / pageSize);
  const paginatedVisits = sortedVisits.slice((currentPage - 1) * pageSize, currentPage * pageSize);

  const handleSort = (field: keyof Visit) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h2 className="text-lg font-semibold">Seguimiento de Visitas</h2>
        <div className="mt-2 sm:mt-0">
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setCurrentPage(1); }}
            className="px-3 py-1 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Todos los estados</option>
            <option value="visit_requested">Esperando confirmación</option>
            <option value="visit_scheduled">Visita coordinada</option>
            <option value="follow_up">En seguimiento</option>
            <option value="no_show">No asistió</option>
            <option value="rejected">No aprobado</option>
            <option value="canceled">Cancelada</option>
            <option value="settlement_sent">Presupuesto enviado</option>
          </select>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {['date', 'visitor_name', 'status'].map((field) => (
                <th key={field} onClick={() => handleSort(field as keyof Visit)} className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer">
                  <span className="flex items-center"> {field === 'date' ? 'Fecha' : field === 'visitor_name' ? 'Visitante' : 'Estado'} {sortField === field && (<span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>)}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paginatedVisits.length > 0 ? (
              paginatedVisits.map((visit) => (
                <tr key={visit.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">
                    {new Date(visit.date).toLocaleDateString('es-CL')}
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-900 whitespace-nowrap">{visit.visitor_name}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 inline-flex text-xs font-semibold rounded-full ${getStatusStyle(visit.status)}`}>
                      {statusLabels[visit.status] || visit.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-4 py-4 text-center text-sm text-gray-500">
                  No hay visitas que coincidan con los filtros seleccionados
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="flex justify-end items-center gap-2 mt-4 text-sm">
          <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1} className="p-2 rounded disabled:opacity-50" title="Página anterior"><i className="fas fa-arrow-left"></i></button>
          <span className="text-gray-600">Página {currentPage} de {totalPages}</span>
          <button onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))} disabled={currentPage === totalPages} className="p-2 rounded disabled:opacity-50" title="Página siguiente"><i className="fas fa-arrow-right"></i></button>
        </div>
      )}
    </div>
  );
};

export default VisitsTable;
