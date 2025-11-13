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
import { useDataStore } from '@/store/data.store';
import { checkoutSchema, CheckoutForm } from '@/lib/validators';
import { toast } from '@/hooks/use-toast';
import { formatCurrency } from '@/lib/format';

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, clearCart } = useCartStore();
  const { createOrder, updateBatch } = useDataStore();
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
      
      // Criar um pedido para cada item do carrinho
      for (const item of items) {
        createOrder({
          projectId: item.projectId,
          batchId: item.batchId,
          buyerName: data.buyerName,
          qtyTons: item.qtyTons,
          total: item.subtotal,
          status: 'PENDING',
        });
        
        // Atualizar status do batch para RESERVED
        updateBatch(item.batchId, { status: 'RESERVED' });
      }

      clearCart();
      
      toast({
        title: 'Pedido realizado!',
        description: `Total: ${formatCurrency(total)}`,
      });

      navigate('/orders');
    } catch (err) {
      toast({
        title: 'Erro ao criar pedido',
        description: 'Tente novamente mais tarde',
        variant: 'destructive',
      });
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
