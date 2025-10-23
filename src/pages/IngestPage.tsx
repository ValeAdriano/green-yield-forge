import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Zap } from 'lucide-react';
import { ingestEventSchema, IngestEvent } from '@/lib/validators';
import { eventsApi } from '@/features/events/services/events.api';
import { toast } from '@/hooks/use-toast';

export const IngestPage = () => {
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<IngestEvent>({
    resolver: zodResolver(ingestEventSchema),
    defaultValues: {
      batch: {
        status: 'AVAILABLE',
      },
    },
  });

  const onSubmit = async (data: IngestEvent) => {
    try {
      setSubmitting(true);
      const result = await eventsApi.ingest(data);
      
      toast({
        title: 'Ingestão concluída!',
        description: `Projeto: ${result.projectId.slice(0, 8)}, Lote: ${result.batchId.slice(0, 8)}`,
      });

      reset();
    } catch (err) {
      // Error handled by interceptor
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-8 max-w-3xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Ingestão por Evento</h1>
        <p className="text-muted-foreground mt-1">
          Crie projeto e lote via evento assíncrono
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Zap className="h-5 w-5 text-accent" />
            Novo Evento de Ingestão
          </CardTitle>
          <CardDescription>
            Preencha os dados do projeto e do lote para criar via função serverless
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Dados do Projeto</h3>
              
              <div className="space-y-2">
                <Label htmlFor="project.name">Nome do Projeto *</Label>
                <Input
                  id="project.name"
                  {...register('project.name')}
                  placeholder="Ex: Reflorestamento Amazônia"
                />
                {errors.project?.name && (
                  <p className="text-sm text-destructive">{errors.project.name.message}</p>
                )}
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="project.location">Localização *</Label>
                  <Input
                    id="project.location"
                    {...register('project.location')}
                    placeholder="Ex: Pará, Brasil"
                  />
                  {errors.project?.location && (
                    <p className="text-sm text-destructive">{errors.project.location.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="project.hectares">Hectares</Label>
                  <Input
                    id="project.hectares"
                    type="number"
                    step="0.01"
                    {...register('project.hectares', { valueAsNumber: true })}
                    placeholder="1000"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="project.certifier">Certificadora</Label>
                <Input
                  id="project.certifier"
                  {...register('project.certifier')}
                  placeholder="Ex: Verra, Gold Standard"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="project.description">Descrição</Label>
                <Textarea
                  id="project.description"
                  {...register('project.description')}
                  placeholder="Descreva o projeto de crédito de carbono..."
                  rows={3}
                />
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="font-semibold text-lg border-b pb-2">Dados do Lote</h3>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="batch.tonsCO2">Toneladas de CO₂ *</Label>
                  <Input
                    id="batch.tonsCO2"
                    type="number"
                    step="0.01"
                    {...register('batch.tonsCO2', { valueAsNumber: true })}
                    placeholder="100.50"
                  />
                  {errors.batch?.tonsCO2 && (
                    <p className="text-sm text-destructive">{errors.batch.tonsCO2.message}</p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="batch.pricePerTon">Preço por Tonelada (R$) *</Label>
                  <Input
                    id="batch.pricePerTon"
                    type="number"
                    step="0.01"
                    {...register('batch.pricePerTon', { valueAsNumber: true })}
                    placeholder="150.00"
                  />
                  {errors.batch?.pricePerTon && (
                    <p className="text-sm text-destructive">{errors.batch.pricePerTon.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="batch.status">Status</Label>
                <Select
                  defaultValue="AVAILABLE"
                  onValueChange={(value) => setValue('batch.status', value as any)}
                >
                  <SelectTrigger id="batch.status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AVAILABLE">Disponível</SelectItem>
                    <SelectItem value="RESERVED">Reservado</SelectItem>
                    <SelectItem value="SOLD">Vendido</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button type="submit" className="w-full" disabled={submitting}>
              {submitting ? 'Processando...' : 'Enviar Evento de Ingestão'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};
