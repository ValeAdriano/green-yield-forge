import { Project, Batch, Order } from '@/types';

export const mockProjects: Project[] = [
  {
    id: '1',
    name: 'Reflorestamento Amazônia Sul',
    location: 'Pará, Brasil',
    hectares: 15000,
    description: 'Projeto de reflorestamento na Amazônia com foco em recuperação de áreas degradadas e proteção da biodiversidade.',
    certifier: 'Verra VCS',
    createdAt: '2024-01-15T10:00:00Z',
  },
  {
    id: '2',
    name: 'Energia Solar Nordeste',
    location: 'Bahia, Brasil',
    hectares: 500,
    description: 'Usina de energia solar fotovoltaica gerando créditos de carbono pela substituição de energia de fontes fósseis.',
    certifier: 'Gold Standard',
    createdAt: '2024-02-20T14:30:00Z',
  },
  {
    id: '3',
    name: 'Conservação Pantanal',
    location: 'Mato Grosso, Brasil',
    hectares: 25000,
    description: 'Preservação de área nativa do Pantanal com proteção de ecossistemas e fauna silvestre.',
    certifier: 'Verra VCS',
    createdAt: '2024-01-10T08:15:00Z',
  },
  {
    id: '4',
    name: 'Reflorestamento Mata Atlântica',
    location: 'São Paulo, Brasil',
    hectares: 8000,
    description: 'Recuperação de áreas de Mata Atlântica com plantio de espécies nativas e corredores ecológicos.',
    certifier: 'Biocarbon Registry',
    createdAt: '2024-03-05T11:20:00Z',
  },
  {
    id: '5',
    name: 'Energia Eólica Sul',
    location: 'Rio Grande do Sul, Brasil',
    hectares: 300,
    description: 'Parque eólico gerando energia limpa e créditos de carbono verificados.',
    certifier: 'Gold Standard',
    createdAt: '2024-02-18T16:45:00Z',
  },
  {
    id: '6',
    name: 'Conservação Cerrado',
    location: 'Goiás, Brasil',
    hectares: 18000,
    description: 'Proteção de área nativa do Cerrado com monitoramento de desmatamento evitado.',
    certifier: 'Verra VCS',
    createdAt: '2024-01-25T09:30:00Z',
  },
  {
    id: '7',
    name: 'Hidrelétrica Sustentável',
    location: 'Paraná, Brasil',
    hectares: 200,
    description: 'Pequena central hidrelétrica com mínimo impacto ambiental gerando créditos de carbono.',
    certifier: 'I-REC',
    createdAt: '2024-03-12T13:00:00Z',
  },
  {
    id: '8',
    name: 'Reflorestamento Caatinga',
    location: 'Ceará, Brasil',
    hectares: 6000,
    description: 'Recuperação de áreas degradadas da Caatinga com espécies nativas resistentes à seca.',
    certifier: 'Biocarbon Registry',
    createdAt: '2024-02-08T10:15:00Z',
  },
  {
    id: '9',
    name: 'Biomassa Sustentável',
    location: 'Minas Gerais, Brasil',
    hectares: 1000,
    description: 'Geração de energia através de biomassa sustentável substituindo combustíveis fósseis.',
    certifier: 'Gold Standard',
    createdAt: '2024-03-20T15:30:00Z',
  },
];

