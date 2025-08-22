import path from 'path'
import { calculateMetrics } from '../../src/index.js'
import { fileURLToPath } from 'url'
import { describe, expect, it } from '@jest/globals'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

describe('Functions Coupling Metric', function () {
  const codePath = path.resolve(__dirname, '../test-src/files/')

  it('metricsResults is defined', async () => {
    const metricsResults = await calculateMetrics({ codePath })
    expect(metricsResults).toBeDefined()
  })

  it('Metric is defined, has correct name, description and status and contains result', async () => {
    const metricsResults = await calculateMetrics({ codePath })

    expect(metricsResults).toHaveProperty('files')
    expect(metricsResults['files']).toHaveProperty('name', 'Files on Repository')
    expect(metricsResults['files'].description).toBeDefined()
    expect(metricsResults['files'].description).toContain('Collects and records all source files in the repository by their path.')
    expect(metricsResults['files'].result).toBeDefined()
    expect(metricsResults['files'].status).toBeTruthy()
  })

  it('Metric result contains src testing files', async () => {
    const metricsResults = await calculateMetrics({ codePath })

    const result = metricsResults.files.result

    expect(result.length).toBe(4)
  })

  it('Metric result contains src testing files', async () => {
    const metricsResults = await calculateMetrics({ codePath })

    const result = metricsResults.files.result

    const relativePaths = result.map(file =>
        '/' + path.relative(
          path.resolve(__dirname, '../test-src/'),
          file
        )
    )

    const expectedPaths = [
      '/files/TS/fileA.ts',
      '/files/TS/subdir/fileB.ts',
      '/files/JS/fileA.js',
      '/files/JS/subdir/fileB.js'
    ]

    expect(relativePaths.sort()).toEqual(expectedPaths.sort())
  })
})
