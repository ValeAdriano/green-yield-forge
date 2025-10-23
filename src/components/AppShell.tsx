import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Leaf, Home, Package, ShoppingCart, FileText, Zap } from 'lucide-react';
import { useCartStore } from '@/store/cart.store';

interface AppShellProps {
  children: ReactNode;
}

export const AppShell = ({ children }: AppShellProps) => {
  const location = useLocation();
  const { items } = useCartStore();

  const navigation = [
    { name: 'Início', href: '/', icon: Home },
    { name: 'Projetos', href: '/projects', icon: Package },
    { name: 'Pedidos', href: '/orders', icon: FileText },
    { name: 'Ingestão', href: '/ingest', icon: Zap },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center gap-2 font-semibold text-lg">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <Leaf className="h-5 w-5 text-primary-foreground" />
            </div>
            <span>Carbon<span className="text-primary">Credits</span></span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Button
                  key={item.href}
                  variant={isActive ? 'secondary' : 'ghost'}
                  size="sm"
                  asChild
                >
                  <Link to={item.href}>
                    <Icon className="h-4 w-4 mr-2" />
                    {item.name}
                  </Link>
                </Button>
              );
            })}
          </nav>

          <Button variant="outline" size="sm" asChild className="relative">
            <Link to="/cart">
              <ShoppingCart className="h-4 w-4 mr-2" />
              Carrinho
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
          </Button>
        </div>
      </header>

      <main className="flex-1">
        {children}
      </main>

      <footer className="border-t py-8 bg-muted/30">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            <div>
              <div className="flex items-center gap-2 font-semibold mb-3">
                <Leaf className="h-5 w-5 text-primary" />
                <span>CarbonCredits</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Marketplace de créditos de carbono certificados para um futuro mais sustentável.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Links Rápidos</h3>
              <ul className="space-y-2 text-sm">
                {navigation.map((item) => (
                  <li key={item.href}>
                    <Link to={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-3">Sobre</h3>
              <p className="text-sm text-muted-foreground">
                Documentação completa disponível no repositório backend (C4, Arc42, Canvas).
              </p>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} CarbonCredits. Todos os direitos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
};
