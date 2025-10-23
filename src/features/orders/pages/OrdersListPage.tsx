import { useState, useEffect } from 'react';
import { OrderCard } from '../components/OrderCard';
import { Loading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';
import { Package } from 'lucide-react';
import { Order } from '@/types';
import { ordersApi } from '../services/orders.api';
import { ConfirmDialog } from '@/components/ConfirmDialog';
import { toast } from '@/hooks/use-toast';

export const OrdersListPage = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);

  const loadOrders = async () => {
    try {
      setLoading(true);
      setError(false);
      const data = await ordersApi.getAll();
      setOrders(data);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleCancelClick = (orderId: string) => {
    setSelectedOrderId(orderId);
    setCancelDialogOpen(true);
  };

  const handleConfirmCancel = async () => {
    if (!selectedOrderId) return;

    try {
      await ordersApi.cancel(selectedOrderId);
      toast({
        title: 'Pedido cancelado',
        description: 'O pedido foi cancelado com sucesso',
      });
      loadOrders();
    } catch (err) {
      // Error handled by interceptor
    } finally {
      setCancelDialogOpen(false);
      setSelectedOrderId(null);
    }
  };

  if (loading) return <Loading />;
  if (error) return <ErrorState onRetry={loadOrders} />;

  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Meus Pedidos</h1>
        <p className="text-muted-foreground mt-1">
          Acompanhe o status dos seus pedidos
        </p>
      </div>

      {orders.length === 0 ? (
        <EmptyState
          icon={Package}
          title="Nenhum pedido encontrado"
          description="Você ainda não realizou nenhum pedido"
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              onCancel={order.status === 'PENDING' ? handleCancelClick : undefined}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={cancelDialogOpen}
        onOpenChange={setCancelDialogOpen}
        title="Cancelar Pedido"
        description="Tem certeza que deseja cancelar este pedido? Esta ação não pode ser desfeita."
        onConfirm={handleConfirmCancel}
        confirmText="Cancelar Pedido"
        variant="destructive"
      />
    </div>
  );
};
