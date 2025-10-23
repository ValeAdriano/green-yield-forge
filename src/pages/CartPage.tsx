import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ShoppingCart, Trash2, Clock } from 'lucide-react';
import { EmptyState } from '@/components/EmptyState';
import { useCartStore } from '@/store/cart.store';
import { formatCurrency, formatTons, formatRelativeTime } from '@/lib/format';
import { useEffect, useState } from 'react';

export const CartPage = () => {
  const navigate = useNavigate();
  const { items, removeItem, getTotal } = useCartStore();
  const [, forceUpdate] = useState({});

  // Force re-render every second to update timers
  useEffect(() => {
    const interval = setInterval(() => {
      forceUpdate({});
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const total = getTotal();

  if (items.length === 0) {
    return (
      <div className="container py-8">
        <EmptyState
          icon={ShoppingCart}
          title="Carrinho vazio"
          description="Adicione créditos de carbono ao carrinho para continuar"
          action={
            <Button onClick={() => navigate('/projects')}>
              Explorar Projetos
            </Button>
          }
        />
      </div>
    );
  }

  return (
    <div className="container py-8 space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Carrinho</h1>
        <p className="text-muted-foreground mt-1">
          {items.length} {items.length === 1 ? 'item' : 'itens'} no carrinho
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => {
            const now = new Date();
            const expiresAt = new Date(item.expiresAt);
            const isExpired = expiresAt <= now;
            const timeLeft = formatRelativeTime(item.expiresAt);

            return (
              <Card key={item.batchId} className={isExpired ? 'opacity-50' : ''}>
                <CardContent className="pt-6">
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1 space-y-2">
                      <h3 className="font-semibold">{item.projectName}</h3>
                      
                      <div className="flex items-center gap-2 text-sm">
                        <Clock className="h-4 w-4 text-muted-foreground" />
                        <span className={isExpired ? 'text-destructive' : 'text-muted-foreground'}>
                          {isExpired ? 'Expirado' : `Expira em ${timeLeft}`}
                        </span>
                      </div>

                      <div className="text-sm text-muted-foreground">
                        {formatTons(item.qtyTons)} × {formatCurrency(item.pricePerTon)}
                      </div>

                      <div className="text-lg font-bold text-accent">
                        {formatCurrency(item.subtotal)}
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeItem(item.batchId)}
                      aria-label="Remover item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardContent className="pt-6 space-y-4">
              <div>
                <h3 className="font-semibold mb-4">Resumo</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(total)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Impostos</span>
                    <span>{formatCurrency(0)}</span>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span className="text-accent">{formatCurrency(total)}</span>
              </div>

              <Button
                className="w-full"
                onClick={() => navigate('/checkout')}
                disabled={items.some(item => new Date(item.expiresAt) <= new Date())}
              >
                Finalizar Compra
              </Button>

              <Button
                variant="outline"
                className="w-full"
                onClick={() => navigate('/projects')}
              >
                Continuar Comprando
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};
