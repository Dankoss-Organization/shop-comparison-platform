# shop-comparison-platform
AI-powered price comparison and deal aggregator. Compare discounts across multiple stores, build optimized shopping baskets, and save money with AI-driven insights. Built with Next.js (SSR/CSR) for high performance and SEO. Your smart assistant for finding the best local deals and managing your shopping list. 

## Tech Stack
* **Framework:** [Next.js 15](https://nextjs.org/)

`npm install next`
* **Core Library:** [React 19](https://react.dev/)

`npm install react react-dom`
* **Styling:** [Tailwind CSS](https://tailwindcss.com/) with `clsx` and `tailwind-merge`

`npm install -D tailwindcss postcss autoprefixer`

`npm install clsx tailwind-merge`
* **Animations:** [Framer Motion](https://www.framer.com/motion/)

`npm install framer-motion`
* **State Management:** [Zustand](https://github.com/pmndrs/zustand)

`npm install zustand`
* **Testing:** [Vitest](https://vitest.dev/) & [React Testing Library](https://testing-library.com/)

`npm install -D vitest @vitest/ui @testing-library/react @testing-library/jest-dom @testing-library/user-event jsdom`
* **Documentation:** [TypeDoc](https://typedoc.org/)

`npm install -D typedoc`

## How to Build and Run
Follow these instructions to set up, run, and test the project locally.

1. Install Dependencies
Ensure you are in the root directory of the project and install all required packages:

`npm install`

2. Run the Development Server
Start the Next.js development server:

`npm run dev`
Open http://localhost:3000 with your browser to see the application.

3. Build for Production
To create an optimized production build and start the server:

`npm run build`

`npm run start`

4. Running Tests
This project uses Vitest for robust unit testing. You can run the test suite using the following command:

`npm run test`

## Documentation
Our core component architecture, interfaces, and state managers are documented using TypeDoc. The documentation is automatically built and deployed via GitHub Actions upon every push. You can view the latest interactive version online:

[View Documentation](https://dankoss-organization.github.io/shop-comparison-platform/)

### Or generate Locally
If you want to build the documentation locally to preview changes:

`npm run docs`

After that, open docs/index.html in your browser to view the documentation tree.

# Architecture & Design Patterns Documentation

## 1. Architectural Overview
Dankoss follows a **Modular Component-Based Architecture** with a strict separation of concerns between the Presentation Layer (React/Next.js) and the Business Logic/State Layer (Zustand/Context).

* **Presentation Layer:** Utilizes atomic and compound components for a highly reusable and declarative UI.
* **State Layer:** Employs persistent global stores with Finite State Machine (FSM) logic for predictable data flow.
* **Utility Layer:** Pure functional algorithms isolated from the UI for data normalization and parsing.

---

## 2. Design Patterns Registry (GoF)
*In modern frontend frameworks like React, classic Gang of Four (GoF) patterns are often implemented using functional programming paradigms or React-specific APIs (Hooks, Context). Below is the mapping of our implementation to classic GoF patterns.*

### 2.1 Creational Patterns

**1. Singleton Pattern**
* **Location in Code:** `src/store/use_cart_store.ts` and `use_favourites_store.ts`
* **Rationale & Problem Solved:** The application requires a single, globally accessible instance of the shopping cart and user favorites to prevent data inconsistency. By utilizing Zustand, we enforce the Singleton pattern: there is only one store instance in memory, and any component importing the hook accesses the exact same state and methods.

**2. Builder Pattern**
* **Location in Code:** `src/Components/ui/ProductModal.tsx` (implemented via Compound Components)
* **Rationale & Problem Solved:** Creating a complex modal with numerous optional configurations (images, reviews, actions) via standard props leads to a "God Object" anti-pattern. We implemented a React-adapted Builder pattern where the client (e.g., `ProductCarousel.tsx`) constructs the modal step-by-step (`<Modal.Window>`, `<Modal.Header>`, `<Modal.Actions>`), passing only the necessary "parts" to build the final component tree.

**3. Factory Method Pattern**
* **Location in Code:** `src/Components/ui/DealCard.tsx`
* **Rationale & Problem Solved:** Our UI requires rendering product cards in multiple visual variants (e.g., standard, compact) depending on the context. Instead of forcing consumer components to handle complex conditional rendering, the `DealCardFactory` centralizes the object creation process. It dynamically determines the correct sizing, layout configurations, and CSS classes based on the `variant` or `compact` props, instantiating the appropriate card structure and hiding this complexity from the consumer.

### 2.2 Structural Patterns

**4. Composite Pattern**
* **Location in Code:** `src/Components/ui/ProductModal.tsx`
* **Rationale & Problem Solved:** We treat individual UI segments (the image gallery, the accordion details, the action buttons) as primitive objects, and the Modal itself as a composite. This allows the parent component to treat the entire complex modal structure uniformly, rendering it as a single coherent entity without worrying about the internal DOM nesting.

**5. Facade Pattern**
* **Location in Code:** Custom Store Hooks (e.g., `useCartStore`)
* **Rationale & Problem Solved:** Components need to add items to the cart, but they shouldn't know the complex internal logic (e.g., parsing strings to numbers, multiplying prices, serializing data for `localStorage`, dispatching events). The store provides a clean Facade interface (`addItem(product)`, `removeItem(id)`), hiding the complex subsystem logic from the Presentation layer.

**6. Decorator Pattern (Wrapper)**
* **Location in Code:** Layout Wrappers and the `cn()` utility (`src/lib/utils.ts`)
* **Rationale & Problem Solved:** The Decorator pattern attaches additional responsibilities to an object dynamically. We use Higher-Order Wrappers (like Context Providers for the Catalog) and the `cn()` utility (which wraps `clsx` and `tailwind-merge`) to dynamically decorate components with conditional CSS classes and state without modifying their underlying React implementation.

### 2.3 Behavioral Patterns

**7. State Pattern (Finite State Machine)**
* **Location in Code:** `src/Components/cart/CheckoutButton.tsx`
* **Rationale & Problem Solved:** The checkout button must behave differently depending on its current state to prevent bugs like double-charging. We implemented an FSM with distinct states: `IDLE`, `LOADING`, and `SUCCESS`. The component encapsulates state-specific behavior (e.g., disabling clicks during `LOADING`, changing text to "DONE" during `SUCCESS`), avoiding messy nested `if/else` statements.

**8. Observer Pattern**
* **Location in Code:** Global State Subscriptions (Zustand) and `CatalogContext`.
* **Rationale & Problem Solved:** We needed a way for distant components (e.g., the Header Cart Widget and the Main Cart Drawer) to sync instantly without prop-drilling. The Observer pattern solves this: the centralized Store acts as the Subject, and any UI component using the hook acts as an Observer. When the Subject's state changes, it automatically notifies and re-renders all subscribed Observers.

---

## 3. SOLID Principles Analysis

* **Single Responsibility Principle (SRP):** Components are strictly scoped. For instance, `CartItemUI` is only responsible for rendering a single row, while `useCartStore` is solely responsible for state mathematics.
* **Dependency Inversion Principle (DIP):** High-level UI components do not depend on low-level storage APIs (like the Browser's `localStorage`). Instead, both depend on abstractions provided by Zustand's persist middleware.
