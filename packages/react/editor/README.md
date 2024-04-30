# Edifice Editor

![npm](https://img.shields.io/npm/v/@edifice-ui/editor?style=flat-square)
![bundlephobia](https://img.shields.io/bundlephobia/min/@edifice-ui/editor?style=flat-square)

## Getting Started

### Build

```bash
pnpm run build
```

### Lint

```bash
pnpm run lint
```

If `pnpm run lint` shows issues, run this command to fix them.

```bash
pnpm run fix
```

### Prettier

```bash
pnpm run format
```

## Component Guideline

- Always document basic guideline of Component with JSDoc format. Used by Storybook to generate documentation.

```jsx
/**
 * Primary UI component for user interaction
 */
```

## Interface description

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

## Index file inside `src` folder

- Entry point of this Editor Library.
- Import your component inside `index.ts` file.

```jsx
export * from "./Button";
```

## Dev

You can build your component using `Storybook`. See [README](../../docs//README.md)
