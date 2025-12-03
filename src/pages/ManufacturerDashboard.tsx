import React, { useState } from 'react';
import { Factory, QrCode, Truck } from 'lucide-react';
import { useBlockchain } from '../context/BlockchainContext';

interface ProcessingStepForm {
  batchId: string;
  step: string;
  processorId: string;
  location: string;
  temperature: number;
  duration: number;
  notes: string;
}

export const ManufacturerDashboard: React.FC = () => {
  const { batches, addProcessingStep } = useBlockchain();
  const [stepForm, setStepForm] = useState<ProcessingStepForm>({
    batchId: '',
    step: 'cleaning',
    processorId: 'MFG-001',
    location: 'Processing Facility - Bangalore',
    temperature: 25,
    duration: 0,
    notes: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    addProcessingStep({
      batchId: stepForm.batchId,
      processorId: stepForm.processorId,
      step: stepForm.step,
      timestamp: new Date().toISOString(),
      parameters: {
        temperature: stepForm.temperature,
        duration: stepForm.duration,
        notes: stepForm.notes
      },
      location: stepForm.location
    });

    // Reset form
    setStepForm({
      ...stepForm,
      batchId: '',
      notes: '',
      duration: 0
    });
  };

  const certifiedBatches = batches.filter(batch => 
    batch.qualityTests.some(test => test.certified)
  );

  const processingSteps = [
    { value: 'cleaning', label: 'Cleaning & Sorting' },
    { value: 'drying', label: 'Controlled Drying' },
    { value: 'grinding', label: 'Grinding & Sizing' },
    { value: 'mixing', label: 'Blending & Mixing' },
    { value: 'packaging', label: 'Final Packaging' },
    { value: 'labeling', label: 'QR Code Labeling' }
  ];

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-8">
          <Factory className="h-8 w-8 text-purple-600" />
          <h1 className="text-3xl font-bold text-gray-900">Manufacturing & Processing</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Processing Form */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Add Processing Step</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Batch ID
                  </label>
                  <select
                    value={stepForm.batchId}
                    onChange={(e) => setStepForm({ ...stepForm, batchId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  >
                    <option value="">Select batch</option>
                    {certifiedBatches.map(batch => (
                      <option key={batch.id} value={batch.id}>
                        {batch.id} - {batch.species}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Processing Step
                  </label>
                  <select
                    value={stepForm.step}
                    onChange={(e) => setStepForm({ ...stepForm, step: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    {processingSteps.map(step => (
                      <option key={step.value} value={step.value}>
                        {step.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Processor ID
                  </label>
                  <input
                    type="text"
                    value={stepForm.processorId}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Location
                  </label>
                  <input
                    type="text"
                    value={stepForm.location}
                    onChange={(e) => setStepForm({ ...stepForm, location: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Temperature (°C)
                  </label>
                  <input
                    type="number"
                    value={stepForm.temperature}
                    onChange={(e) => setStepForm({ ...stepForm, temperature: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Duration (hours)
                  </label>
                  <input
                    type="number"
                    step="0.5"
                    value={stepForm.duration}
                    onChange={(e) => setStepForm({ ...stepForm, duration: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    required
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Process Notes
                  </label>
                  <textarea
                    value={stepForm.notes}
                    onChange={(e) => setStepForm({ ...stepForm, notes: e.target.value })}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    placeholder="Additional processing details..."
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={!stepForm.batchId}
                className="w-full bg-purple-600 text-white py-3 px-6 rounded-md hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                Record Processing Step
              </button>
            </form>
          </div>

          {/* Batch Status */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Batch Status</h2>
            <div className="space-y-3">
              {certifiedBatches.map(batch => (
                <div key={batch.id} className="p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <div className="font-medium text-gray-900">{batch.id}</div>
                    <div className={`px-2 py-1 rounded-full text-xs ${
                      batch.status === 'manufactured' ? 'bg-green-100 text-green-800' :
                      batch.status === 'processed' ? 'bg-purple-100 text-purple-800' :
                      'bg-blue-100 text-blue-800'
                    }`}>
                      {batch.status}
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">{batch.species}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Steps: {batch.processingSteps.length}
                  </div>
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <QrCode className="h-3 w-3" />
                      <span>{batch.qrCode}</span>
                    </div>
                    {batch.status === 'manufactured' && (
                      <Truck className="h-4 w-4 text-green-600" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Processing Timeline */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Processing Timeline</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-2 text-left">Batch ID</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Step</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Processor</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Temperature</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Duration</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {batches.flatMap(batch => 
                  batch.processingSteps.map(step => (
                    <tr key={step.id}>
                      <td className="border border-gray-200 px-4 py-2">{batch.id}</td>
                      <td className="border border-gray-200 px-4 py-2 capitalize">{step.step}</td>
                      <td className="border border-gray-200 px-4 py-2">{step.processorId}</td>
                      <td className="border border-gray-200 px-4 py-2">{step.parameters.temperature}°C</td>
                      <td className="border border-gray-200 px-4 py-2">{step.parameters.duration}h</td>
                      <td className="border border-gray-200 px-4 py-2">
                        {new Date(step.timestamp).toLocaleDateString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};