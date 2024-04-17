# Edifice React Components

![npm](https://img.shields.io/npm/v/@edifice-ui/react?style=flat-square)
![bundlephobia](https://img.shields.io/bundlephobia/min/@edifice-ui/react?style=flat-square)

## Getting Started

We follow [WAI ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/) rules and [Bootstrap 5](https://getbootstrap.com/docs/5.0/components/accordion/) guidelines when making our components

### Build

```bash
pnpm nx build
```

### Lint

```bash
pnpm nx lint
```

If `pnpm run lint` shows issues, run this command to fix them.

```bash
pnpm nx lint --fix
```

## Generate a new component

```
nx g @nx/react:component packages/<packageName>/src/<folder>/<componentFolder>/<componentName> --nameAndDirectoryFormat=as-provided
```

Say yes when “Should this component be exported into the project?” » is asked.

### Component Folder

- A component file in kebab-case
- A spec file to test component
- A story file for Storybook documentation

```
src
  -- component (folder)
    -- component.tsx
    -- component.stories.tsx
    -- component.spec.tsx
    -- index.ts
```

### Component Guideline

- Always document basic guideline of Component with JSDoc format. Used by Storybook to generate documentation.

```jsx
/**
 * Primary UI component for user interaction
 */
```

### Interface description

- Always document typescript types and interface with JSDoc syntax. Used by Storybook to generate documentation.

```jsx
// Interface description (e.g: TreeViewProps.tsx)
export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * What background color to use
   */
  backgroundColor?: string;
  /**
   * How large should the button be?
   */
  size?: "small" | "medium" | "large";
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
}
```

### Index file inside `src` folder

- Entry point of this React Library.
- Import your component inside `index.ts` file.

```jsx
export * from "./Button";
```

## Generate a new custom hook

```
nx g @nx/react:hook my-hook --project=<project-name> --directory=lib/<folder> --nameAndDirectoryFormat=derived
```

## Generate a new storybook file

You can develop your component using `Storybook`. See [README](../../docs//README.md)

```
nx g @nx/react:component-story --project=<project-name> --componentPath=lib/<folder>/<component-folder>/<component-name>.tsx
```
