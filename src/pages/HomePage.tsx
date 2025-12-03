import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Shield, MapPin, QrCode, Users, Award } from 'lucide-react';

export const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Blockchain-Powered Ayurvedic Herb Traceability
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            From geo-tagged collection to consumer verification - ensuring authenticity, 
            sustainability, and trust in every Ayurvedic herb through permissioned blockchain technology.
          </p>
          <div className="flex justify-center space-x-4">
            <Link
              to="/consumer"
              className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Scan & Verify Products
            </Link>
            <Link
              to="/collector"
              className="bg-green-700 hover:bg-green-800 text-white px-6 py-3 rounded-lg font-semibold transition-colors border border-green-600"
            >
              Access Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Complete Supply Chain Transparency
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={MapPin}
              title="Geo-Tagged Collection"
              description="GPS-verified harvest locations with smart contract validation for authentic sourcing zones."
            />
            <FeatureCard
              icon={Shield}
              title="Quality Assurance"
              description="Lab-certified quality tests including moisture, pesticide, and DNA barcoding verification."
            />
            <FeatureCard
              icon={QrCode}
              title="QR Code Verification"
              description="Instant consumer access to complete product journey and authenticity certificates."
            />
          </div>
        </div>
      </div>

      {/* Stakeholder Section */}
      <div className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Multi-Stakeholder Ecosystem
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StakeholderCard
              title="Collectors & Farmers"
              description="Mobile DApp for geo-tagged harvest recording with offline capabilities."
              link="/collector"
              color="green"
            />
            <StakeholderCard
              title="Testing Labs"
              description="Quality certification and compliance testing workflow management."
              link="/lab"
              color="blue"
            />
            <StakeholderCard
              title="Manufacturers"
              description="Processing tracking and batch management with smart labeling."
              link="/manufacturer"
              color="purple"
            />
            <StakeholderCard
              title="Consumers"
              description="Product authenticity verification and supply chain transparency."
              link="/consumer"
              color="amber"
            />
          </div>
        </div>
      </div>

      {/* Impact Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Building Trust in Ayurvedic Heritage
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Our blockchain-based traceability system ensures that every Ayurvedic herb 
                meets the highest standards of authenticity, sustainability, and quality, 
                supporting India's rich medicinal tradition while meeting global regulatory requirements.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Award className="h-6 w-6 text-green-600" />
                  <span>AYUSH Ministry compliance ready</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Users className="h-6 w-6 text-green-600" />
                  <span>Support for rural communities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Leaf className="h-6 w-6 text-green-600" />
                  <span>Biodiversity conservation</span>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-green-100 to-amber-100 p-8 rounded-lg">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">95%</div>
                  <div className="text-sm text-gray-600">Traceability Accuracy</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">100%</div>
                  <div className="text-sm text-gray-600">Blockchain Verified</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">500+</div>
                  <div className="text-sm text-gray-600">Partner Farmers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-700">50+</div>
                  <div className="text-sm text-gray-600">Herb Species</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ icon: React.ComponentType<{ className?: string }>; title: string; description: string }> = ({
  icon: Icon,
  title,
  description
}) => (
  <div className="text-center p-6 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
    <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
      <Icon className="h-8 w-8 text-green-600" />
    </div>
    <h3 className="text-xl font-semibold mb-3 text-gray-900">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const StakeholderCard: React.FC<{ 
  title: string; 
  description: string; 
  link: string; 
  color: string 
}> = ({ title, description, link, color }) => {
  const colorClasses = {
    green: 'from-green-500 to-green-600 hover:from-green-600 hover:to-green-700',
    blue: 'from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700',
    purple: 'from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700',
    amber: 'from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700'
  };

  return (
    <Link
      to={link}
      className={`block bg-gradient-to-br ${colorClasses[color as keyof typeof colorClasses]} text-white p-6 rounded-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-200`}
    >
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-sm opacity-90">{description}</p>
    </Link>
  );
};