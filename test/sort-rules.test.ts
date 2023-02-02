import { createGenerator } from '@unocss/core'
import presetUno from '@unocss/preset-uno'
import { describe, expect, test } from 'vitest'
import { sortRules } from '../packages/shared-integration/src/sort-rules'

describe('sort rules', () => {
  const uno = createGenerator({
    presets: [
      presetUno(),
    ],
  })

  async function sort(tokens: string) {
    return await sortRules(tokens, uno)
  }

  test('basic', async () => {
    expect(await sort('pt-2 p-4 foo'))
      .toMatchInlineSnapshot('"foo p-4 pt-2"')
    expect(await sort('hover:focus:p1 hover:mt1 hover:m2 pt-2 p-4'))
      .toMatchInlineSnapshot('"p-4 pt-2 hover:m2 hover:mt1 hover:focus:p1"')
    expect(await sort('hover:opacity-75 opacity-50 hover:scale-150 scale-125'))
      .toMatchInlineSnapshot('"scale-125 opacity-50 hover:scale-150 hover:opacity-75"')
    expect(await sort('lg:grid-cols-4 grid sm:grid-cols-3 grid-cols-2'))
      .toMatchInlineSnapshot('"grid grid-cols-2 lg:grid-cols-4 sm:grid-cols-3"')
  })

  test('variant group', async () => {
    expect(await sort('hover:pt-2 hover:p-4 foo'))
      .toMatchInlineSnapshot('"foo hover:p-4 hover:pt-2"')
    expect(await sort('hover:(pt-2 p-4) hover:text-red hover:focus:(m1 mx2) foo'))
      .toMatchInlineSnapshot('"foo hover:(p-4 pt-2 text-red) hover:focus:(m1 mx2)"')
  })
})