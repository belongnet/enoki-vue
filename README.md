# @belongnet/enoki-vue

[![Version](https://img.shields.io/npm/v/@belongnet/enoki-vue)](https://www.npmjs.com/@belongnet/enoki-vue)
[![Downloads](https://img.shields.io/npm/dt/@belongnet/enoki-vue)](https://www.npmjs.com/@belongnet/enoki-vue)
[![install size](https://packagephobia.com/badge?p=@belongnet/enoki-vue)](https://packagephobia.com/result?p=@belongnet/enoki-vue)
![npm bundle size](https://img.shields.io/bundlephobia/min/@belongnet/enoki-vue)

[publint](https://publint.dev/@belongnet/enoki-vue) |
[arethetypeswrong](https://arethetypeswrong.github.io/?p=@belongnet/enoki-vue)

[Enoki](https://docs.enoki.mystenlabs.com/) (zkLogin Sui) use hooks Vue 3, based and on [Enoki TypeScript SDK](https://docs.enoki.mystenlabs.com/ts-sdk) and inspired React integration.

## Installation

1. Install dependencies:

```bash
pnpm add @belongnet/enoki-vue @mysten/enoki
```

2. Get your API key from [Enoki Portal](https://portal.enoki.mystenlabs.com/) and write direct to config or set env `VITE_ENOKI_API_KEY`.

3. Integrate plugin with your Vue App:

```ts
// src/main.ts
import { useEnokiFlow } from '@belongnet/enoki-vue'

app.use(EnokiPlugin, {
  config: {
    apiKey: import.meta.env.VITE_ENOKI_API_KEY,
  },
})
```

4. Hooks are ready to use in your components or composables:

```ts
import { useEnokiFlow } from '@belongnet/enoki-vue'
const enokiFlow = useEnokiFlow()

// https://docs.enoki.mystenlabs.com/ts-sdk/examples
function handleSignIn() {
  enokiFlow
    .createAuthorizationURL({
      // ...
    })
    .then((url) => {
      window.location.href = url
    })
}
```

See [official documentation](https://docs.enoki.mystenlabs.com) for more details, for complex example see [playground](./playground) folder.

Enjoy!

## Advanced Usage

```ts
import {
  useZkLogin,
  useZkLoginSession,
  useAuthCallback,
  useEnokiFlow,
} from '@belongnet/enoki-vue'
```

## Related

- https://github.com/MystenLabs/sui/tree/main/sdk/enoki

## License

This project is licensed under the terms of the [MIT license](LICENSE).