export const mockBatches: Batch[] = [
  // Projeto 1 - Reflorestamento Amazônia Sul
  { id: '1-1', projectId: '1', tonsCO2: 500.5, pricePerTon: 85.00, status: 'AVAILABLE', createdAt: '2024-01-15T10:00:00Z' },
  { id: '1-2', projectId: '1', tonsCO2: 1200.0, pricePerTon: 80.00, status: 'AVAILABLE', createdAt: '2024-01-16T10:00:00Z' },
  { id: '1-3', projectId: '1', tonsCO2: 300.0, pricePerTon: 90.00, status: 'SOLD', createdAt: '2024-01-10T10:00:00Z' },
  
  // Projeto 2 - Energia Solar
  { id: '2-1', projectId: '2', tonsCO2: 250.0, pricePerTon: 120.00, status: 'AVAILABLE', createdAt: '2024-02-20T14:30:00Z' },
  { id: '2-2', projectId: '2', tonsCO2: 400.0, pricePerTon: 115.00, status: 'RESERVED', createdAt: '2024-02-21T14:30:00Z' },
  
  // Projeto 3 - Conservação Pantanal
  { id: '3-1', projectId: '3', tonsCO2: 2000.0, pricePerTon: 75.00, status: 'AVAILABLE', createdAt: '2024-01-10T08:15:00Z' },
  { id: '3-2', projectId: '3', tonsCO2: 1500.0, pricePerTon: 78.00, status: 'AVAILABLE', createdAt: '2024-01-11T08:15:00Z' },
  { id: '3-3', projectId: '3', tonsCO2: 800.0, pricePerTon: 72.00, status: 'SOLD', createdAt: '2024-01-05T08:15:00Z' },
  
  // Projeto 4 - Mata Atlântica
  { id: '4-1', projectId: '4', tonsCO2: 600.0, pricePerTon: 95.00, status: 'AVAILABLE', createdAt: '2024-03-05T11:20:00Z' },
  { id: '4-2', projectId: '4', tonsCO2: 450.0, pricePerTon: 98.00, status: 'AVAILABLE', createdAt: '2024-03-06T11:20:00Z' },
  
  // Projeto 5 - Energia Eólica
  { id: '5-1', projectId: '5', tonsCO2: 350.0, pricePerTon: 110.00, status: 'AVAILABLE', createdAt: '2024-02-18T16:45:00Z' },
  { id: '5-2', projectId: '5', tonsCO2: 200.0, pricePerTon: 105.00, status: 'SOLD', createdAt: '2024-02-15T16:45:00Z' },
  
  // Projeto 6 - Cerrado
  { id: '6-1', projectId: '6', tonsCO2: 1800.0, pricePerTon: 70.00, status: 'AVAILABLE', createdAt: '2024-01-25T09:30:00Z' },
  { id: '6-2', projectId: '6', tonsCO2: 1000.0, pricePerTon: 68.00, status: 'AVAILABLE', createdAt: '2024-01-26T09:30:00Z' },
  
  // Projeto 7 - Hidrelétrica
  { id: '7-1', projectId: '7', tonsCO2: 180.0, pricePerTon: 100.00, status: 'AVAILABLE', createdAt: '2024-03-12T13:00:00Z' },
  
  // Projeto 8 - Caatinga
  { id: '8-1', projectId: '8', tonsCO2: 420.0, pricePerTon: 88.00, status: 'AVAILABLE', createdAt: '2024-02-08T10:15:00Z' },
  { id: '8-2', projectId: '8', tonsCO2: 320.0, pricePerTon: 92.00, status: 'RESERVED', createdAt: '2024-02-09T10:15:00Z' },
  
  // Projeto 9 - Biomassa
  { id: '9-1', projectId: '9', tonsCO2: 280.0, pricePerTon: 108.00, status: 'AVAILABLE', createdAt: '2024-03-20T15:30:00Z' },
];

export const mockOrders: Order[] = [
  {
    id: 'ord-001',
    projectId: '1',
    batchId: '1-3',
    buyerName: 'Empresa Verde Ltda',
    qtyTons: 300.0,
    total: 27000.00,
    status: 'PAID',
    createdAt: '2024-03-15T10:30:00Z',
    processedAt: '2024-03-15T10:35:00Z',
  },
  {
    id: 'ord-002',
    projectId: '3',
    batchId: '3-3',
    buyerName: 'Tech Solutions S.A.',
    qtyTons: 800.0,
    total: 57600.00,
    status: 'PAID',
    createdAt: '2024-03-14T14:20:00Z',
    processedAt: '2024-03-14T14:25:00Z',
  },
  {
    id: 'ord-003',
    projectId: '2',
    batchId: '2-2',
    buyerName: 'Indústria Sustentável',
    qtyTons: 400.0,
    total: 46000.00,
    status: 'PENDING',
    createdAt: '2024-03-22T16:45:00Z',
  },
  {
    id: 'ord-004',
    projectId: '5',
    batchId: '5-2',
    buyerName: 'Comércio Eco Brasil',
    qtyTons: 200.0,
    total: 21000.00,
    status: 'PAID',
    createdAt: '2024-03-20T11:15:00Z',
    processedAt: '2024-03-20T11:20:00Z',
  },
  {
    id: 'ord-005',
    projectId: '1',
    batchId: '1-1',
    buyerName: 'Agro Carbono Zero',
    qtyTons: 150.0,
    total: 12750.00,
    status: 'PENDING',
    createdAt: '2024-03-23T09:00:00Z',
  },
  {
    id: 'ord-006',
    projectId: '4',
    batchId: '4-1',
    buyerName: 'Construtora Ambiental',
    qtyTons: 250.0,
    total: 23750.00,
    status: 'PAID',
    createdAt: '2024-03-21T13:30:00Z',
    processedAt: '2024-03-21T13:35:00Z',
  },
  {
    id: 'ord-007',
    projectId: '8',
    batchId: '8-2',
    buyerName: 'Logística Verde Ltda',
    qtyTons: 320.0,
    total: 29440.00,
    status: 'CANCELLED',
    createdAt: '2024-03-18T15:20:00Z',
  },
  {
    id: 'ord-008',
    projectId: '6',
    batchId: '6-1',
    buyerName: 'Mineradora Responsável',
    qtyTons: 500.0,
    total: 35000.00,
    status: 'PAID',
    createdAt: '2024-03-19T10:45:00Z',
    processedAt: '2024-03-19T10:50:00Z',
  },
];

export const getProjectById = (id: string): Project | undefined => {
  return mockProjects.find(p => p.id === id);
};

export const getBatchesByProjectId = (projectId: string): Batch[] => {
  return mockBatches.filter(b => b.projectId === projectId);
};

export const getOrdersByProjectId = (projectId: string): Order[] => {
  return mockOrders.filter(o => o.projectId === projectId).slice(0, 5);
};
