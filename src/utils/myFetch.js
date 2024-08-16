

export function myFetchFile(url = ``, token="", data = {}, method='POST'){

}


export async function myFetch(url='',method='GET', formData={}){
    
    try {
        // const token = getCookie("token");
        // var headers = {"Authorization":token}
        var headers = {}


        headers["Content-Type"] = "application/json"

        let response;
        if (method == 'GET'){
        response = await fetch(url, {
            method: method, // *GET, POST, PUT, DELETE, etc.
            // mode: "cors", // no-cors, cors, *same-origin
            // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
            // credentials: "same-origin", // include, *same-origin, omit
            headers: headers,
            
            // body: data, // body data type must match "Content-Type" header
        });
        } else {
            response = await fetch(url, {
                method: method, // *GET, POST, PUT, DELETE, etc.
                // mode: "cors", // no-cors, cors, *same-origin
                // cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
                // credentials: "same-origin", // include, *same-origin, omit
                headers: headers,
                body: JSON.stringify(formData), // body data type must match "Content-Type" header
            });
            }

            if (response.ok) {
                var res = await response.json();
                return res;
            }
            else {
                var error = await response.json();
                throw error;
            }
    } catch (error) { 
        throw error
    }
}