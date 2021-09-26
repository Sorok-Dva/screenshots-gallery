module.exports = {
  lintOnSave: false,
  outputDir: "./dist/client",
  runtimeCompiler: true,
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'fr',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}
