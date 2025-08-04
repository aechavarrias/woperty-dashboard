import React from 'react';
import { UserRound, DoorOpen, CircuitBoard, Star, Wand, Home } from 'lucide-react'; // Added Wand and Home for more service icons

// Define a type for a single service object as it comes from your backend
interface Service {
  name: string;
  description: string;
  color: string;
  icon: string; // Storing icon name as a string to map to Lucide components
}

interface ServicesCardProps {
  services: Service[]; // Now expects an array of Service objects
}

// Map icon strings to actual Lucide React components
const iconMap: { [key: string]: JSX.Element } = {
  'mdi:robot-vacuum': <CircuitBoard className="h-5 w-5" />, // Reusing CircuitBoard for intelligent mode
  'mdi:account-group': <UserRound className="h-5 w-5" />,
  'mdi:star': <Star className="h-5 w-5" />,
  'mdi:broom': <Wand className="h-5 w-5" />, // Using Wand for cleaning, you can choose another
  'mdi:handshake': <Home className="h-5 w-5" />, // Using Home for reception, you can choose another
};

const ServicesCard: React.FC<ServicesCardProps> = ({ services }) => {
  return (
    <div className="flex-1 flex flex-col bg-white rounded-lg shadow-md p-6">
      <h2 className="text-lg font-semibold mb-4">Servicios Contratados</h2>

      {services.map((service, index) => (
        <div key={index} className={`${service.color} flex flex-col sm:flex-row sm:items-center sm:justify-start mb-2 rounded-lg p-3`}>
          <div className="p-2 rounded-lg mr-0 sm:mr-3 mb-2 sm:mb-0">
            {iconMap[service.icon] || <CircuitBoard className="h-5 w-5" />} {/* Fallback icon */}
          </div>
          <div>
            <div className="font-medium">{service.name}</div>
            <p className="text-sm text-gray-600 whitespace-pre-line">{service.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
  };

export default ServicesCard;