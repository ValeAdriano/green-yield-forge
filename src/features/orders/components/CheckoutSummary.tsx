import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { CartItem } from '@/types';
import { formatCurrency, formatTons } from '@/lib/format';

interface CheckoutSummaryProps {
  items: CartItem[];
  total: number;
}

export const CheckoutSummary = ({ items, total }: CheckoutSummaryProps) => {
  const totalTons = items.reduce((sum, item) => sum + item.qtyTons, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resumo do Pedido</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          {items.map((item) => (
            <div key={item.batchId} className="flex justify-between text-sm">
              <div className="flex-1">
                <p className="font-medium">{item.projectName}</p>
                <p className="text-muted-foreground">
                  {formatTons(item.qtyTons)} × {formatCurrency(item.pricePerTon)}
                </p>
              </div>
              <p className="font-semibold">{formatCurrency(item.subtotal)}</p>
            </div>
          ))}
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Total em tCO₂</span>
            <span className="font-medium">{formatTons(totalTons)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">{formatCurrency(total)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Impostos</span>
            <span className="font-medium">{formatCurrency(0)}</span>
          </div>
        </div>

        <Separator />

        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-accent">{formatCurrency(total)}</span>
        </div>
      </CardContent>
    </Card>
  );
};
