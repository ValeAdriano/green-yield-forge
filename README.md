# CarbonCredits - Marketplace de Créditos de Carbono

Microfrontend moderno e acessível para marketplace de créditos de carbono certificados.

## 🌿 Sobre o Projeto

CarbonCredits é uma plataforma que conecta empresas a projetos ambientais certificados, facilitando a compensação de emissões de carbono de forma transparente e eficiente.

## 🚀 Tecnologias

- **React 18** + **TypeScript** - Interface moderna e type-safe
- **Vite** - Build tool ultrarrápido
- **React Router** - Navegação SPA
- **Axios** - Cliente HTTP com interceptors
- **Zustand** - State management simples e eficiente
- **Zod** - Validação de schemas
- **Tailwind CSS** - Estilização utility-first
- **shadcn/ui** - Componentes acessíveis e customizáveis
- **Vitest + Testing Library** - Testes unitários e de componentes

## 📋 Pré-requisitos

- Node.js >= 18
- npm ou yarn

## ⚙️ Configuração

1. Clone o repositório
2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env
```

Edite o arquivo `.env` e configure:
```
VITE_API_BASE_URL=http://localhost:8000/api/v1
```

## 🏃 Rodando o Projeto

### Desenvolvimento
```bash
npm run dev
```
Acesse: http://localhost:8080

### Build de Produção
```bash
npm run build
```

### Preview da Build
```bash
npm run preview
```

### Testes
```bash
npm run test
```

## 🎨 Paleta de Cores

- **Verde Escuro (Primary)**: `#0F5132` - HSL(150, 70%, 19%)
- **Cinza (Secondary)**: `#6B7280` - HSL(220, 9%, 46%)
- **Preto (Background)**: `#0B0B0C` - HSL(240, 7%, 4%)
- **Branco (Foreground)**: `#FFFFFF` - HSL(0, 0%, 100%)

## 📱 Funcionalidades

### ✅ Principais Features

- **Exploração de Projetos**: Listagem com filtros avançados (localização, certificadora, preço, status)
- **Detalhes do Projeto**: Visualização completa com lotes disponíveis e histórico de pedidos
- **Carrinho Inteligente**: Sistema de reserva com timer de 15 minutos por item
- **Checkout**: Processo simplificado com validação robusta
- **Gestão de Pedidos**: Acompanhamento de status e histórico
- **Favoritos**: Salvar projetos favoritos (localStorage)
- **Comparação de Lotes**: Comparar até 4 lotes lado a lado
- **Ingestão por Evento**: Criação assíncrona via Edge Functions

### 🎯 Diferenciais

- **Dark Mode por padrão** - Interface otimizada para baixo cansaço visual
- **Acessibilidade WCAG 2.1 AA** - Navegação por teclado, ARIA, contraste adequado
- **Responsivo Mobile-First** - Funciona perfeitamente em todos os dispositivos
- **Timer de Reserva** - Evita conflitos em compras simultâneas
- **Validação em Tempo Real** - Feedback imediato com Zod schemas
- **Idempotency Keys** - Headers automáticos para segurança em requisições

## 🗂️ Estrutura do Projeto

```
src/
├── app/                    # Configuração de rotas
├── components/             # Componentes reutilizáveis
│   ├── ui/                # shadcn/ui components
│   ├── AppShell.tsx       # Layout principal
│   ├── DataTable.tsx      # Tabela com paginação
│   ├── Loading.tsx        # Estado de carregamento
│   ├── ErrorState.tsx     # Estado de erro
│   └── EmptyState.tsx     # Estado vazio
├── features/              # Features organizadas por domínio
│   ├── projects/
│   │   ├── components/   # ProjectCard, Filters, Compare...
│   │   ├── pages/        # List e Detail pages
│   │   └── services/     # API calls
│   ├── orders/
│   │   ├── components/   # OrderCard, CheckoutSummary
│   │   ├── pages/        # Orders, Checkout
│   │   └── services/
│   └── events/
│       └── services/
├── lib/                   # Utilitários
│   ├── api.ts            # Cliente Axios configurado
│   ├── validators.ts     # Schemas Zod
│   └── format.ts         # Formatação de moeda/data/tons
├── pages/                # Páginas standalone
│   ├── HomePage.tsx
│   ├── CartPage.tsx
│   └── IngestPage.tsx
├── store/                # Zustand stores
│   ├── cart.store.ts     # Carrinho com timer
│   ├── favorites.store.ts
│   └── ui.store.ts       # Compare drawer state
└── types/                # TypeScript types
```

## 🔌 Integração com BFF

O frontend consome as seguintes rotas do BFF:

### Projetos
- `GET /projects` - Lista todos os projetos
- `GET /projects/:id` - Detalhes de um projeto
- `GET /aggregate/project/:id` - Projeto com lotes e pedidos
- `POST /projects` - Criar novo projeto
- `PUT /projects/:id` - Atualizar projeto
- `DELETE /projects/:id` - Remover projeto

### Lotes
- `GET /batches` - Lista todos os lotes
- `GET /batches/:id` - Detalhes de um lote
- `POST /batches` - Criar novo lote
- `PUT /batches/:id` - Atualizar lote
- `DELETE /batches/:id` - Remover lote

### Pedidos
- `GET /orders` - Lista todos os pedidos
- `GET /orders/:id` - Detalhes de um pedido
- `POST /orders` - Criar novo pedido
- `PUT /orders/:id` - Atualizar pedido (cancelar)

### Eventos
- `POST /events/ingest` - Ingestão assíncrona de projeto+lote
- `POST /events/receipt` - Simular pagamento de pedido

## 🧪 Testes

Exemplos de testes implementados:

```bash
# Rodar todos os testes
npm run test

# Com coverage
npm run test:coverage

# Watch mode
npm run test:watch
```

Casos de teste incluem:
- Renderização de páginas principais
- Store de carrinho (adicionar, remover, expirar itens)
- Validação de formulários
- Componentes de UI

## 📚 Documentação Adicional

Para documentação completa da arquitetura (C4, Arc42, Canvas), consulte o repositório do backend.

## 🎨 Screenshots

### Home
Hero section com CTAs para explorar projetos e cadastrar lotes.

### Projetos
Grid responsivo com cards de projetos, filtros avançados e ação de comparar lotes.

### Detalhe do Projeto
Informações completas, lotes disponíveis com CTA de adicionar ao carrinho, histórico de pedidos.

### Carrinho
Itens com timer de reserva visível, totais e checkout.

### Checkout
Formulário simples com resumo do pedido.

### Pedidos
Cards de pedidos com status badges e ação de cancelamento.

## 🤝 Contribuindo

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT.

## 📞 Contato

Para mais informações sobre a arquitetura e documentação técnica, consulte o repositório do backend.

---

Desenvolvido com 💚 e ♻️ para um futuro mais sustentável
