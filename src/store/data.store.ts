import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Project, Batch, Order } from '@/types';
import { mockProjects, mockBatches, mockOrders } from '@/data/mockData';

interface DataState {
  projects: Project[];
  batches: Batch[];
  orders: Order[];
  
  // Projects
  getProjects: () => Project[];
  getProjectById: (id: string) => Project | undefined;
  createProject: (project: Omit<Project, 'id' | 'createdAt'>) => Project;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
  
  // Batches
  getBatches: () => Batch[];
  getBatchesByProjectId: (projectId: string) => Batch[];
  getBatchById: (id: string) => Batch | undefined;
  createBatch: (batch: Omit<Batch, 'id' | 'createdAt'>) => Batch;
  updateBatch: (id: string, batch: Partial<Batch>) => void;
  deleteBatch: (id: string) => void;
  
  // Orders
  getOrders: () => Order[];
  getOrdersByProjectId: (projectId: string) => Order[];
  getOrderById: (id: string) => Order | undefined;
  createOrder: (order: Omit<Order, 'id' | 'createdAt'>) => Order;
  updateOrder: (id: string, order: Partial<Order>) => void;
  cancelOrder: (id: string) => void;
  
  // Aggregates
  getProjectAggregate: (id: string) => { project: Project; batches: Batch[]; lastOrders: Order[] } | null;
  
  // Reset
  resetToMockData: () => void;
}

export const useDataStore = create<DataState>()(
  persist(
    (set, get) => ({
      projects: mockProjects,
      batches: mockBatches,
      orders: mockOrders,

      // Projects
      getProjects: () => get().projects,
      
      getProjectById: (id) => get().projects.find(p => p.id === id),
      
      createProject: (projectData) => {
        const newProject: Project = {
          ...projectData,
          id: `proj-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
        };
        set({ projects: [...get().projects, newProject] });
        return newProject;
      },
      
      updateProject: (id, projectData) => {
        set({
          projects: get().projects.map(p => 
            p.id === id ? { ...p, ...projectData } : p
          ),
        });
      },
      
      deleteProject: (id) => {
        set({ 
          projects: get().projects.filter(p => p.id !== id),
          batches: get().batches.filter(b => b.projectId !== id),
        });
      },

      // Batches
      getBatches: () => get().batches,
      
      getBatchesByProjectId: (projectId) => 
        get().batches.filter(b => b.projectId === projectId),
      
      getBatchById: (id) => get().batches.find(b => b.id === id),
      
      createBatch: (batchData) => {
        const newBatch: Batch = {
          ...batchData,
          id: `batch-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          createdAt: new Date().toISOString(),
        };
        set({ batches: [...get().batches, newBatch] });
        return newBatch;
      },
      
      updateBatch: (id, batchData) => {
        set({
          batches: get().batches.map(b => 
            b.id === id ? { ...b, ...batchData } : b
          ),
        });
      },
      
      deleteBatch: (id) => {
        set({ batches: get().batches.filter(b => b.id !== id) });
      },

      // Orders
      getOrders: () => get().orders,
      
      getOrdersByProjectId: (projectId) => 
        get().orders.filter(o => o.projectId === projectId).slice(0, 5),
      
      getOrderById: (id) => get().orders.find(o => o.id === id),
      
      createOrder: (orderData) => {
        const newOrder: Order = {
          ...orderData,
          id: `ord-${Date.now().toString().slice(-6)}`,
          createdAt: new Date().toISOString(),
        };
        set({ orders: [...get().orders, newOrder] });
        return newOrder;
      },
      
      updateOrder: (id, orderData) => {
        set({
          orders: get().orders.map(o => 
            o.id === id ? { ...o, ...orderData } : o
          ),
        });
      },
      
      cancelOrder: (id) => {
        set({
          orders: get().orders.map(o => 
            o.id === id ? { ...o, status: 'CANCELLED' } : o
          ),
        });
      },

      // Aggregates
      getProjectAggregate: (id) => {
        const project = get().getProjectById(id);
        if (!project) return null;
        
        const batches = get().getBatchesByProjectId(id);
        const lastOrders = get().getOrdersByProjectId(id);
        
        return { project, batches, lastOrders };
      },

      // Reset
      resetToMockData: () => {
        set({
          projects: mockProjects,
          batches: mockBatches,
          orders: mockOrders,
        });
      },
    }),
    {
      name: 'carbon-data-storage',
    }
  )
);
