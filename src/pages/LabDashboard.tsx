import React, { useState } from 'react';
import { FlaskConical, CheckCircle, XCircle, FileText } from 'lucide-react';
import { useBlockchain } from '../context/BlockchainContext';

interface QualityTestForm {
  batchId: string;
  labId: string;
  moisture: number;
  pesticides: number;
  heavyMetals: number;
  microbial: boolean;
  dnaBarcode: string;
}

export const LabDashboard: React.FC = () => {
  const { batches, addQualityTest } = useBlockchain();
  const [testForm, setTestForm] = useState<QualityTestForm>({
    batchId: '',
    labId: 'LAB-001',
    moisture: 0,
    pesticides: 0,
    heavyMetals: 0,
    microbial: true,
    dnaBarcode: ''
  });
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'complete'>('idle');

  const handleTestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTestStatus('testing');

    // Simulate lab testing process
    setTimeout(() => {
      const certified = testForm.moisture < 12 && 
                      testForm.pesticides < 0.01 && 
                      testForm.heavyMetals < 0.005 &&
                      testForm.microbial;

      addQualityTest({
        batchId: testForm.batchId,
        labId: testForm.labId,
        testDate: new Date().toISOString(),
        results: {
          moisture: testForm.moisture,
          pesticides: testForm.pesticides,
          heavyMetals: testForm.heavyMetals,
          microbial: testForm.microbial,
          dnaBarcode: testForm.dnaBarcode || `DNA-${Date.now()}`
        },
        certified,
        certificateUrl: `https://certificates.ayurtrace.com/${testForm.batchId}-${Date.now()}.pdf`
      });

      setTestStatus('complete');
      setTestForm({
        ...testForm,
        batchId: '',
        moisture: 0,
        pesticides: 0,
        heavyMetals: 0,
        microbial: true,
        dnaBarcode: ''
      });
    }, 2000);
  };

  const availableBatches = batches.filter(batch => 
    batch.status === 'collected' && !batch.qualityTests.length
  );

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex items-center space-x-3 mb-8">
          <FlaskConical className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Quality Testing Laboratory</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Available Batches */}
          <div className="lg:col-span-1">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Pending Tests</h2>
            <div className="space-y-3">
              {availableBatches.map(batch => (
                <div
                  key={batch.id}
                  onClick={() => setTestForm({ ...testForm, batchId: batch.id })}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    testForm.batchId === batch.id
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium text-gray-900">{batch.id}</div>
                  <div className="text-sm text-gray-600">{batch.species}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    Location: {batch.currentLocation}
                  </div>
                </div>
              ))}
              {availableBatches.length === 0 && (
                <div className="text-gray-500 text-center py-8">
                  No batches pending testing
                </div>
              )}
            </div>
          </div>

          {/* Testing Form */}
          <div className="lg:col-span-2">
            <h2 className="text-xl font-semibold mb-4 text-gray-900">Quality Test Results</h2>
            
            <form onSubmit={handleTestSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Batch ID
                  </label>
                  <input
                    type="text"
                    value={testForm.batchId}
                    onChange={(e) => setTestForm({ ...testForm, batchId: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Select batch or enter ID"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Lab ID
                  </label>
                  <input
                    type="text"
                    value={testForm.labId}
                    readOnly
                    className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Moisture Content (%)
                  </label>
                  <input
                    type="number"
                    step="0.1"
                    value={testForm.moisture}
                    onChange={(e) => setTestForm({ ...testForm, moisture: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <div className="text-xs text-gray-500 mt-1">Standard: &lt; 12%</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Pesticide Residue (mg/kg)
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    value={testForm.pesticides}
                    onChange={(e) => setTestForm({ ...testForm, pesticides: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <div className="text-xs text-gray-500 mt-1">Standard: &lt; 0.01 mg/kg</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Heavy Metals (mg/kg)
                  </label>
                  <input
                    type="number"
                    step="0.001"
                    value={testForm.heavyMetals}
                    onChange={(e) => setTestForm({ ...testForm, heavyMetals: parseFloat(e.target.value) })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <div className="text-xs text-gray-500 mt-1">Standard: &lt; 0.005 mg/kg</div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Microbial Test
                  </label>
                  <select
                    value={testForm.microbial.toString()}
                    onChange={(e) => setTestForm({ ...testForm, microbial: e.target.value === 'true' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="true">Pass</option>
                    <option value="false">Fail</option>
                  </select>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    DNA Barcode
                  </label>
                  <input
                    type="text"
                    value={testForm.dnaBarcode}
                    onChange={(e) => setTestForm({ ...testForm, dnaBarcode: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Auto-generated if empty"
                  />
                </div>
              </div>

              {testStatus !== 'idle' && (
                <div className={`flex items-center space-x-2 p-4 rounded-md ${
                  testStatus === 'testing' ? 'bg-yellow-50 text-yellow-800' :
                  'bg-green-50 text-green-800'
                }`}>
                  {testStatus === 'testing' && <FlaskConical className="h-5 w-5 animate-pulse" />}
                  {testStatus === 'complete' && <CheckCircle className="h-5 w-5" />}
                  <span className="font-medium">
                    {testStatus === 'testing' && 'Processing quality tests...'}
                    {testStatus === 'complete' && 'Quality test completed and recorded on blockchain!'}
                  </span>
                </div>
              )}

              <button
                type="submit"
                disabled={testStatus === 'testing' || !testForm.batchId}
                className="w-full bg-blue-600 text-white py-3 px-6 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
              >
                {testStatus === 'testing' ? 'Processing...' : 'Submit Test Results'}
              </button>
            </form>
          </div>
        </div>

        {/* Recent Test Results */}
        <div className="mt-12">
          <h2 className="text-xl font-semibold mb-4 text-gray-900">Recent Test Results</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-50">
                  <th className="border border-gray-200 px-4 py-2 text-left">Batch ID</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Species</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Moisture</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Pesticides</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Status</th>
                  <th className="border border-gray-200 px-4 py-2 text-left">Certificate</th>
                </tr>
              </thead>
              <tbody>
                {batches.filter(batch => batch.qualityTests.length > 0).map(batch => 
                  batch.qualityTests.map(test => (
                    <tr key={test.id}>
                      <td className="border border-gray-200 px-4 py-2">{batch.id}</td>
                      <td className="border border-gray-200 px-4 py-2">{batch.species}</td>
                      <td className="border border-gray-200 px-4 py-2">{test.results.moisture}%</td>
                      <td className="border border-gray-200 px-4 py-2">{test.results.pesticides} mg/kg</td>
                      <td className="border border-gray-200 px-4 py-2">
                        <div className="flex items-center space-x-1">
                          {test.certified ? (
                            <>
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-green-600">Certified</span>
                            </>
                          ) : (
                            <>
                              <XCircle className="h-4 w-4 text-red-600" />
                              <span className="text-red-600">Failed</span>
                            </>
                          )}
                        </div>
                      </td>
                      <td className="border border-gray-200 px-4 py-2">
                        <a
                          href={test.certificateUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center space-x-1 text-blue-600 hover:text-blue-800"
                        >
                          <FileText className="h-4 w-4" />
                          <span>View</span>
                        </a>
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