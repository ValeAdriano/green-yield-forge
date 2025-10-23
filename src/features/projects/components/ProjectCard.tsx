import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MapPin, Layers, Award, Eye, Scale } from 'lucide-react';
import { Project, Batch } from '@/types';
import { formatCurrency } from '@/lib/format';
import { FavoriteButton } from './FavoriteButton';
import { useNavigate } from 'react-router-dom';

interface ProjectCardProps {
  project: Project;
  batches?: Batch[];
  onCompare?: () => void;
}

export const ProjectCard = ({ project, batches = [], onCompare }: ProjectCardProps) => {
  const navigate = useNavigate();
  const availableBatches = batches.filter(b => b.status === 'AVAILABLE');
  const minPrice = availableBatches.length > 0 
    ? Math.min(...availableBatches.map(b => b.pricePerTon))
    : 0;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 hover:border-primary/50">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1">
            <h3 className="font-semibold text-lg line-clamp-1">{project.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <MapPin className="h-3.5 w-3.5" />
              <span>{project.location}</span>
            </div>
          </div>
          <FavoriteButton projectId={project.id} />
        </div>
      </CardHeader>

      <CardContent className="space-y-3">
        {project.certifier && (
          <div className="flex items-center gap-2 text-sm">
            <Award className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">{project.certifier}</span>
          </div>
        )}

        {project.hectares && (
          <div className="flex items-center gap-2 text-sm">
            <Layers className="h-4 w-4 text-accent" />
            <span className="text-muted-foreground">{project.hectares.toLocaleString('pt-BR')} ha</span>
          </div>
        )}

        <div className="flex items-center justify-between pt-2 border-t">
          <div>
            <p className="text-xs text-muted-foreground">Lotes disponíveis</p>
            <p className="text-lg font-bold text-primary">{availableBatches.length}</p>
          </div>
          {minPrice > 0 && (
            <div className="text-right">
              <p className="text-xs text-muted-foreground">A partir de</p>
              <p className="text-lg font-bold text-accent">{formatCurrency(minPrice)}/t</p>
            </div>
          )}
        </div>

        {availableBatches.length > 0 && (
          <Badge variant="secondary" className="w-full justify-center">
            {availableBatches.reduce((sum, b) => sum + b.tonsCO2, 0).toFixed(2)} tCO₂ disponíveis
          </Badge>
        )}
      </CardContent>

      <CardFooter className="gap-2">
        <Button
          variant="outline"
          className="flex-1"
          onClick={() => navigate(`/projects/${project.id}`)}
        >
          <Eye className="h-4 w-4 mr-2" />
          Ver Detalhes
        </Button>
        {onCompare && availableBatches.length > 0 && (
          <Button
            variant="secondary"
            size="icon"
            onClick={onCompare}
            title="Comparar lotes"
          >
            <Scale className="h-4 w-4" />
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};
