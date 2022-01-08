export class User {
  constructor(
    public email: string,
    public id: string,
    private _token: string,
    private _tokeExpirationData: Date
  ) {}

  get token() {
    if(!this._tokeExpirationData || new Date() > this._tokeExpirationData){
      return null;
    }
    return this._token;
  }
}
