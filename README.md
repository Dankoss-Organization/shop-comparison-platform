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
