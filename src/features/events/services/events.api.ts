import api from '@/lib/api';
import { IngestEvent } from '@/lib/validators';

interface IngestResponse {
  projectId: string;
  batchId: string;
  message: string;
}

interface ReceiptPayload {
  orderId: string;
}

export const eventsApi = {
  ingest: async (event: IngestEvent): Promise<IngestResponse> => {
    const { data } = await api.post('/events/ingest', event);
    return data;
  },

  receipt: async (payload: ReceiptPayload): Promise<void> => {
    await api.post('/events/receipt', payload);
  },
};
