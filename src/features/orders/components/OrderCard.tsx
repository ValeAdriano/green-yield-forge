import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, User, X } from 'lucide-react';
import { Order } from '@/types';
import { formatCurrency, formatTons, formatDate } from '@/lib/format';

interface OrderCardProps {
  order: Order;
  onCancel?: (orderId: string) => void;
}

export const OrderCard = ({ order, onCancel }: OrderCardProps) => {
  const statusColors = {
    PENDING: 'secondary',
    PAID: 'default',
    CANCELLED: 'destructive',
  } as const;

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2">
              <Badge variant={statusColors[order.status]}>
                {order.status}
              </Badge>
              <span className="text-sm text-muted-foreground">
                Pedido #{order.id.slice(0, 8)}
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-muted-foreground" />
              <span>{order.buyerName}</span>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span>{formatDate(order.createdAt || '')}</span>
            </div>

            <div className="pt-2 border-t space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Quantidade</span>
                <span className="font-medium">{formatTons(order.qtyTons)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Total</span>
                <span className="text-lg font-bold text-accent">
                  {formatCurrency(order.total)}
                </span>
              </div>
            </div>
          </div>

          {order.status === 'PENDING' && onCancel && (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onCancel(order.id)}
              title="Cancelar pedido"
            >
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
