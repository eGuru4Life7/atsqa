export class User { 

  private _username: string;
  private _fname: string;
  private _lname: string;
  private _gender: string;
  private _email: string;
  private _password: string;
  private _mobile: string;
  private _home: string;
  private _token: string;
  private _address: string;
  private _city: string;
  private _country: string;


	public get username(): string {
		return this._username;
	}

	public set username(value: string) {
		this._username = value;
	}


	public get fname(): string {
		return this._fname;
	}

	public set fname(value: string) {
		this._fname = value;
	}


	public get lname(): string {
		return this._lname;
	}

	public set lname(value: string) {
		this._lname = value;
	}


	public get gender(): string {
		return this._gender;
	}

	public set gender(value: string) {
		this._gender = value;
	}


	public get email(): string {
		return this._email;
	}

	public set email(value: string) {
		this._email = value;
	}

	public get password(): string {
		return this._password;
	}

	public set password(value: string) {
		this._password = value;
	}

	public get mobile(): string {
		return this._mobile;
	}

	public set mobile(value: string) {
		this._mobile = value;
	}

	public get home(): string {
		return this._home;
	}

	public set home(value: string) {
		this._home = value;
	}

	public get token(): string {
		return this._token;
	}

	public set token(value: string) {
		this._token = value;
	}

	public get address(): string {
		return this._address;
	}

	public set address(value: string) {
		this._address = value;
	}

	public get city(): string {
		return this._city;
	}

	public set city(value: string) {
		this._city = value;
	}

	public get country(): string {
		return this._country;
	}

	public set country(value: string) {
		this._country = value;
	}


}
