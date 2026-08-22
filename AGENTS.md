# Frontend Guidelines

## Architecture

- This is a TanStack Router frontend and must remain a client-side SPA.
- Use TanStack Router for all routes, links, navigation, route params, and search params.
- Do not introduce SSR, server components, server routes, or framework-specific routing.
- Treat `src/routeTree.gen.ts` as generated output; update route source files and run the route generator instead of editing it manually.

## UI and Styling

- ALWAYS use existing shadcn components.
- Do not tweak shadcn component styles unless explicitly told to.
- Do not add custom classes to imported shadcn components unless explicitly told to.
- Always use Tailwind utility classes for styling. Do not add CSS modules, component-specific stylesheets, or inline style objects.
- Always use existing semantic color tokens such as `bg-background`, `text-foreground`, `bg-primary`, `text-muted-foreground`, `border-border`, and `ring-ring` instead of hardcoded colors or arbitrary color values.
- New CSS variables may be introduced when a needed semantic token does not exist. Define the token for each supported theme in `src/styles.css` and expose it through the Tailwind theme before using it.
- Always use shadcn/ui components for interface primitives. Reuse components from `src/components/ui` and compose them before creating custom replacements.
- If a required shadcn component is missing, install or add it with the shadcn CLI and follow the existing `components.json` configuration.
- Keep styling minimal and functional unless the task explicitly asks for visual polish, custom branding, or a more elaborate design.

## Implementation

- Prefer small, focused changes that follow the existing project patterns.
- Use the existing `cn` utility for conditional Tailwind classes.
- Use Lucide icons through the existing shadcn setup instead of introducing another icon library.
- Preserve responsive behavior on desktop and mobile without adding unnecessary layout complexity.
