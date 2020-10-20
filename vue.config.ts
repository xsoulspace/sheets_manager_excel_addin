module.exports = {
  assetsDir: '',
  productionSourceMap: false,
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/sheets_manager_excel_addin/'
      : '/',
}
