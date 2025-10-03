import path from 'path'
import fs from 'fs'

const state = {
  name: 'File Coupling',
  description: 'Measures file-level coupling by computing each file’s fan-in (dependent files) and fan-out (dependencies)',
  result: {},
  id: 'file-coupling',
  dependencies: ['files'],
  status: false
}

const visitors = {
  // Entry point for each parsed file, load dependency
  Program (path) {
    state.currentFile = path.node.filePath
    state.result = state.dependencies.files
    state.result[state.currentFile] = []
  },

  ImportDeclaration (path) {
    const node = path.node
    const importSource = node.source.value
    const absoluteImport = resolveImportPath(state.currentFile, importSource)

    if (!absoluteImport) return

    state.result[state.currentFile].push(absoluteImport)
  },

  CallExpression (path) {
    const node = path.node

    // Ignore error if it's highlighted, arguments property is a valid Array from the AST node
    const args = node.arguments

    if (
      node.callee.name === 'require' &&
      args.length === 1 &&
      args[0].type === 'StringLiteral'
    ) {
      const importSource = args[0].value
      const absoluteImport = resolveImportPath(state.currentFile, importSource)

      if (!absoluteImport) return

      state.result[state.currentFile].push(absoluteImport)
    }
  },

  TSImportEqualsDeclaration (path) {
    const node = path.node
    const importSource = node.moduleReference.expression.value
    const absoluteImport = resolveImportPath(state.currentFile, importSource)

    if (!absoluteImport) return

    state.result[state.currentFile].push(absoluteImport)
  }
}

function resolveImportPath (importingFile, importSource) {
  if (!importSource.startsWith('.') && !path.isAbsolute(importSource)) return null

  const EXTENSIONS = ['.js', '.cjs', '.ts', '.jsx', '.tsx', '.json']

  const basePath = path.resolve(path.dirname(importingFile), importSource)

  // 1. Exact path
  if (fs.existsSync(basePath) && fs.lstatSync(basePath).isFile()) return basePath

  // 2. Try with extensions
  for (const ext of EXTENSIONS) {
    const fullPath = basePath + ext
    if (fs.existsSync(fullPath)) return fullPath
  }

  // 3. Try index files in directory
  for (const ext of EXTENSIONS) {
    const indexPath = path.join(basePath, 'index' + ext)
    if (fs.existsSync(indexPath)) return indexPath
  }

  // Not found
  return null
}

// Clean up and compute fanIn/fanOut before finishing
function postProcessing (state) {
  const raw = state.result

  const processed = {}

  // Initialize fanOut and empty fanIn for every file found
  for (const filePath of Object.keys(raw)) {
    const fanOut = raw[filePath]
    const fanIn = []

    for (const importSource of raw[filePath]) {
      fanIn.push(importSource)
    }

    processed[filePath] = {
      fanOut,
      fanIn
    }
  }

  // Replace state.result with processed coupling data
  state.result = processed

  // Remove internal state properties
  delete state.currentFile
  delete state.dependencies

  state.status = true
}

export { state, visitors, postProcessing }
