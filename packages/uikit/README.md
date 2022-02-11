# LoopStarter UIkit

[![Version](https://img.shields.io/npm/v/@loopstarter/uikit)](https://www.npmjs.com/package/@loopstarter/uikit) [![Size](https://img.shields.io/bundlephobia/min/@loopstarter/uikit)](https://www.npmjs.com/package/@loopstarter/uikit)

LoopStarter UIkit is a set of React components and hooks used to build pages on LoopStarter's apps. It also contains a theme file for dark and light mode.

## Install

`yarn add @loopstarter/uikit`

***Note**: In case you want to use the older version of the LoopStarter UIkit, you should install @loopstarter-libs/uikit, instead, but we recommend using the latest version of the UIkit.*


## Setup

### Theme

Before using LoopStarter UIkit, you need to provide the theme file to styled-component.

```
import { ThemeProvider } from 'styled-components'
import { light, dark } from '@loopstarter/uikit'
...
<ThemeProvider theme={isDark}>...</ThemeProvider>
```

### Reset

A reset CSS is available as a global styled component.

```
import { ResetCSS } from '@loopstarter/uikit'
...
<ResetCSS />
```

### Types

This project is built with Typescript and export all the relevant types.

