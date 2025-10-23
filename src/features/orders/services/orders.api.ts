import api from '@/lib/api';
import { Order } from '@/types';

interface CreateOrderPayload {
  buyerName: string;
  items: Array<{
    batchId: string;
    projectId: string;
    qtyTons: number;
    pricePerTon: number;
  }>;
}

export const ordersApi = {
  getAll: async (params?: { status?: string; buyerName?: string }): Promise<Order[]> => {
    const { data } = await api.get('/orders', { params });
    return data;
  },

  getById: async (id: string): Promise<Order> => {
    const { data } = await api.get(`/orders/${id}`);
    return data;
  },

  create: async (order: CreateOrderPayload): Promise<Order> => {
    const { data } = await api.post('/orders', order);
    return data;
  },

  cancel: async (id: string): Promise<Order> => {
    const { data } = await api.put(`/orders/${id}`, { status: 'CANCELLED' });
    return data;
  },
};
