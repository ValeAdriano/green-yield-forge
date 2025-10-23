import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, MapPin, Award, Layers, ShoppingCart, Clock } from 'lucide-react';
import { Loading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { FavoriteButton } from '../components/FavoriteButton';
import { AggregateProject } from '@/types';
import { projectsApi } from '../services/projects.api';
import { formatCurrency, formatTons, formatDate } from '@/lib/format';
import { useCartStore } from '@/store/cart.store';
import { toast } from '@/hooks/use-toast';

export const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<AggregateProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const { addItem } = useCartStore();

  const loadData = async () => {
    if (!id) return;
    try {
      setLoading(true);
      setError(false);
      const result = await projectsApi.getAggregate(id);
      setData(result);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [id]);

  const handleAddToCart = (batchId: string) => {
    if (!data) return;
    const batch = data.batches.find(b => b.id === batchId);
    if (!batch) return;

    addItem({
      batchId: batch.id,
      projectId: data.project.id,
      projectName: data.project.name,
      qtyTons: batch.tonsCO2,
      pricePerTon: batch.pricePerTon,
      subtotal: batch.tonsCO2 * batch.pricePerTon,
    });

    toast({
      title: 'Adicionado ao carrinho',
      description: `${formatTons(batch.tonsCO2)} de ${data.project.name}`,
    });
  };

  if (loading) return <Loading />;
  if (error || !data) return <ErrorState onRetry={loadData} />;

  const { project, batches, lastOrders } = data;

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate('/projects')}>
          <ArrowLeft className="h-5 w-5" />
        </Button>
        <div className="flex-1">
          <h1 className="text-3xl font-bold">{project.name}</h1>
          <div className="flex items-center gap-2 text-muted-foreground mt-1">
            <MapPin className="h-4 w-4" />
            <span>{project.location}</span>
          </div>
        </div>
        <FavoriteButton projectId={project.id} />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-primary/10">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Certificadora</p>
                <p className="font-semibold">{project.certifier || 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-accent/10">
                <Layers className="h-6 w-6 text-accent" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Área</p>
                <p className="font-semibold">
                  {project.hectares ? `${project.hectares.toLocaleString('pt-BR')} ha` : 'N/A'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-lg bg-success/10">
                <ShoppingCart className="h-6 w-6 text-success" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Lotes Disponíveis</p>
                <p className="font-semibold">
                  {batches.filter(b => b.status === 'AVAILABLE').length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {project.description && (
        <Card>
          <CardHeader>
            <CardTitle>Sobre o Projeto</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">{project.description}</p>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Lotes de Créditos</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {batches.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                Nenhum lote cadastrado
              </p>
            ) : (
              batches.map((batch) => (
                <div
                  key={batch.id}
                  className="flex items-center justify-between p-4 border rounded-lg hover:border-primary/50 transition-colors"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold">{formatTons(batch.tonsCO2)}</p>
                      <Badge variant={batch.status === 'AVAILABLE' ? 'default' : 'secondary'}>
                        {batch.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {formatCurrency(batch.pricePerTon)}/tonelada
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">Total</p>
                      <p className="text-lg font-bold text-accent">
                        {formatCurrency(batch.tonsCO2 * batch.pricePerTon)}
                      </p>
                    </div>
                    {batch.status === 'AVAILABLE' && (
                      <Button onClick={() => handleAddToCart(batch.id)}>
                        <ShoppingCart className="h-4 w-4 mr-2" />
                        Adicionar
                      </Button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {lastOrders.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Últimos Pedidos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {lastOrders.map((order) => (
                <div key={order.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="font-medium">{order.buyerName}</p>
                      <p className="text-sm text-muted-foreground">
                        {formatTons(order.qtyTons)} • {formatDate(order.createdAt || '')}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant={order.status === 'PAID' ? 'default' : 'secondary'}>
                      {order.status}
                    </Badge>
                    <p className="text-sm font-semibold mt-1">{formatCurrency(order.total)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};
