# Edifice Icon Library

![npm](https://img.shields.io/npm/v/@edifice.io/icons?style=flat-square)
![bundlephobia](https://img.shields.io/bundlephobia/min/@edifice.io/icons?style=flat-square)

SVG Icons Library to be used in any framework

## Getting Started

### Install

```bash
pnpm add @edifice.io/icons
```

### Usage

#### Entry file

In your entry file (index.html), add the spritesheet `icons.svg` through CDN or direct url

```
<link
  rel="preload"
  href="https://cdn.jsdelivr.net/npm/@edifice.io/icons@1.5.16-develop-rc.4/dist/icons.svg"
  as="image"
  type="image/svg+xml"
/>
```

#### React

Use the `Icon` component and add the props `name`. You will have the list of all available icons

```
import { Icon } from '@edifice.io/react';

<Icon name="<name>" />;
```

#### Angularjs

- First step, add in the entry file (can be different than index.html)

```
<link
  rel="preload"
  href="PATH/dist/icons.svg"
  as="image"
  type="image/svg+xml"
/>
```

- Use directly `svg` tag to display an icon

```
<svg width="24" height="24">
 <use href={`${PATH}#smartphone`} />
</svg>
```

## New icon

To add a new icon, please do as follow :

- Check that the icon:
  - is correctly formatted with `width="24" height="24" viewBox="0 0 24 24"`
  - its paths have `fill` field set to `currentColor` (e.g: `fill="currentColor"`)
- Check if the icon must be placed in any of the existing category of the `assets` folder (e.g: audience, apps)
- Add the icon in `assets` folder
- Build the project `nx build icons` or `pnpm run build:icons` at root level
- Commit and push your changes
