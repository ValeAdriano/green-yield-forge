import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Leaf, Search, ShoppingBag, Zap, Award, TrendingUp } from 'lucide-react';
import { useDataStore } from '@/store/data.store';
import { formatCurrency, formatTons } from '@/lib/format';

export const HomePage = () => {
  const navigate = useNavigate();
  const { getBatches, getProjectById } = useDataStore();

  const availableBatches = getBatches()
    .filter(b => b.status === 'AVAILABLE')
    .slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/10 to-background py-20">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
              <Leaf className="h-4 w-4" />
              Marketplace de Créditos de Carbono
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Compense suas emissões com{' '}
              <span className="text-primary">créditos certificados</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Conectamos empresas a projetos ambientais certificados, 
              facilitando a compensação de carbono de forma transparente e eficiente.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button size="lg" onClick={() => navigate('/projects')}>
                <Search className="h-5 w-5 mr-2" />
                Explorar Projetos
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate('/ingest')}>
                <Zap className="h-5 w-5 mr-2" />
                Cadastrar Lote
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 border-y">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <Award className="h-8 w-8 mx-auto text-primary mb-2" />
              <div className="text-3xl font-bold">100+</div>
              <div className="text-sm text-muted-foreground">Projetos Certificados</div>
            </div>
            <div className="text-center">
              <TrendingUp className="h-8 w-8 mx-auto text-accent mb-2" />
              <div className="text-3xl font-bold">50k+</div>
              <div className="text-sm text-muted-foreground">Toneladas Compensadas</div>
            </div>
            <div className="text-center">
              <Leaf className="h-8 w-8 mx-auto text-success mb-2" />
              <div className="text-3xl font-bold">25+</div>
              <div className="text-sm text-muted-foreground">Países Atendidos</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Como Funciona</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Um processo simples e transparente para compensar suas emissões de carbono
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                  <Search className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>Explore Projetos</CardTitle>
                <CardDescription>
                  Navegue por projetos certificados de reflorestamento, energia renovável e conservação
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
                  <ShoppingBag className="h-6 w-6 text-accent" />
                </div>
                <CardTitle>Compre Créditos</CardTitle>
                <CardDescription>
                  Adicione lotes ao carrinho e finalize sua compra de forma segura e rápida
                </CardDescription>
              </CardHeader>
            </Card>

            <Card>
              <CardHeader>
                <div className="h-12 w-12 rounded-lg bg-success/10 flex items-center justify-center mb-4">
                  <Award className="h-6 w-6 text-success" />
                </div>
                <CardTitle>Compense & Certifique</CardTitle>
                <CardDescription>
                  Receba certificados oficiais de compensação e mostre seu compromisso ambiental
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Available Batches Section */}
      {availableBatches.length > 0 && (
        <section className="py-20 bg-muted/50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Lotes Disponíveis</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Confira alguns dos lotes de créditos de carbono disponíveis agora
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              {availableBatches.map((batch) => {
                const project = getProjectById(batch.projectId);
                return (
                  <Card key={batch.id} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => navigate(`/projects/${batch.projectId}`)}>
                    <CardHeader>
                      <CardTitle className="text-lg">{project?.name || 'Projeto'}</CardTitle>
                      <CardDescription>Lote {batch.id.slice(0, 8)}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <p className="text-sm text-muted-foreground">
                        {formatTons(batch.tonsCO2)}
                      </p>
                      <p className="text-lg font-bold text-accent">
                        {formatCurrency(batch.pricePerTon)}/ton
                      </p>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-t from-primary/10 to-background">
        <div className="container">
          <Card className="max-w-3xl mx-auto">
            <CardContent className="pt-6 text-center space-y-4">
              <h2 className="text-2xl font-bold">Pronto para fazer a diferença?</h2>
              <p className="text-muted-foreground">
                Comece agora a compensar suas emissões e contribua para um futuro mais sustentável
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button size="lg" onClick={() => navigate('/projects')}>
                  Ver Projetos Disponíveis
                </Button>
                <Button size="lg" variant="outline" onClick={() => navigate('/orders')}>
                  Meus Pedidos
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};
