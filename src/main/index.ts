function importAllHandlers(): void {
  const context = require.context('~/handlers', false, /\.ts$/)
  context.keys().forEach(context)
}

importAllHandlers()
