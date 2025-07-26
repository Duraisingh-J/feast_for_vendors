import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  children: React.ReactNode;
  className?: string;
  verified?: boolean;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  description, 
  icon: Icon, 
  children, 
  className = '',
  verified = true 
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 ${className}`}>
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <Icon className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="text-sm text-gray-600">{description}</p>
            </div>
          </div>
          {!verified && (
            <div className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded-full">
              Verification Required
            </div>
          )}
        </div>
        
        {verified ? (
          <div className="mt-4">
            {children}
          </div>
        ) : (
          <div className="mt-4 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <p className="text-sm text-yellow-800">
              Please complete vendor verification in your profile to access this feature.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FeatureCard;