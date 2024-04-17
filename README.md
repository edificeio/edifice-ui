# Edifice Frontend

Monorepo with frontend librairies

## Prerequisites

- `pnpm: >= 8`
- `node: >= 18 | 20`
- `nx`: install globally or use with `pnpm`

## Getting Started

`pnpm install`

### Storybook

`pnpm nx run docs:storybook`

### Build

All libs:

`pnpm nx run-many -t build --exclude docs`

One lib:

`pnpm nx build <project>`

### Test

All libs:

`pnpm nx run-many -t test --exclude docs`

One lib:

`pnpm nx test <project>`

### Lint

All libs:

`pnpm nx run-many -t lint --exclude docs`

One lib:

`pnpm nx lint <project>`

### Lint Fix

All libs:

`pnpm nx run-many -t lint  --exclude docs --fix`

One lib:

`pnpm nx lint <project> --fix`

### Prettier

`pnpm nx format`
