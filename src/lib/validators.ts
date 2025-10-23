import { z } from 'zod';

// Project schemas
export const projectCreateSchema = z.object({
  name: z.string().min(3, 'Nome deve ter no mínimo 3 caracteres'),
  location: z.string().min(2, 'Localização deve ter no mínimo 2 caracteres'),
  hectares: z.number().min(0, 'Hectares deve ser >= 0').optional(),
  description: z.string().optional(),
  certifier: z.string().optional(),
});

export const projectUpdateSchema = projectCreateSchema.partial();

// Batch schemas
export const batchCreateSchema = z.object({
  projectId: z.string().min(1, 'ID do projeto é obrigatório'),
  tonsCO2: z.number().min(0.01, 'Toneladas de CO2 deve ser > 0'),
  pricePerTon: z.number().min(0.01, 'Preço por tonelada deve ser > 0'),
  status: z.enum(['AVAILABLE', 'RESERVED', 'SOLD']).default('AVAILABLE'),
});

export const batchUpdateSchema = batchCreateSchema.partial();

// Order schemas
export const orderCreateSchema = z.object({
  buyerName: z.string().min(3, 'Nome do comprador deve ter no mínimo 3 caracteres'),
  items: z.array(
    z.object({
      batchId: z.string(),
      projectId: z.string(),
      qtyTons: z.number().min(0.01),
      pricePerTon: z.number().min(0.01),
    })
  ).min(1, 'Adicione pelo menos um item'),
});

export const checkoutSchema = z.object({
  buyerName: z.string().min(3, 'Nome do comprador deve ter no mínimo 3 caracteres'),
});

// Event schemas
export const ingestEventSchema = z.object({
  project: projectCreateSchema,
  batch: batchCreateSchema.omit({ projectId: true }),
});

export type ProjectCreate = z.infer<typeof projectCreateSchema>;
export type ProjectUpdate = z.infer<typeof projectUpdateSchema>;
export type BatchCreate = z.infer<typeof batchCreateSchema>;
export type BatchUpdate = z.infer<typeof batchUpdateSchema>;
export type OrderCreate = z.infer<typeof orderCreateSchema>;
export type CheckoutForm = z.infer<typeof checkoutSchema>;
export type IngestEvent = z.infer<typeof ingestEventSchema>;
