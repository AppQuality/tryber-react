import config from '../config.json'
import {operations} from './schema'


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
	me: (token:string) => {
		const requestHeaders: HeadersInit = new Headers();
		requestHeaders.set('Content-Type', 'application/json');
		if (token) {
			requestHeaders.set('Authorization',  "Bearer " + token);
		}
		return fetch(`${config.api}/me`, {
      method: "GET",
      headers: requestHeaders,
    })
  	.then((res) => res.json())
	},
	signup: (data:operations['post-users']['requestBody']['content']["application/json"]) => {
		const requestHeaders: HeadersInit = new Headers();
		requestHeaders.set('Content-Type', 'application/json');
		return fetch(`${config.api}/users`, {
      method: "POST",
      headers: requestHeaders,
    	body: JSON.stringify(data)
    })
  	.then((res) => res.json())
	}
}

export default API;
