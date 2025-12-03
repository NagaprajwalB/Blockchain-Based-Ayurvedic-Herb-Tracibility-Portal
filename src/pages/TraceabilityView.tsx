import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  MapPin, 
  Calendar, 
  User, 
  FlaskConical, 
  Factory, 
  Shield,
  Leaf,
  CheckCircle,
  XCircle,
  Award,
  ArrowLeft
} from 'lucide-react';
import { useBlockchain } from '../context/BlockchainContext';

export const TraceabilityView: React.FC = () => {
  const { batchId } = useParams<{ batchId: string }>();
  const { getBatch } = useBlockchain();
  
  const batch = batchId ? getBatch(batchId) : undefined;

  if (!batch) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h2>
          <p className="text-gray-600 mb-6">The requested batch ID could not be found in our records.</p>
          <Link
            to="/consumer"
            className="bg-amber-600 text-white px-6 py-3 rounded-md hover:bg-amber-700 transition-colors"
          >
            Try Another Product
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto p-6">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link
                to="/consumer"
                className="bg-gray-100 hover:bg-gray-200 p-2 rounded-md transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
              </Link>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">{batch.species} Traceability</h1>
                <p className="text-gray-600">Batch ID: {batch.id} | QR: {batch.qrCode}</p>
              </div>
            </div>
            <div className="text-right">
              <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium ${
                batch.status === 'manufactured' ? 'bg-green-100 text-green-800' :
                batch.status === 'processed' ? 'bg-purple-100 text-purple-800' :
                batch.status === 'tested' ? 'bg-blue-100 text-blue-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {batch.status.charAt(0).toUpperCase() + batch.status.slice(1)}
              </div>
              <div className="mt-2 flex items-center space-x-1 text-sm text-gray-500">
                <Award className="h-4 w-4 text-green-600" />
                <span>Sustainability Score: {batch.sustainabilityScore}%</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Collection Information */}
            {batch.collectionEvent && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Leaf className="h-6 w-6 text-green-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">Collection Details</h2>
                  {batch.collectionEvent.verified && (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  )}
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Harvest Location</h3>
                    <div className="flex items-start space-x-2">
                      <MapPin className="h-4 w-4 text-gray-500 mt-1" />
                      <div>
                        <p className="text-gray-900">{batch.collectionEvent.location}</p>
                        <p className="text-sm text-gray-500">
                          {batch.collectionEvent.gpsCoordinates.lat.toFixed(6)}, 
                          {batch.collectionEvent.gpsCoordinates.lng.toFixed(6)}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Collection Date</h3>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <p className="text-gray-900">
                        {new Date(batch.collectionEvent.timestamp).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Collector</h3>
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4 text-gray-500" />
                      <p className="text-gray-900">{batch.collectionEvent.collectorId}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-gray-700 mb-2">Quantity</h3>
                    <p className="text-gray-900">{batch.collectionEvent.quantity} kg</p>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-gray-50 rounded-md">
                  <h3 className="font-medium text-gray-700 mb-2">Initial Quality Assessment</h3>
                  <div className="grid md:grid-cols-3 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Moisture:</span>
                      <span className="ml-2 text-gray-900">{batch.collectionEvent.initialQuality.moisture}%</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Appearance:</span>
                      <span className="ml-2 text-gray-900">{batch.collectionEvent.initialQuality.appearance}</span>
                    </div>
                    <div>
                      <span className="text-gray-500">Aroma:</span>
                      <span className="ml-2 text-gray-900">{batch.collectionEvent.initialQuality.aroma}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Quality Tests */}
            {batch.qualityTests.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <FlaskConical className="h-6 w-6 text-blue-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">Quality Certification</h2>
                </div>

                {batch.qualityTests.map(test => (
                  <div key={test.id} className="mb-6 last:mb-0">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium text-gray-900">Lab: {test.labId}</h3>
                        <p className="text-sm text-gray-500">
                          Tested on {new Date(test.testDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div className="flex items-center space-x-2">
                        {test.certified ? (
                          <>
                            <CheckCircle className="h-5 w-5 text-green-600" />
                            <span className="text-green-600 font-medium">Certified</span>
                          </>
                        ) : (
                          <>
                            <XCircle className="h-5 w-5 text-red-600" />
                            <span className="text-red-600 font-medium">Failed</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div className="p-3 border rounded-md">
                        <div className="text-sm text-gray-500">Moisture Content</div>
                        <div className={`text-lg font-semibold ${
                          test.results.moisture < 12 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {test.results.moisture}%
                        </div>
                        <div className="text-xs text-gray-400">Limit: &lt; 12%</div>
                      </div>

                      <div className="p-3 border rounded-md">
                        <div className="text-sm text-gray-500">Pesticides</div>
                        <div className={`text-lg font-semibold ${
                          test.results.pesticides < 0.01 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {test.results.pesticides} mg/kg
                        </div>
                        <div className="text-xs text-gray-400">Limit: &lt; 0.01 mg/kg</div>
                      </div>

                      <div className="p-3 border rounded-md">
                        <div className="text-sm text-gray-500">Heavy Metals</div>
                        <div className={`text-lg font-semibold ${
                          test.results.heavyMetals < 0.005 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {test.results.heavyMetals} mg/kg
                        </div>
                        <div className="text-xs text-gray-400">Limit: &lt; 0.005 mg/kg</div>
                      </div>

                      <div className="p-3 border rounded-md">
                        <div className="text-sm text-gray-500">Microbial Test</div>
                        <div className={`text-lg font-semibold ${
                          test.results.microbial ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {test.results.microbial ? 'Pass' : 'Fail'}
                        </div>
                        <div className="text-xs text-gray-400">Pathogen screening</div>
                      </div>
                    </div>

                    <div className="mt-4 p-3 bg-gray-50 rounded-md">
                      <div className="text-sm text-gray-500">DNA Barcode</div>
                      <div className="font-mono text-sm text-gray-900">{test.results.dnaBarcode}</div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Processing Steps */}
            {batch.processingSteps.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <div className="flex items-center space-x-3 mb-6">
                  <div className="bg-purple-100 p-2 rounded-full">
                    <Factory className="h-6 w-6 text-purple-600" />
                  </div>
                  <h2 className="text-2xl font-semibold text-gray-900">Processing Timeline</h2>
                </div>

                <div className="relative">
                  {batch.processingSteps.map((step, index) => (
                    <div key={step.id} className="flex items-start space-x-4 mb-6 last:mb-0">
                      <div className="flex-shrink-0 w-8 h-8 bg-purple-600 text-white rounded-full flex items-center justify-center text-sm font-medium">
                        {index + 1}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-900 capitalize">{step.step}</h3>
                          <span className="text-sm text-gray-500">
                            {new Date(step.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{step.location}</p>
                        <div className="grid md:grid-cols-3 gap-3 text-sm">
                          <div>
                            <span className="text-gray-500">Temperature:</span>
                            <span className="ml-1 text-gray-900">{step.parameters.temperature}°C</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Duration:</span>
                            <span className="ml-1 text-gray-900">{step.parameters.duration}h</span>
                          </div>
                          <div>
                            <span className="text-gray-500">Processor:</span>
                            <span className="ml-1 text-gray-900">{step.processorId}</span>
                          </div>
                        </div>
                        {step.parameters.notes && (
                          <p className="text-sm text-gray-600 mt-2 italic">{step.parameters.notes}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sustainability Card */}
            <div className="bg-gradient-to-br from-green-100 to-green-200 rounded-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Award className="h-8 w-8 text-green-600" />
                <h3 className="text-xl font-semibold text-green-900">Sustainability</h3>
              </div>
              <div className="text-center mb-4">
                <div className="text-4xl font-bold text-green-700">{batch.sustainabilityScore}%</div>
                <div className="text-green-600">Overall Score</div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Organic Farming</span>
                  <span className="font-medium">✓ Certified</span>
                </div>
                <div className="flex justify-between">
                  <span>Fair Trade</span>
                  <span className="font-medium">✓ Verified</span>
                </div>
                <div className="flex justify-between">
                  <span>Carbon Footprint</span>
                  <span className="font-medium">Low</span>
                </div>
                <div className="flex justify-between">
                  <span>Biodiversity Impact</span>
                  <span className="font-medium">Positive</span>
                </div>
              </div>
            </div>

            {/* Blockchain Verification */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <Shield className="h-6 w-6 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900">Blockchain Verification</h3>
              </div>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Network</span>
                  <span className="text-green-600">✓ Verified</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Smart Contracts</span>
                  <span className="text-green-600">✓ Validated</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Immutable Records</span>
                  <span className="text-green-600">✓ Secured</span>
                </div>
                <div className="mt-4 p-3 bg-gray-50 rounded-md">
                  <div className="text-xs text-gray-500">Transaction Hash</div>
                  <div className="font-mono text-xs text-gray-700 break-all">
                    0x{batch.id.toLowerCase().replace('-', '')}...abc123
                  </div>
                </div>
              </div>
            </div>

            {/* Current Location */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <div className="flex items-center space-x-3 mb-4">
                <MapPin className="h-6 w-6 text-red-600" />
                <h3 className="text-lg font-semibold text-gray-900">Current Location</h3>
              </div>
              <p className="text-gray-600">{batch.currentLocation}</p>
              <div className="mt-4 h-32 bg-gray-100 rounded-md flex items-center justify-center">
                <p className="text-gray-500 text-sm">Interactive map would be displayed here</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};