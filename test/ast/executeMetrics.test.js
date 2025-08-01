import { afterAll, beforeAll, describe, expect, it, jest } from '@jest/globals'
import { executeMetrics } from '../../src/ast/executeMetrics.js'
import { logger } from '../../src/logger/logger.js'

describe('executeMetrics.js', () => {
  let logMetricErrorSpy
  const registerFileMetric = {
    state: { id: 'register-file', result: {} },
    visitors: {
      Program (path, state) {
        state.result[path.node.filePath] = {}
      }
    }
  }

  const registerFileMetricWithNonexistentDependencies = {
    state: { id: 'register-file', result: {}, dependencies: ['doesnt-exists'] },
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

    it('should process metrics with dependencies logging dependencies not found and return state results', async () => {
      const result = await executeMetrics([registerFileMetricWithNonexistentDependencies], [ast])

      expect(result).toHaveProperty('register-file')
      expect(result['register-file'].result).toEqual({ '/metrics-js-ts/test/ast/temp_valid.js': {} })
      expect(result['register-file'].dependencies).toEqual({})
      expect(logMetricErrorSpy).toHaveBeenCalledWith(
        `Dependency doesnt-exists not found for metric ${registerFileMetricWithNonexistentDependencies.state.id}, deleting from dependencies.`
      )
    })
  })
})
