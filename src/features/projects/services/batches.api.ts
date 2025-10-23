import api from '@/lib/api';
import { Batch } from '@/types';
import { BatchCreate, BatchUpdate } from '@/lib/validators';

export const batchesApi = {
  getAll: async (params?: { status?: string }): Promise<Batch[]> => {
    const { data } = await api.get('/batches', { params });
    return data;
  },

  getById: async (id: string): Promise<Batch> => {
    const { data } = await api.get(`/batches/${id}`);
    return data;
  },

  create: async (batch: BatchCreate): Promise<Batch> => {
    const { data } = await api.post('/batches', batch);
    return data;
  },

  update: async (id: string, batch: BatchUpdate): Promise<Batch> => {
    const { data } = await api.put(`/batches/${id}`, batch);
    return data;
  },

  delete: async (id: string): Promise<void> => {
    await api.delete(`/batches/${id}`);
  },
};
