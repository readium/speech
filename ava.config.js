export default {
  extensions: {
    ts: 'module'
  },
  environmentVariables: {
    TS_NODE_COMPILER_OPTIONS: '{"module":"ES2022"}'
  },
  nodeArguments: [
    '--loader=ts-node/esm'
  ]
}
