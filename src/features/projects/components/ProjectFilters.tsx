import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Search, X } from 'lucide-react';
import { ProjectFilters as Filters } from '@/types';

interface ProjectFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

export const ProjectFilters = ({ filters, onChange }: ProjectFiltersProps) => {
  const [localFilters, setLocalFilters] = useState<Filters>(filters);

  const handleApply = () => {
    onChange(localFilters);
  };

  const handleClear = () => {
    const empty: Filters = {};
    setLocalFilters(empty);
    onChange(empty);
  };

  const hasFilters = Object.values(localFilters).some(v => v !== undefined && v !== '');

  return (
    <div className="space-y-4 p-4 border rounded-lg bg-card">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">Filtros</h3>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={handleClear}>
            <X className="h-4 w-4 mr-1" />
            Limpar
          </Button>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <div className="space-y-2">
          <Label htmlFor="search">Buscar</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Nome do projeto..."
              value={localFilters.search || ''}
              onChange={(e) => setLocalFilters({ ...localFilters, search: e.target.value })}
              className="pl-9"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="location">Localização</Label>
          <Input
            id="location"
            placeholder="Ex: Amazônia"
            value={localFilters.location || ''}
            onChange={(e) => setLocalFilters({ ...localFilters, location: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="certifier">Certificadora</Label>
          <Input
            id="certifier"
            placeholder="Ex: Verra"
            value={localFilters.certifier || ''}
            onChange={(e) => setLocalFilters({ ...localFilters, certifier: e.target.value })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="minPrice">Preço Mínimo (R$/t)</Label>
          <Input
            id="minPrice"
            type="number"
            placeholder="0"
            value={localFilters.minPrice || ''}
            onChange={(e) => setLocalFilters({ ...localFilters, minPrice: Number(e.target.value) || undefined })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="maxPrice">Preço Máximo (R$/t)</Label>
          <Input
            id="maxPrice"
            type="number"
            placeholder="1000"
            value={localFilters.maxPrice || ''}
            onChange={(e) => setLocalFilters({ ...localFilters, maxPrice: Number(e.target.value) || undefined })}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Select
            value={localFilters.status || 'all'}
            onValueChange={(value) => 
              setLocalFilters({ ...localFilters, status: value === 'all' ? undefined : value as any })
            }
          >
            <SelectTrigger id="status">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              <SelectItem value="AVAILABLE">Disponível</SelectItem>
              <SelectItem value="RESERVED">Reservado</SelectItem>
              <SelectItem value="SOLD">Vendido</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Button onClick={handleApply} className="w-full">
        Aplicar Filtros
      </Button>
    </div>
  );
};
