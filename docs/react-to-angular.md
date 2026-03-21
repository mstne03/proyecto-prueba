# React → Angular: Tabla de equivalencias

Referencia rápida para desarrolladores con experiencia en React que aprenden Angular (standalone, signals).

---

## Componentes

| React | Angular |
|-------|---------|
| `export default function App() {}` | clase con decorador `@Component` |
| `return (<div>...</div>)` JSX | `templateUrl: './app.component.html'` o `template: \`...\`` en el decorador |
| `import './app.css'` | `styleUrls: ['./app.component.scss']` en el decorador |
| `import X from '...'` en la parte superior | `imports: [X]` dentro de `@Component` |
| `<App />` en JSX | `<app-root>` como etiqueta HTML (definida en `selector: 'app-root'`) |

**React**
```tsx
import './app.css';
import Header from './Header';

export default function App() {
  return (
    <div>
      <Header />
      <p>Hola mundo</p>
    </div>
  );
}
```

**Angular**
```ts
import { Component } from '@angular/core';
import { HeaderComponent } from './header/header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [HeaderComponent],
})
export class AppComponent {}
```
```html
<!-- app.component.html -->
<app-header />
<p>Hola mundo</p>
```

---

## Routing

| React Router | Angular Router |
|-------------|----------------|
| `<Route path="x" element={<X />}>` | `{ path: 'x', component: X }` |
| `<Route index>` (hijo vacío) | `{ path: '' }` |
| `<Navigate to="/home" />` | `{ redirectTo: 'home', pathMatch: 'full' }` |
| `React.lazy(() => import('./Page'))` | `loadComponent: () => import('./page').then(m => m.PageComponent)` |
| `<Outlet />` en layout | `<router-outlet>` en el template del componente padre |

**React**
```tsx
// main.tsx
const routes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Navigate to="/home" /> },
      { path: 'home', element: React.lazy(() => import('./pages/Home')) },
    ],
  },
]);
```
```tsx
// Layout.tsx
export default function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
}
```

**Angular**
```ts
// app.routes.ts
export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', loadComponent: () => import('./home/home.page').then(m => m.HomePage) },
    ],
  },
];
```
```html
<!-- layout.component.html -->
<app-navbar />
<router-outlet />
```

---

## Estado y reactividad (Signals)

| React (hooks) | Angular (Signals) |
|---------------|-------------------|
| `useState(0)` | `signal(0)` |
| `setState(5)` | `miSignal.set(5)` |
| `setState(prev => prev + 1)` | `miSignal.update(prev => prev + 1)` |
| `useMemo(() => x, [dep])` | `computed(() => x())` — sin array de dependencias |
| `useEffect(() => {}, [dep])` | `effect(() => {})` — dependencias automáticas |
| Leer estado: `count` | Leer estado: `count()` — es una función en Signals |

**React**
```tsx
import { useState, useMemo, useEffect } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const double = useMemo(() => count * 2, [count]);

  useEffect(() => {
    console.log('count cambió:', count);
  }, [count]);

  return (
    <button onClick={() => setCount(prev => prev + 1)}>
      {count} (doble: {double})
    </button>
  );
}
```

**Angular**
```ts
import { Component, signal, computed, effect } from '@angular/core';

@Component({
  selector: 'app-counter',
  template: `
    <button (click)="increment()">
      {{ count() }} (doble: {{ double() }})
    </button>
  `,
})
export class CounterComponent {
  count = signal(0);
  double = computed(() => this.count() * 2);

  constructor() {
    effect(() => {
      console.log('count cambió:', this.count());
    });
  }

  increment() {
    this.count.update(prev => prev + 1);
  }
}
```

---

## Servicios e inyección de dependencias

| React | Angular |
|-------|---------|
| Context + hook / Zustand store | `@Injectable({ providedIn: 'root' })` service |
| `<Provider>` envolviendo la app | `providedIn: 'root'` (automático, sin wrapper en HTML) |
| `useContext()` / `useStore()` | `inject(MiServicio)` dentro del componente |

**React**
```tsx
// store/useCartStore.ts (Zustand)
export const useCartStore = create((set) => ({
  items: [],
  addItem: (item) => set(state => ({ items: [...state.items, item] })),
}));

// CartButton.tsx
function CartButton() {
  const { items, addItem } = useCartStore();
  return <button onClick={() => addItem({ id: 1 })}>({items.length})</button>;
}
```

**Angular**
```ts
// core/services/cart.service.ts
@Injectable({ providedIn: 'root' })
export class CartService {
  items = signal<Item[]>([]);

  addItem(item: Item) {
    this.items.update(prev => [...prev, item]);
  }
}

// cart-button.component.ts
@Component({ selector: 'app-cart-button', template: `<button>({{ cart.items().length }})</button>` })
export class CartButtonComponent {
  cart = inject(CartService);
}
```

---

## Guards (rutas protegidas)

| React | Angular |
|-------|---------|
| `<PrivateRoute>` wrapper / Next.js `middleware.ts` | `canActivate` guard en la definición de la ruta |

**React**
```tsx
function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuthStore();
  return isLoggedIn ? children : <Navigate to="/login" />;
}

// En el router:
{ path: 'dashboard', element: <PrivateRoute><Dashboard /></PrivateRoute> }
```

**Angular**
```ts
// core/guards/auth.guard.ts
export const authGuard: CanActivateFn = () => {
  const auth = inject(AuthService);
  return auth.isLoggedIn() ? true : inject(Router).createUrlTree(['/login']);
};

// En las rutas:
{ path: 'dashboard', component: DashboardPage, canActivate: [authGuard] }
```

---

## Arquitectura de carpetas

| React (convención común) | Angular (este proyecto) |
|--------------------------|-------------------------|
| `components/` global | `shared/components/` |
| `features/` o `pages/` con componentes locales | `features/<nombre>/components/` |
| Lógica global / estado compartido | `core/services/` |

```
React                          Angular (este proyecto)
──────────────────────         ──────────────────────────────
src/
├── components/                src/app/
│   └── Button.tsx             ├── shared/
├── pages/                     │   └── components/
│   └── Home.tsx               │       └── button/
├── features/                  ├── features/
│   └── market/                │   └── market/
│       ├── MarketPage.tsx     │       ├── market.page.ts
│       └── components/        │       └── components/
└── store/                     └── core/
    └── useCartStore.ts            └── services/
                                       └── cart.service.ts
```
