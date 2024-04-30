# Edifice Bootstrap

Edifice Bootstrap is a CSS framework containing all the UI components used by our applications. This framework is based on the latest version of Bootstrap.

## Install

Install it by cloning the repository:

```
git clone https://github.com/opendigitaleducation/edifice-bootstrap.git
pnpm install
```

## Build

```
pnpm build
```

## Dev

### Watch + Storybook

Watch styles to `edifice-ui` when developing on Storybook.

```
pnpm watch:react
```

### Watch + SB

Watch styles to `ode-dev-server` when local develop.

```
pnpm watch:sb
```

## Bootstrap 5.x

If a component already exists in Bootstrap 5.x, we use it and override it if necessary. The same goes for utility classes.

## Components

Based on Bootstrap 5.3, many components use CSS Variables (CSS Custom Properties). We adhere to this guideline to create our own components or to override Bootstrap components.

```scss
// _form-control.scss

.form-control {
  --#{$prefix}input-padding-y: #{$input-padding-y};
  --#{$prefix}input-padding-x: #{$input-padding-x};
  --#{$prefix}input-padding-y-lg: #{$input-padding-y-lg};
  --#{$prefix}input-padding-x-lg: #{$input-padding-x-lg};
  --#{$prefix}input-font-size-lg: #{$input-font-size-lg};
  --#{$prefix}input-padding-y-sm: #{$input-padding-y-sm};
  --#{$prefix}input-padding-x-sm: #{$input-padding-x-sm};
  --#{$prefix}input-font-size-sm: #{$input-font-size-sm};
  --#{$prefix}input-border-color: #{$input-border-color};
  --#{$prefix}input-disabled-bg: #{$input-disabled-bg};
  --#{$prefix}input-disabled-color: #{$input-disabled-color};
  --#{$prefix}input-disabled-border-color: #{$input-disabled-border-color};
  --#{$prefix}input-placeholder-color: #{$input-placeholder-color};
  --#{$prefix}input-focus-border-color: #{$input-focus-border-color};
  --#{$prefix}input-filled-border-color: #{$input-filled-border-color};
  --#{$prefix}input-border-radius: #{$input-border-radius-lg};
  --#{$prefix}input-border-radius-sm: #{$input-border-radius};
  --#{$prefix}input-border-radius-lg: #{$input-border-radius-lg};
  padding: var(--#{$prefix}input-padding-y) var(--#{$prefix}input-padding-x);
  border-color: var(--#{$prefix}input-border-color);
  font-size: var(--#{$prefix}input-font-size-lg);
  min-height: inherit;

...
}
```

Overring style should be done in component file with data-attribute selector `[data-product="one"]` or `[data-product="neo"]`.

```scss
.form-control {
  --#{$prefix}input-focus-border-color: var(--#{$prefix}color);
}
```

### Push Force

`git push --force` is not recommended!!

```
After a git history rewrite due to a git push --force, the git tags and notes referencing the commits that were rewritten are lost.
```

If it happens, read this troubleshooting section: [Troubleshooting](https://semantic-release.gitbook.io/semantic-release/support/troubleshooting#release-not-found-release-branch-after-git-push-force)
