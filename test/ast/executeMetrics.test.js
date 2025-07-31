import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals'
import { executeMetrics } from '../../src/ast/executeMetrics.js'
import { logger } from '../../src/logger/logger.js'
import { state } from '../../src/metrics/files.metric.js'

describe('executeMetrics.js', () => {
  let logMetricErrorSpy
  let getFileErrorsSpy, getParseErrorsSpy, getMetricErrorsSpy, getTraverseErrorsSpy
  const registerFileMetric = {
    state: { id: 'register-file', result: {} },
    visitors: {
      Program (path, state) {
        state.result[path.node.filePath] = {}
      }
    }
  }

  const ast = {
    type: 'File',
    errors: [],
    program: {
      type: 'Program',
      sourceType: 'script',
      interpreter: null,
      body: [],
      filePath: '/metrics-js-ts/test/ast/temp_valid.js'
    },
    comments: []
  }

  describe('executeMetrics', () => {
    beforeAll(() => {
      // Spy on logger functions
      logMetricErrorSpy = jest.spyOn(logger, 'logMetricError').mockImplementation(() => {})
      getFileErrorsSpy = jest.spyOn(logger, 'getFileErrors').mockReturnValue(['fileErr1'])
      getParseErrorsSpy = jest.spyOn(logger, 'getParseErrors').mockReturnValue(['parseErr1'])
      getMetricErrorsSpy = jest.spyOn(logger, 'getMetricErrors').mockReturnValue(['metricErr1'])
      getTraverseErrorsSpy = jest.spyOn(logger, 'getTraverseErrors').mockReturnValue(['traverseErr1'])
    })

    afterAll(() => {
      jest.restoreAllMocks()
    })

    it('should process metrics without dependencies and return state results', async () => {

      const result = await executeMetrics([registerFileMetric], [ast])

      expect(result).toHaveProperty('register-file')
      expect(result['register-file'].result).toEqual({ '/metrics-js-ts/test/ast/temp_valid.js': {} })
      expect(result['register-file'].dependencies).toEqual({})
    })

  })




  // it('should logMetricError when a dependency is missing', async () => {
  //   const metric = {
  //     state: { id: 'm2', dependencies: ['missing'], ignore: false, result: null },
  //     visitors: {} // no-op visitor
  //   }
  //
  //   const result = await executeMetrics([metric], [])
  //   expect(logMetricErrorSpy).toHaveBeenCalledWith(
  //     `Dependency "missing" not found for metric m2`
  //   )
  //   expect(result.m2.dependencies).toEqual({})
  // })
  //
  // it('should resolve dependencies when present', async () => {
  //   // First metric provides 'files'
  //   const filesMetric = {
  //     state: { id: 'files', dependencies: [], ignore: false, result: { count: 5 } },
  //     visitors: {} // no-op
  //   }
  //   // Dependent metric uses file-coupling structure
  //   const fileCouplingMetric = {
  //     state: {
  //       name: 'File Coupling',
  //       description: '...',
  //       result: {},
  //       id: 'file-coupling',
  //       dependencies: ['files'],
  //       status: false,
  //       ignore: false
  //     },
  //     visitors: {} // no-op
  //   }
  //
  //   const result = await executeMetrics([filesMetric, fileCouplingMetric], [])
  //   // Ensure no error was logged
  //   expect(logMetricErrorSpy).not.toHaveBeenCalled()
  //   // Dependencies of file-coupling should include a clone of filesMetric result
  //   expect(result['file-coupling'].dependencies).toEqual({ files: { count: 5 } })
  //   // Verify original result object was cloned
  //   expect(result['file-coupling'].dependencies.files).not.toBe(filesMetric.state.result)
  // })
  //
  // it('should ignore metrics with state.ignore = true', async () => {
  //   const metric = {
  //     state: { id: 'm3', dependencies: [], ignore: true, result: 42 },
  //     visitors: {} // no-op
  //   }
  //
  //   const result = await executeMetrics([metric], [])
  //   expect(result).not.toHaveProperty('m3')
  // })
})
