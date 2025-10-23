import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ProjectCard } from '../components/ProjectCard';
import { ProjectFilters } from '../components/ProjectFilters';
import { CompareDrawer } from '../components/CompareDrawer';
import { Loading } from '@/components/Loading';
import { ErrorState } from '@/components/ErrorState';
import { EmptyState } from '@/components/EmptyState';
import { Package } from 'lucide-react';
import { Project, Batch, ProjectFilters as Filters } from '@/types';
import { useUIStore } from '@/store/ui.store';
import { mockProjects, mockBatches } from '@/data/mockData';

export const ProjectsListPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [filters, setFilters] = useState<Filters>({});
  
  const { setCompareDrawerOpen, addToCompare } = useUIStore();

  const loadData = async () => {
    try {
      setLoading(true);
      setError(false);
      // Simulando delay de API
      await new Promise(resolve => setTimeout(resolve, 500));
      setProjects(mockProjects);
      setBatches(mockBatches);
    } catch (err) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const filteredProjects = projects.filter((project) => {
    const projectBatches = batches.filter(b => b.projectId === project.id);
    
    if (filters.search && !project.name.toLowerCase().includes(filters.search.toLowerCase())) {
      return false;
    }
    if (filters.location && !project.location.toLowerCase().includes(filters.location.toLowerCase())) {
      return false;
    }
    if (filters.certifier && project.certifier && !project.certifier.toLowerCase().includes(filters.certifier.toLowerCase())) {
      return false;
    }
    if (filters.status) {
      const hasStatus = projectBatches.some(b => b.status === filters.status);
      if (!hasStatus) return false;
    }
    if (filters.minPrice !== undefined || filters.maxPrice !== undefined) {
      const prices = projectBatches.map(b => b.pricePerTon);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      
      if (filters.minPrice !== undefined && minPrice < filters.minPrice) return false;
      if (filters.maxPrice !== undefined && maxPrice > filters.maxPrice) return false;
    }
    
    return true;
  });

  const projectsMap = new Map(projects.map(p => [p.id, p]));

  if (loading) return <Loading />;
  if (error) return <ErrorState onRetry={loadData} />;

  return (
    <div className="container py-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Projetos de Carbono</h1>
          <p className="text-muted-foreground mt-1">
            Explore projetos certificados de crédito de carbono
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Novo Projeto
        </Button>
      </div>

      <ProjectFilters filters={filters} onChange={setFilters} />

      {filteredProjects.length === 0 ? (
        <EmptyState
          icon={Package}
          title="Nenhum projeto encontrado"
          description="Ajuste os filtros ou cadastre um novo projeto"
        />
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project) => {
            const projectBatches = batches.filter(b => b.projectId === project.id);
            const firstAvailableBatch = projectBatches.find(b => b.status === 'AVAILABLE');
            
            return (
              <ProjectCard
                key={project.id}
                project={project}
                batches={projectBatches}
                onCompare={firstAvailableBatch ? () => {
                  addToCompare(firstAvailableBatch.id);
                  setCompareDrawerOpen(true);
                } : undefined}
              />
            );
          })}
        </div>
      )}

      <CompareDrawer batches={batches} projects={projectsMap} />
    </div>
  );
};
