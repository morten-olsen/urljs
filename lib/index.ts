class Url {
  private _schema: string | undefined = 'https';
  hostname: string | undefined;
  pathSegments: string[] = [];
  query: {[key: string]: string} = {};

  constructor(url?: string) {
    if (url) {
      const schemaIndex = url.indexOf('://');
      if (schemaIndex > 0) {
        this._schema = url.substring(0, schemaIndex);
        url = url.substring(schemaIndex + 3);
      }

      const queryIndex = url.indexOf('?');
      if (queryIndex >= 0) {
        const queryString = url.substring(queryIndex + 1);
        this.query = Url.queryStringToObject(queryString);
        url = url.substring(0, queryIndex);
      }

      const pathIndex = url.indexOf('/');
      if (pathIndex > 0) {
        this.pathSegments = Url.pathToSegments(url.substring(pathIndex + 1));
        url = url.substring(0, pathIndex);
      }

      this.hostname = url;
    }
  }

  public get schema() {
    return this._schema + '://';
  }

  public get path() {
    if (this.pathSegments.length === 0) return '';
    return '/' + this.pathSegments.join('/');
  }

  public set path(path: string) {
    this.pathSegments = Url.pathToSegments(path);
  }

  public get queryString() {
    const keys = Object.keys(this.query);
    if (keys.length === 0) return '';
    return '?' + keys.map(key => `${key}=${encodeURIComponent(this.query[key])}`).join('&');
  }

  public set queryString(queryString: string) {
    this.query = Url.queryStringToObject(queryString);
  }

  public toString() {
    return `${this.schema}${this.hostname}${this.path}${this.queryString}`;
  }

  private static pathToSegments(path: string) {
    return path.split('/').filter(i => !!i);
  }

  private static queryStringToObject(queryString: string) {
    if (queryString[0] === '?') {
      queryString = queryString.substring(1);
    }
    const params = queryString.split('&');
    return params.reduce((output, param) => {
      const [key, value] = param.split('=');
      output[key] = decodeURIComponent(value);
      return output;
    }, {} as {[key: string]: string});
  }
}

export default Url;
