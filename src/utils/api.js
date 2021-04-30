// interface SignupData {
// 	name: string
// }
const API = {
	login: (credentials) => {
		return fetch("https://api.app-quality.com/authenticate", {
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
	campaigns: (token) => {
		return fetch(`https://api.app-quality.com/campaigns`, {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      }),
    })
    	.then((res) => res.json())
	}
}

export default API;
