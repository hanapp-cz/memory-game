export default class Countries {
  constructor(url) {
    this._url = url;
  }
  get url() {
    return this._url;
  }

  async getData(region = 'europe') {
    try {
      const res = await fetch(`${this._url}${region}`);
      if (!res.ok) throw new Error(`Problem getting data. ${res.statusText}`);
      const data = await res.json();
      console.log(data);
      return data;
    } catch (err) {
      console.error(err);
      throw err;
    }
  }
}
