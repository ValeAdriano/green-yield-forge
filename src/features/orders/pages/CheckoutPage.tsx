import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ArrowLeft } from 'lucide-react';
import { CheckoutSummary } from '../components/CheckoutSummary';
import { useCartStore } from '@/store/cart.store';
import { ordersApi } from '../services/orders.api';
import { checkoutSchema, CheckoutForm } from '@/lib/validators';
import { toast } from '@/hooks/use-toast';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const [submitting, setSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const total = items.reduce((sum, item) => sum + item.subtotal, 0);

  const onSubmit = async (data: CheckoutForm) => {
    // Validar itens não expirados
    const now = new Date();
    const expiredItems = items.filter(item => new Date(item.expiresAt) <= now);
    
    if (expiredItems.length > 0) {
      toast({
        title: 'Itens expirados',
        description: 'Alguns itens do carrinho expiraram. Por favor, remova-os.',
        variant: 'destructive',
      });
      return;
    }

    try {
      setSubmitting(true);
      
      const order = await ordersApi.create({
        buyerName: data.buyerName,
        items: items.map(item => ({
          batchId: item.batchId,
          projectId: item.projectId,
          qtyTons: item.qtyTons,
          pricePerTon: item.pricePerTon,
        })),
      });

      clearCart();
      
      toast({
        title: 'Pedido realizado!',
        description: `Pedido #${order.id.slice(0, 8)} criado com sucesso`,
      });

      navigate('/orders');
    } catch (err) {
      // Error handled by interceptor
    } finally {
      setSubmitting(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <div className="container py-8">
      <Button
        variant="ghost"
        onClick={() => navigate('/cart')}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Voltar ao Carrinho
      </Button>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Informações do Comprador</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="buyerName">Nome Completo</Label>
                <Input
                  id="buyerName"
                  {...register('buyerName')}
                  placeholder="Seu nome completo"
                  aria-invalid={!!errors.buyerName}
                  aria-describedby={errors.buyerName ? 'buyerName-error' : undefined}
                />
                {errors.buyerName && (
                  <p id="buyerName-error" className="text-sm text-destructive">
                    {errors.buyerName.message}
                  </p>
                )}
              </div>

              <Button type="submit" className="w-full" disabled={submitting}>
                {submitting ? 'Processando...' : 'Finalizar Pedido'}
              </Button>
            </form>
          </CardContent>
        </Card>

        <CheckoutSummary items={items} total={total} />
      </div>
    </div>
  );
};
