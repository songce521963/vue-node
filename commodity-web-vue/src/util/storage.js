
export const saveLang = ({key,data}) =>{
	/*localStorage.setItem(key,JSON.stringify(data));*/
	localStorage.setItem(key,data);
}

export const getLang = (key) =>{
	/*return localStorage.getItem(key)?JSON.parse(localStorage.getItem(key)):{};*/
	return localStorage.getItem(key);
}
