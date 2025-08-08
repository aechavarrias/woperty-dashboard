import React, { useState } from 'react';
import { Lightbulb, CheckCircle } from 'lucide-react';

interface ImprovementSuggestionData {
  drop_price_endpoint: string;
  highlight_endpoint: string;
  has_review: boolean;
  is_highlighted: boolean;
}

interface ImprovementActionProps {
  suggestions: ImprovementSuggestionData;
  propertyAncillaryId: string;
  currentPrice: number;
}

const ImprovementAction: React.FC<ImprovementActionProps> = ({ suggestions, propertyAncillaryId, currentPrice }) => {
  const [appliedActions, setAppliedActions] = useState<Set<string>>(new Set());
  const [appliedPriceDrop, setAppliedPriceDrop] = useState<number | null>(null);
  const [pendingConfirmation, setPendingConfirmation] = useState<{
    actionKey: string;
    label: string;
    endpoint: string;
    body: any;
  } | null>(null);

  const handleApply = async (label: string, endpoint: string, actionKey: string, body: any) => {
    if (appliedActions.has(actionKey)) return;

    setAppliedActions(prev => new Set(prev).add(actionKey));
    if (actionKey.startsWith('drop_')) setAppliedPriceDrop(body.percent);

    console.log("Enviando acción:", { endpoint, body });
    try {
      const fullUrl = import.meta.env.DEV 
        ? endpoint 
        : `https://woperty.com${endpoint}`;
      await fetch(fullUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
    } catch (err) {
      console.error('Error al aplicar la acción', err);
      alert(`Error al aplicar "${label}"`);
      setAppliedActions(prev => {
        const newSet = new Set(prev);
        newSet.delete(actionKey);
        return newSet;
      });
      if (actionKey.startsWith('drop_')) setAppliedPriceDrop(null);
    }
  };

  const confirmApply = async () => {
    if (!pendingConfirmation) return;
    const { label, endpoint, actionKey, body } = pendingConfirmation;
    await handleApply(label, endpoint, actionKey, body);
    setPendingConfirmation(null);
  };

  const priceOptions = [
    { label: 'Bajar 10%', percent: 10 },
    { label: 'Bajar 7%', percent: 7 },
    { label: 'Bajar 4%', percent: 4 }
  ];

  const showDropPrice = !suggestions.has_review;
  const showHighlight = !suggestions.is_highlighted && !!suggestions.highlight_endpoint;
  const hasActionsToShow = showDropPrice || showHighlight;

  if (!hasActionsToShow) return null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6 relative">
      {/* Capa difuminada si hay confirmación pendiente */}
      <div className={`${pendingConfirmation ? 'opacity-40 pointer-events-none' : ''}`}>
        <h2 className="text-lg font-semibold mb-4">Acciones de Mejora</h2>

        <div className="flex flex-col md:flex-row gap-4">
          {/* Bajar precio */}
          {showDropPrice && (
            <div className="flex-1 p-4 bg-gray-50 border border-gray-200 rounded-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Lightbulb className="text-blue-500 w-5 h-5 mr-2" />
                  <h3 className="font-medium text-gray-800">Bajar el precio</h3>
                </div>
                <p className="text-sm text-gray-600">Reducir el precio aumenta la visibilidad de tu propiedad.</p>
                <p className="text-sm text-gray-600 mb-4">El precio actual de la propiedad es de ${Number(currentPrice).toLocaleString('es-CL')}</p>
              </div>
              <div className="flex justify-end gap-2 flex-wrap mt-auto">
                {priceOptions.map(option => {
                  const key = `drop_${option.percent}`;
                  const isApplied = appliedActions.has(key);
                  const isDisabled = appliedPriceDrop !== null && !isApplied;

                  return (
                    <button
                      key={key}
                      onClick={() =>
                        setPendingConfirmation({
                          actionKey: key,
                          label: option.label,
                          endpoint: suggestions.drop_price_endpoint,
                          body: { property_ancillary_uuid: propertyAncillaryId, percent: option.percent }
                        })
                      }
                      disabled={isDisabled}
                      className={`px-3 py-1 text-sm rounded transition ${
                        isApplied
                          ? 'bg-green-100 text-green-700'
                          : isDisabled
                          ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                          : 'bg-primary text-white hover:bg-primary-dark'
                      }`}
                    >
                      {isApplied ? (
                        <span className="flex items-center">
                          <CheckCircle className="w-4 h-4 mr-1" /> Aplicado
                        </span>
                      ) : (
                        option.label
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Destacar propiedad */}
          {showHighlight && (
            <div className="flex-1 p-4 bg-gray-50 border border-gray-200 rounded-lg flex flex-col justify-between">
              <div>
                <div className="flex items-center mb-2">
                  <Lightbulb className="text-blue-500 w-5 h-5 mr-2" />
                  <h3 className="font-medium text-gray-800">Destacar propiedad</h3>
                </div>
                <p className="text-sm text-gray-600">Destaca tu propiedad en los portales y atrae más visitas.</p>
                <p className="text-sm text-gray-600 mb-4">Este servicio tiene un valor de $1.190 por día destacado y es al costo, tal como lo cobran los portales</p>
              </div>
              <div className="flex justify-end mt-auto">
                {appliedActions.has('highlight') ? (
                  <button disabled className="px-3 py-1 text-sm rounded bg-green-100 text-green-700 flex items-center"> 
                    <CheckCircle className="w-4 h-4 mr-1" /> Aplicado 
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      setPendingConfirmation({
                        actionKey: 'highlight',
                        label: 'Destacar',
                        endpoint: suggestions.highlight_endpoint,
                        body: { property_ancillary_uuid: propertyAncillaryId }
                      })
                    }
                    className="px-4 py-2 text-sm bg-primary text-white rounded hover:bg-primary-dark transition"
                  >
                    Destacar ahora
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Confirmación superpuesta */}
      {pendingConfirmation && (
        <div className="absolute inset-0 bg-white bg-opacity-80 z-10 flex flex-col items-center justify-center rounded-lg">
          <p className="mb-4 text-gray-800 text-center text-sm">
            ¿Estás seguro de que deseas aplicar <strong>{pendingConfirmation.label}</strong>?
          </p>
          <div className="flex gap-2">
            <button
              onClick={confirmApply}
              className="px-4 py-1 text-sm bg-green-600 text-white rounded hover:bg-green-700 transition"
            >
              Confirmar
            </button>
            <button
              onClick={() => setPendingConfirmation(null)}
              className="px-4 py-1 text-sm bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
            >
              Cancelar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImprovementAction;
