import { jest, describe, it, beforeEach, expect } from '@jest/globals'
import path from 'path'
import { calculateMetrics } from '../../src/index.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

describe('Instance Mapper Metric', () => {
  const codePath = path.resolve(__dirname, '../test-src/instance-mapper')
  let metricsResults

  beforeEach(async () => {
    jest.resetModules()
  })

  it('metricsResults is defined', async () => {
    metricsResults = await calculateMetrics({ codePath })
    expect(metricsResults).toBeDefined()

    const errors = metricsResults.errors
    // console.log(JSON.stringify(errors, null, 2))

    const instanceMapperResult = metricsResults['classes-per-file']

    expect(instanceMapperResult.currentFile).toBeUndefined()
    expect(instanceMapperResult.dependencies).toBeUndefined()
  })
})
