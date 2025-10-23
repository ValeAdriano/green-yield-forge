export type ProjectStatus = 'ACTIVE' | 'INACTIVE';
export type BatchStatus = 'AVAILABLE' | 'RESERVED' | 'SOLD';
export type OrderStatus = 'PENDING' | 'PAID' | 'CANCELLED';

export interface Project {
  id: string;
  name: string;
  location: string;
  hectares?: number;
  description?: string;
  certifier?: string;
  createdAt?: string;
}

export interface Batch {
  id: string;
  projectId: string;
  tonsCO2: number;
  pricePerTon: number;
  status: BatchStatus;
  createdAt?: string;
}

export interface Order {
  id: string;
  projectId: string;
  batchId: string;
  buyerName: string;
  qtyTons: number;
  total: number;
  status: OrderStatus;
  createdAt?: string;
  processedAt?: string;
}

export interface AggregateProject {
  project: Project;
  batches: Batch[];
  lastOrders: Order[];
}

export interface CartItem {
  batchId: string;
  projectId: string;
  projectName: string;
  qtyTons: number;
  pricePerTon: number;
  subtotal: number;
  expiresAt: Date;
}

export interface ProjectFilters {
  search?: string;
  location?: string;
  certifier?: string;
  minPrice?: number;
  maxPrice?: number;
  status?: BatchStatus;
}
