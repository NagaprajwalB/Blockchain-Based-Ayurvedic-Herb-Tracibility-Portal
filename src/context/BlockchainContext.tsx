import React, { createContext, useContext, useState, useEffect } from 'react';

interface CollectionValidationData {
  gpsCoordinates: { lat: number; lng: number };
  species: string;
}

interface QualityValidationData {
  results: {
    moisture: number;
    pesticides: number;
    heavyMetals: number;
    microbial: boolean;
    dnaBarcode: string;
  };
}

interface ProcessingValidationData {
  temperature?: number;
  duration?: number;
  notes?: string;
}

interface CollectionEvent {
  id: string;
  batchId: string;
  species: string;
  collectorId: string;
  gpsCoordinates: { lat: number; lng: number };
  timestamp: string;
  location: string;
  quantity: number;
  initialQuality: {
    moisture: number;
    appearance: string;
    aroma: string;
  };
  photos: string[];
  verified: boolean;
}

interface QualityTest {
  id: string;
  batchId: string;
  labId: string;
  testDate: string;
  results: {
    moisture: number;
    pesticides: number;
    heavyMetals: number;
    microbial: boolean;
    dnaBarcode: string;
  };
  certified: boolean;
  certificateUrl: string;
}

interface ProcessingStep {
  id: string;
  batchId: string;
  processorId: string;
  step: string;
  timestamp: string;
  parameters: {
    temperature?: number;
    duration?: number;
    notes?: string;
    [key: string]: string | number | boolean | undefined;
  };
  location: string;
}

interface Batch {
  id: string;
  species: string;
  status: 'collected' | 'tested' | 'processed' | 'manufactured' | 'shipped';
  qrCode: string;
  collectionEvent?: CollectionEvent;
  qualityTests: QualityTest[];
  processingSteps: ProcessingStep[];
  currentLocation: string;
  sustainabilityScore: number;
}

interface BlockchainContextType {
  batches: Batch[];
  addCollectionEvent: (event: Omit<CollectionEvent, 'id' | 'verified'>) => void;
  addQualityTest: (test: Omit<QualityTest, 'id'>) => void;
  addProcessingStep: (step: Omit<ProcessingStep, 'id'>) => void;
  getBatch: (batchId: string) => Batch | undefined;
  validateSmartContract: (batchId: string, action: string, data: CollectionValidationData | QualityValidationData | ProcessingValidationData) => boolean;
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined);

export const useBlockchain = () => {
  const context = useContext(BlockchainContext);
  if (!context) {
    throw new Error('useBlockchain must be used within BlockchainProvider');
  }
  return context;
};

export const BlockchainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [batches, setBatches] = useState<Batch[]>([]);

  // Initialize with mock data
  useEffect(() => {
    const mockBatches: Batch[] = [
      {
        id: 'ASH-001',
        species: 'Ashwagandha',
        status: 'manufactured',
        qrCode: 'QR-ASH-001-2024',
        currentLocation: 'Mumbai Distribution Center',
        sustainabilityScore: 95,
        qualityTests: [],
        processingSteps: []
      },
      {
        id: 'TUL-002',
        species: 'Tulsi',
        status: 'tested',
        qrCode: 'QR-TUL-002-2024',
        currentLocation: 'Processing Facility - Bangalore',
        sustainabilityScore: 88,
        qualityTests: [],
        processingSteps: []
      }
    ];
    setBatches(mockBatches);
  }, []);

  const addCollectionEvent = (event: Omit<CollectionEvent, 'id' | 'verified'>) => {
    const collectionEvent: CollectionEvent = {
      ...event,
      id: `CE-${Date.now()}`,
      verified: validateGeoFencing(event.gpsCoordinates, event.species)
    };

    setBatches(prev => {
      const existingBatch = prev.find(b => b.id === event.batchId);
      if (existingBatch) {
        return prev.map(b => 
          b.id === event.batchId 
            ? { ...b, collectionEvent, status: 'collected' as const }
            : b
        );
      } else {
        const newBatch: Batch = {
          id: event.batchId,
          species: event.species,
          status: 'collected',
          qrCode: `QR-${event.batchId}-2024`,
          currentLocation: event.location,
          sustainabilityScore: 85,
          collectionEvent,
          qualityTests: [],
          processingSteps: []
        };
        return [...prev, newBatch];
      }
    });
  };

  const addQualityTest = (test: Omit<QualityTest, 'id'>) => {
    const qualityTest: QualityTest = {
      ...test,
      id: `QT-${Date.now()}`
    };

    setBatches(prev => prev.map(batch => 
      batch.id === test.batchId
        ? { 
            ...batch, 
            qualityTests: [...batch.qualityTests, qualityTest],
            status: 'tested' as const
          }
        : batch
    ));
  };

  const addProcessingStep = (step: Omit<ProcessingStep, 'id'>) => {
    const processingStep: ProcessingStep = {
      ...step,
      id: `PS-${Date.now()}`
    };

    setBatches(prev => prev.map(batch => 
      batch.id === step.batchId
        ? { 
            ...batch, 
            processingSteps: [...batch.processingSteps, processingStep],
            status: 'processed' as const,
            currentLocation: step.location
          }
        : batch
    ));
  };

  const getBatch = (batchId: string) => {
    return batches.find(batch => batch.id === batchId);
  };

  const validateSmartContract = (batchId: string, action: string, data: CollectionValidationData | QualityValidationData | ProcessingValidationData) => {
    // Simulate smart contract validation logic
    switch (action) {
      case 'collection': {
        const collectionData = data as CollectionValidationData;
        return validateGeoFencing(collectionData.gpsCoordinates, collectionData.species) && validateSeason(collectionData.species);
      }
      case 'quality': {
        const qualityData = data as QualityValidationData;
        return qualityData.results.moisture < 12 && qualityData.results.pesticides < 0.01;
      }
      case 'processing':
        return true; // Processing validation logic
      default:
        return true;
    }
  };

  const validateGeoFencing = (coordinates: { lat: number; lng: number }, species: string) => {
    // Simulate geo-fencing validation for different species
    const validZones = {
      'Ashwagandha': { latMin: 15, latMax: 30, lngMin: 75, lngMax: 85 },
      'Tulsi': { latMin: 10, latMax: 35, lngMin: 70, lngMax: 90 }
    };
    
    const zone = validZones[species as keyof typeof validZones];
    if (!zone) return true;
    
    return coordinates.lat >= zone.latMin && coordinates.lat <= zone.latMax &&
           coordinates.lng >= zone.lngMin && coordinates.lng <= zone.lngMax;
  };

  const validateSeason = (species: string) => {
    // Simulate seasonal validation
    const currentMonth = new Date().getMonth();
    const seasonalRules = {
      'Ashwagandha': [10, 11, 0, 1], // Nov-Feb
      'Tulsi': [2, 3, 4, 5, 6, 7, 8, 9] // Mar-Oct
    };
    
    const validMonths = seasonalRules[species as keyof typeof seasonalRules];
    return validMonths ? validMonths.includes(currentMonth) : true;
  };

  return (
    <BlockchainContext.Provider value={{
      batches,
      addCollectionEvent,
      addQualityTest,
      addProcessingStep,
      getBatch,
      validateSmartContract
    }}>
      {children}
    </BlockchainContext.Provider>
  );
};