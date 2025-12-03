import React from 'react';
import { Link } from 'react-router-dom';
import { Leaf, Users, ShoppingCart, Shield, MapPin, Award } from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-amber-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-800 to-green-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Leaf className="h-16 w-16 text-amber-300" />
            <h1 className="text-6xl font-bold">AyurTrace</h1>
          </div>
          <p className="text-2xl mb-8 max-w-4xl mx-auto">
            Blockchain-Powered Ayurvedic Herb Traceability
          </p>
          <p className="text-lg mb-12 max-w-3xl mx-auto opacity-90">
            From geo-tagged collection to consumer verification - ensuring authenticity, 
            sustainability, and trust in every Ayurvedic herb through permissioned blockchain technology.
          </p>
          
          {/* Main CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16">
            <Link
              to="/auth?role=provider"
              className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2"
            >
              <Users className="h-6 w-6" />
              <span>Login as Provider</span>
            </Link>
            <Link
              to="/auth?role=consumer"
              className="bg-green-700 hover:bg-green-800 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center justify-center space-x-2 border border-green-600"
            >
              <ShoppingCart className="h-6 w-6" />
              <span>Login as Consumer</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-900">
            Complete Supply Chain Transparency
          </h2>
          <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
            Every step from harvest to consumer is recorded on our permissioned blockchain network
          </p>
          
          <div className="grid md:grid-cols-3 gap-8">
            <FeatureCard
              icon={MapPin}
              title="Geo-Tagged Collection"
              description="GPS-verified harvest locations with smart contract validation for authentic sourcing zones and seasonal compliance."
            />
            <FeatureCard
              icon={Shield}
              title="Quality Assurance"
              description="Lab-certified quality tests including moisture, pesticide, DNA barcoding, and heavy metals verification."
            />
            <FeatureCard
              icon={Award}
              title="Smart Contract Purchases"
              description="Secure escrow-based transactions with automated dispute resolution and delivery confirmation."
            />
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-16 text-gray-900">
            How AyurTrace Works
          </h2>
          
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Provider Flow */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-amber-100 p-3 rounded-full">
                  <Users className="h-8 w-8 text-amber-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">For Providers</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Register & Verify</h4>
                    <p className="text-gray-600">Upload AYUSH licenses, GST documents, and geo-provenance data</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Create Product Batches</h4>
                    <p className="text-gray-600">Record harvest data, upload lab tests, and mint blockchain-backed products</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-amber-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Generate QR Codes</h4>
                    <p className="text-gray-600">Auto-generate unique QR codes for consumer verification</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Consumer Flow */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <div className="flex items-center space-x-3 mb-6">
                <div className="bg-green-100 p-3 rounded-full">
                  <ShoppingCart className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">For Consumers</h3>
              </div>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">1</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Browse Verified Products</h4>
                    <p className="text-gray-600">View products only from verified providers with complete transparency</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">2</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Scan QR Codes</h4>
                    <p className="text-gray-600">Instantly verify authenticity and view complete supply chain journey</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">3</div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Smart Contract Purchase</h4>
                    <p className="text-gray-600">Secure transactions with escrow protection and delivery tracking</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">500+</div>
              <div className="text-gray-600">Verified Providers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">50+</div>
              <div className="text-gray-600">Herb Species</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">10,000+</div>
              <div className="text-gray-600">Products Traced</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-green-600 mb-2">99.9%</div>
              <div className="text-gray-600">Traceability Accuracy</div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <Leaf className="h-8 w-8 text-amber-300" />
            <span className="text-2xl font-bold">AyurTrace</span>
          </div>
          <p className="text-gray-400 mb-6">
            Building trust in Ayurvedic heritage through blockchain transparency
          </p>
          <div className="flex justify-center space-x-6 text-sm text-gray-400">
            <span>AYUSH Ministry Compliant</span>
            <span>•</span>
            <span>Blockchain Secured</span>
            <span>•</span>
            <span>Sustainability Focused</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const FeatureCard: React.FC<{ 
  icon: React.ComponentType<{ className?: string }>; 
  title: string; 
  description: string 
}> = ({ icon: Icon, title, description }) => (
  <div className="text-center p-8 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-shadow bg-white">
    <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
      <Icon className="h-10 w-10 text-green-600" />
    </div>
    <h3 className="text-xl font-semibold mb-4 text-gray-900">{title}</h3>
    <p className="text-gray-600 leading-relaxed">{description}</p>
  </div>
);