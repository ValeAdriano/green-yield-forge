import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useFavoritesStore } from '@/store/favorites.store';
import { cn } from '@/lib/utils';

interface FavoriteButtonProps {
  projectId: string;
  className?: string;
}

export const FavoriteButton = ({ projectId, className }: FavoriteButtonProps) => {
  const { isProjectFavorite, toggleProject } = useFavoritesStore();
  const isFavorite = isProjectFavorite(projectId);

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleProject(projectId);
      }}
      className={cn('h-9 w-9', className)}
      aria-label={isFavorite ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
    >
      <Heart
        className={cn(
          'h-5 w-5 transition-colors',
          isFavorite ? 'fill-destructive text-destructive' : 'text-muted-foreground'
        )}
      />
    </Button>
  );
};
