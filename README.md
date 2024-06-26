# zustand-with-selectors

Zustand recommends that manually apply render optimizations by using selectors, however, using selector by zustand is not quite smoothly when you want to use multiple state variables, .e.g,

```
const bears = useStore((state) => state.bears)
const increase = useStore((state) => state.increase)
```

or [Auto Generating Selectors](https://docs.pmnd.rs/zustand/guides/auto-generating-selectors)
```
const bears = useBearStore.use.bears()
const increment = useBearStore.use.increment()
```

`zustand-with-selectors` provides a way to easily use selectors. .e.g, `const {bears, increase} = bearStore()`, so that you can use `object spreads` for avoiding declaring multiple variables, but only with spreaded properties selected.

## Install

```bash
npm install --save zustand-with-selectors
```

Or with yarn:

```bash
yarn add zustand-with-selectors
```


# zustand-with-selectors usage

```
import { create } from 'zustand-with-selectors'

interface BearState {
  bears: number
  increase: (by: number) => void
}

const useBearStore = create<BearState>((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}))

function BearCounter() {
  const {bears, increase} = useStore()
  return (<div>
     <h1>{bears} around here...</h1>
     <button onClick={increase}>one up</button>
  <div>);
}
```

# zustand usage

```
import { create } from 'zustand'

interface BearState {
  bears: number
  increase: (by: number) => void
}

const useBearStore = create<BearState>()((set) => ({
  bears: 0,
  increase: (by) => set((state) => ({ bears: state.bears + by })),
}))


function BearCounter() {
  const bears = useStore((state) => state.bears)
  const increase = useStore((state) => state.increase)
  return (<div>
     <h1>{bears} around here...</h1>
     <button onClick={increase}>one up</button>
  <div>);
}
```