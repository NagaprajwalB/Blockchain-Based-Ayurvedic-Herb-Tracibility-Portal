import React, { useState } from 'react';
import { 
  User, 
  FileText, 
  MapPin, 
  CheckCircle,
  Upload,
  Camera,
  Map
} from 'lucide-react';

export const ProviderRegistration: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Step 1: Basic Details
    organizationName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    country: 'India',
    cooperativeId: '',
    
    // Step 2: Documents
    documents: [] as File[],
    
    // Step 3: Geo Provenance
    geoMethod: 'map', // map | upload | gps
    geoPoints: [] as { lat: number; lng: number; label: string }[],
    geoFile: null as File | null
  });

  const steps = [
    { number: 1, title: 'Basic Details', icon: User },
    { number: 2, title: 'Documents', icon: FileText },
    { number: 3, title: 'Geo Provenance', icon: MapPin },
    { number: 4, title: 'Review', icon: CheckCircle }
  ];

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    // Submit registration
    console.log('Submitting registration:', formData);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-sm">
        {/* Progress Steps */}
        <div className="px-6 py-4 border-b border-gray-200">
          <div className="flex items-center justify-between">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.number
                    ? 'bg-amber-600 text-white'
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  <step.icon className="h-5 w-5" />
                </div>
                <div className="ml-3">
                  <p className={`text-sm font-medium ${
                    currentStep >= step.number ? 'text-amber-600' : 'text-gray-500'
                  }`}>
                    Step {step.number}
                  </p>
                  <p className="text-xs text-gray-500">{step.title}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.number ? 'bg-amber-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="p-6">
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Basic Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Organization Name *
                  </label>
                  <input
                    type="text"
                    value={formData.organizationName}
                    onChange={(e) => setFormData({ ...formData, organizationName: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="ABC Farmers Cooperative"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Contact Person *
                  </label>
                  <input
                    type="text"
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="contact@example.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="+91 9876543210"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Address *
                  </label>
                  <textarea
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="Complete address with pin code"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country
                  </label>
                  <select
                    value={formData.country}
                    onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option value="India">India</option>
                    <option value="Nepal">Nepal</option>
                    <option value="Sri Lanka">Sri Lanka</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Cooperative ID (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.cooperativeId}
                    onChange={(e) => setFormData({ ...formData, cooperativeId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="COOP-12345"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Upload Documents</h2>
              <p className="text-gray-600">
                Please upload the required legal documents for verification.
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                {[
                  { type: 'AYUSH License', required: true },
                  { type: 'GST Certificate', required: true },
                  { type: 'Bank Details', required: true },
                  { type: 'Other Licenses', required: false }
                ].map((doc) => (
                  <div key={doc.type} className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-amber-400 transition-colors">
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm font-medium text-gray-900">{doc.type}</p>
                    {doc.required && <p className="text-xs text-red-600">Required</p>}
                    <button className="mt-2 text-sm text-amber-600 hover:text-amber-700">
                      Choose File
                    </button>
                  </div>
                ))}
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900 mb-2">Document Requirements</h4>
                <ul className="text-sm text-blue-700 space-y-1">
                  <li>• All documents must be in PDF format</li>
                  <li>• Maximum file size: 10MB per document</li>
                  <li>• Documents should be clear and readable</li>
                  <li>• AYUSH license must be valid and current</li>
                </ul>
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Geo Provenance</h2>
              <p className="text-gray-600">
                Specify your harvest locations to enable geo-fencing validation.
              </p>

              <div className="grid md:grid-cols-3 gap-4">
                <button
                  onClick={() => setFormData({ ...formData, geoMethod: 'map' })}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    formData.geoMethod === 'map'
                      ? 'border-amber-500 bg-amber-50 text-amber-700'
                      : 'border-gray-200 hover:border-amber-300'
                  }`}
                >
                  <Map className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-medium">Select on Map</p>
                  <p className="text-xs text-gray-500">Interactive map selection</p>
                </button>

                <button
                  onClick={() => setFormData({ ...formData, geoMethod: 'upload' })}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    formData.geoMethod === 'upload'
                      ? 'border-amber-500 bg-amber-50 text-amber-700'
                      : 'border-gray-200 hover:border-amber-300'
                  }`}
                >
                  <Upload className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-medium">Upload File</p>
                  <p className="text-xs text-gray-500">CSV or KML format</p>
                </button>

                <button
                  onClick={() => setFormData({ ...formData, geoMethod: 'gps' })}
                  className={`p-4 border-2 rounded-lg text-center transition-colors ${
                    formData.geoMethod === 'gps'
                      ? 'border-amber-500 bg-amber-50 text-amber-700'
                      : 'border-gray-200 hover:border-amber-300'
                  }`}
                >
                  <Camera className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-medium">Live GPS</p>
                  <p className="text-xs text-gray-500">Mobile capture</p>
                </button>
              </div>

              {formData.geoMethod === 'map' && (
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <Map className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Interactive map would be displayed here</p>
                  <p className="text-sm text-gray-500 mt-2">Click to add harvest locations</p>
                </div>
              )}

              {formData.geoMethod === 'upload' && (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600 mb-2">Upload geo-data file</p>
                  <p className="text-sm text-gray-500 mb-4">Supported formats: CSV, KML</p>
                  <button className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700">
                    Choose File
                  </button>
                </div>
              )}

              {formData.geoMethod === 'gps' && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <div className="flex items-center space-x-3 mb-4">
                    <Camera className="h-6 w-6 text-blue-600" />
                    <h4 className="font-medium text-blue-900">Live GPS Capture</h4>
                  </div>
                  <p className="text-blue-700 text-sm mb-4">
                    Use the mobile app to capture GPS coordinates directly from your harvest locations.
                  </p>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
                    Open Mobile App
                  </button>
                </div>
              )}
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-6">
              <h2 className="text-xl font-semibold text-gray-900">Review & Submit</h2>
              
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-medium text-gray-900 mb-4">Registration Summary</h3>
                
                <div className="grid md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Organization Details</h4>
                    <p><strong>Name:</strong> {formData.organizationName}</p>
                    <p><strong>Contact:</strong> {formData.contactPerson}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Phone:</strong> {formData.phone}</p>
                  </div>
                  
                  <div>
                    <h4 className="font-medium text-gray-700 mb-2">Documents</h4>
                    <p>✓ AYUSH License uploaded</p>
                    <p>✓ GST Certificate uploaded</p>
                    <p>✓ Bank Details uploaded</p>
                  </div>
                </div>
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-900 mb-2">What happens next?</h4>
                <ul className="text-sm text-yellow-700 space-y-1">
                  <li>• Your documents will be reviewed within 2-3 business days</li>
                  <li>• You'll receive an email notification once verified</li>
                  <li>• After verification, you can start creating product batches</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          
          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="bg-amber-600 text-white px-6 py-2 rounded-md hover:bg-amber-700 transition-colors"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-700 transition-colors"
            >
              Submit Registration
            </button>
          )}
        </div>
      </div>
    </div>
  );
};