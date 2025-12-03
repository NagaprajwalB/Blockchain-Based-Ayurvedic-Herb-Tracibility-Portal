export interface Provider {
  providerId: string;
  name: string;
  organizationName: string;
  contact: {
    email: string;
    phone: string;
    address: string;
  };
  walletAddress: string;
  country: string;
  cooperativeId?: string;
  documents: Document[];
  geoProvenance: GeoPoint[];
  status: 'PENDING' | 'VERIFIED' | 'REJECTED';
  verifiedAt?: string;
  verifierId?: string;
  createdAt: string;
}

export interface Document {
  id: string;
  type: 'AYUSH' | 'GST' | 'BANK' | 'LICENSE' | 'OTHER';
  fileName: string;
  fileHash: string;
  uploadedAt: string;
  verified: boolean;
}

export interface GeoPoint {
  lat: number;
  lng: number;
  label?: string;
}

export interface ProductBatch {
  batchId: string;
  providerId: string;
  productName: string;
  species: string;
  harvestSeason: string;
  harvestDate: string;
  harvestZone: GeoPoint;
  moistureThreshold: number;
  expectedQuantity: number;
  actualQuantity?: number;
  priceTerms: string;
  labTests: LabTest[];
  photos: string[];
  onChainHash: string;
  qrCode: string;
  status: 'DRAFT' | 'MINTED' | 'LISTED' | 'SOLD';
  createdAt: string;
  mintedAt?: string;
}

export interface LabTest {
  id: string;
  testType: 'MOISTURE' | 'PESTICIDE' | 'DNA' | 'HEAVY_METALS' | 'MICROBIAL';
  fileHash: string;
  result: string;
  passed: boolean;
  testDate: string;
  labId: string;
}

export interface Purchase {
  purchaseId: string;
  buyerId: string;
  batchId: string;
  quantity: number;
  totalPrice: number;
  paymentRef: string;
  status: 'PENDING_PAYMENT' | 'ESCROW_HELD' | 'IN_TRANSIT' | 'COMPLETED' | 'DISPUTE';
  createdAt: string;
  confirmedAt?: string;
  dispatchedAt?: string;
  deliveredAt?: string;
  transporterId?: string;
  dispatchProofHash?: string;
}

export interface User {
  id: string;
  email: string;
  role: 'PROVIDER' | 'CONSUMER';
  providerId?: string;
  walletAddress?: string;
  createdAt: string;
}

export interface ProvenanceBundle {
  batchId: string;
  collectionEvent: CollectionEvent;
  qualityTests: QualityTest[];
  processingSteps: ProcessingStep[];
  provider: Provider;
  currentStatus: string;
  sustainabilityScore: number;
}