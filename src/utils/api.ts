import config from '../config.json'
import {operations} from './schema'

class HttpError extends Error {
	statusCode: number
	constructor(message: string, statusCode: number) {
		super(message); // (1)
		this.name = "HttpError"; // (2)
		this.statusCode = statusCode;
	}
}

const API = {
	login: (credentials:operations['post-authenticate']['requestBody']['content']["application/json"]) => {
		return fetch( `${config.api}/authenticate`, {
	    method: "POST",
	    headers: {
	      "Content-Type": "application/json",
	    },
	    body: JSON.stringify(credentials),
	  })
	    .then((data) => data.json())
	    .then((data) => {
	      if (data.token) {
	        return { token: data.token };
	      }
	      return { token: false, error: data };
	    });
	},
	campaigns: (token:string) => {
		return fetch(`${config.api}/campaigns`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    })
    	.then((res) => res.json())
	},
	me: async (token?:string) => {
		const requestHeaders: HeadersInit = new Headers();
		requestHeaders.set('Content-Type', 'application/json');
		if (token) {
			requestHeaders.set('Authorization',  "Bearer " + token);
		}
		const res = await fetch(`${config.api}/users/me`, {
			method: "GET",
			headers: requestHeaders,
		});
		if (res.ok) {
			return res.json();
		} else {
			throw new HttpError(res.statusText, res.status)
		}
	},
	signup: async (data:operations['post-users']['requestBody']['content']["application/json"]) => {
		const requestHeaders: HeadersInit = new Headers();
		requestHeaders.set('Content-Type', 'application/json');
		const res = await fetch(`${config.api}/users`, {
      method: "POST",
      headers: requestHeaders,
    	body: JSON.stringify(data)
    })
		if (res.ok) {
			return res.json();
		} else {
			let d = await res.json()
			if (d.message) {
				throw new Error(d.message)
			}
			throw new Error("There was an error")
		}
	}
}

export default API;
