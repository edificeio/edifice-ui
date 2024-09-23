# Edifice React Library

![npm](https://img.shields.io/npm/v/@edifice.io/react?style=flat-square)
![bundlephobia](https://img.shields.io/bundlephobia/min/@edifice.io/react?style=flat-square)

## Getting Started

We follow [WAI ARIA](https://www.w3.org/WAI/ARIA/apg/patterns/) rules and [Bootstrap 5](https://getbootstrap.com/docs/5.0/components/accordion/) guidelines when making our components

### Install

```
pnpm add @edifice.io/react
```

### Modules

Optional modules are available as `sub-imports`. You can use them in specific applications:

#### Audience

Module to track views or reactions on a resource in a specific application (e.g: Blog)

#### Editor

Rich Text Editor using Tiptap and our `multimedia` module.

#### Modals

- Onboarding Modal to greet user and give him some useful informations about an application.
- Publish Modal to publish a resource to the BPR application.
- Resource Modal can be used to create or edit information about a resource
- Share Modal allows a user to share one of his resource with specific roles to users

#### Multimedia

All our multimedia components to use in applications or in modules.

- Linker, AudioRecorder, VideoRecorder, Iframe, Embed component, ...
