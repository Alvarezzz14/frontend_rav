export default class FetchService{
    constructor(){
        this.fetchController = new AbortController();
        this.fetchOptions = {
            method: "GET",
            headers: {
                "Accept": "application/json",
                "Content-type": "application/json"
            },
            signal: this.fetchController.signal
            
        }
    }

    async service(url,fetchOptions){
        try{
            const response = await fetch(url,fetchOptions)

            if (!response.ok) throw{error:true,errorStatus:response.status,errorMsg:response.statusText}
            
            const json = await response.json()
            return json
        }catch(error){
            if (!error.error) error.error = true

            return error
        }

    }

    async get(url,options){
        let {fetchOptions,success=null,error=null} = options
//eliminar el content type
        fetchOptions = {
            ...this.fetchOptions,
            ...fetchOptions,
        }

        console.log(fetchOptions);
        

       const response = await this.service(url,fetchOptions)

       if (!success || !error) return response
       else if (response.error) error(response)
        else success(response)
    }

    async post(url,options){
        let {fetchOptions,success=null,error=null} = options
        fetchOptions.method = !fetchOptions.method ? fetchOptions.method = "POST" : fetchOptions.method;

        fetchOptions = {
            ...this.fetchOptions,
            ...fetchOptions,
        }
        console.log(fetchOptions);
        

        const response = await this.service(url,fetchOptions);
        if (!success || !error) return response
        else if (response.error) error(response)
            else success(response)

    }
    async put(url,options){
        let {fetchOptions,success=null,error=null} = options
        fetchOptions = !fetchOptions.method ? fetchOptions.method = "PUT" : fetchOptions.method;

        fetchOptions = {
            ...this.fetchOptions,
            ...fetchOptions,
        }

        const response = await this.service(url,this.fetchOptions);
        if (success == null || error == null) return response
        if (response.error) error(response)
            else success(response)

    }

   

}