const docusign = require('docusign-esign')

module.exports = class DocuSignConnector {
  constructor () {
    this.apiClient = new docusign.ApiClient()
    this.apiClient.setBasePath(process.env.CONFIG_DOCUSIGN_BASEPATH)
    this.scopes = [this.apiClient.OAuth.Scope.EXTENDED]
    this.randomState = 'r"@jçà)$'
  }

  authenticate (req, res) {
    const authUri = (
      this.apiClient.getAuthorizationUri(
        process.env.CONFIG_DOCUSIGN_INTEGRATORKEY,
        this.scopes,
        `http://localhost:${process.env.PORT}/docusign/callback`,
        this.randomState
      )
    )
    res.redirect(authUri)
  }

  _request (func) {
    if (!func) {
      return Promise.reject(new Error('Function has not been passed'))
    } else {
      return this._authenticate()
        .then(token => func(token))
    }
  }
}
