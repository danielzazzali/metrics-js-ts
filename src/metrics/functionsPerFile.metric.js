const state = {
  name: 'Functions Per File',
  description: 'Counts and records all named functions in each source file, mapping function names to their AST nodes so you can compute functions-per-file and perform function-level analysis.',
  result: {},
  id: 'functions-per-file',
  dependencies: ['files'],
  status: false
}

const visitors = {
  // Entry point for each parsed file, load dependency and create functions array for each file
  Program (path) {
    state.currentFile = path.node.filePath
    state.result = state.dependencies.files
    state.result[state.currentFile] = {}
  },

  /* Examples:
     function foo() {}
     async function bar() {}
  */
  FunctionDeclaration (path) {
    let functionName = ''

    if (path.node.id && path.node.id.name) {
      functionName = path.node.id.name
    } else if (path.parentPath.node.type === 'VariableDeclarator' &&
      path.parentPath.node.id.name) {
      functionName = path.parentPath.node.id.name
    } else {
      return
    }

    if (!state.result[state.currentFile][functionName]) {
      state.result[state.currentFile][functionName] = {}
    }

    state.result[state.currentFile][functionName] = path.node
  },

  /* Examples:
     const baz = function() {}
     const qux = async function() {}
  */
  FunctionExpression (path) {
    let functionName = ''

    if (path.node.id && path.node.id.name) {
      functionName = path.node.id.name
    } else if (path.parentPath.node.type === 'VariableDeclarator' &&
      path.parentPath.node.id.name) {
      functionName = path.parentPath.node.id.name
    } else {
      return
    }

    if (!state.result[state.currentFile][functionName]) {
      state.result[state.currentFile][functionName] = {}
    }

    state.result[state.currentFile][functionName] = path.node
  },

  /* Examples:
     const add = () => {}
     items.map(item => item.value)
  */
  ArrowFunctionExpression (path) {
    let functionName = ''

    if (path.node.id && path.node.id.name) {
      functionName = path.node.id.name
    } else if (path.parentPath.node.type === 'VariableDeclarator' &&
      path.parentPath.node.id.name) {
      functionName = path.parentPath.node.id.name
    } else {
      return
    }

    if (!state.result[state.currentFile][functionName]) {
      state.result[state.currentFile][functionName] = {}
    }

    state.result[state.currentFile][functionName] = path.node
  }
}

// Clean up state before finishing
function postProcessing (state) {
  if (state.currentFile) delete state.currentFile
  if (state.dependencies) delete state.dependencies

  state.status = true
}

export { state, visitors, postProcessing }
