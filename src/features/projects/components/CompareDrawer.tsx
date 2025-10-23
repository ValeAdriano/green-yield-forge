import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { X, ShoppingCart } from 'lucide-react';
import { Batch, Project } from '@/types';
import { formatCurrency, formatTons } from '@/lib/format';
import { useCartStore } from '@/store/cart.store';
import { useUIStore } from '@/store/ui.store';
import { toast } from '@/hooks/use-toast';

interface CompareDrawerProps {
  batches: Batch[];
  projects: Map<string, Project>;
}

export const CompareDrawer = ({ batches, projects }: CompareDrawerProps) => {
  const { compareDrawerOpen, setCompareDrawerOpen, compareBatches, removeFromCompare } = useUIStore();
  const { addItem } = useCartStore();

  const selectedBatches = batches.filter(b => compareBatches.includes(b.id));

  const handleAddToCart = (batch: Batch) => {
    const project = projects.get(batch.projectId);
    if (!project) return;

    addItem({
      batchId: batch.id,
      projectId: batch.projectId,
      projectName: project.name,
      qtyTons: batch.tonsCO2,
      pricePerTon: batch.pricePerTon,
      subtotal: batch.tonsCO2 * batch.pricePerTon,
    });

    toast({
      title: 'Adicionado ao carrinho',
      description: `${formatTons(batch.tonsCO2)} de ${project.name}`,
    });
  };

  return (
    <Sheet open={compareDrawerOpen} onOpenChange={setCompareDrawerOpen}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Comparar Lotes</SheetTitle>
          <SheetDescription>
            Compare até 4 lotes de créditos de carbono
          </SheetDescription>
        </SheetHeader>

        {selectedBatches.length === 0 ? (
          <div className="flex items-center justify-center h-64 text-muted-foreground">
            Nenhum lote selecionado para comparação
          </div>
        ) : (
          <div className="grid gap-4 mt-6">
            {selectedBatches.map((batch) => {
              const project = projects.get(batch.projectId);
              if (!project) return null;

              return (
                <div key={batch.id} className="border rounded-lg p-4 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-semibold">{project.name}</h4>
                      <p className="text-sm text-muted-foreground">{project.location}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeFromCompare(batch.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Quantidade</p>
                      <p className="font-semibold">{formatTons(batch.tonsCO2)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Preço/tonelada</p>
                      <p className="font-semibold text-accent">{formatCurrency(batch.pricePerTon)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total</p>
                      <p className="font-semibold">{formatCurrency(batch.tonsCO2 * batch.pricePerTon)}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <Badge variant={batch.status === 'AVAILABLE' ? 'default' : 'secondary'}>
                        {batch.status}
                      </Badge>
                    </div>
                  </div>

                  {batch.status === 'AVAILABLE' && (
                    <Button
                      className="w-full"
                      onClick={() => handleAddToCart(batch)}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      Adicionar ao Carrinho
                    </Button>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
