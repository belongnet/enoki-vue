# @belongnet/enoki-vue

[![Version](https://img.shields.io/npm/v/@belongnet/enoki-vue)](https://www.npmjs.com/@belongnet/enoki-vue)
[![Downloads](https://img.shields.io/npm/dt/@belongnet/enoki-vue)](https://www.npmjs.com/@belongnet/enoki-vue)
[![install size](https://packagephobia.com/badge?p=@belongnet/enoki-vue)](https://packagephobia.com/result?p=@belongnet/enoki-vue)
![npm bundle size](https://img.shields.io/bundlephobia/min/@belongnet/enoki-vue)

[publint](https://publint.dev/@belongnet/enoki-vue) |
[arethetypeswrong](https://arethetypeswrong.github.io/?p=@belongnet/enoki-vue)

[Enoki](https://docs.enoki.mystenlabs.com/) (zkLogin Sui) use hooks Vue 3, based and on [Enoki TypeScript SDK](https://docs.enoki.mystenlabs.com/ts-sdk) and inspired React integration.

## Installation

Install dependencies:

```bash
pnpm add @belongnet/enoki-vue @mysten/enoki
```

Get your API key from [Enoki Portal](https://portal.enoki.mystenlabs.com/) and setup your Enoki config:

```ts
import { useEnokiFlow } from '@belongnet/enoki-vue'

// setup enoki config first
const enokiFlow = useEnokiFlow({
  apiKey: 'your-api',
})
```

Enjoy!

## Advanced Usage

```ts
import {
  useZkLogin,
  useZkLoginSession,
  useAuthCallback,
} from '@belongnet/enoki-vue'
```

## Related

- https://github.com/MystenLabs/sui/tree/main/sdk/enoki

## License

This project is licensed under the terms of the [MIT license](LICENSE).
