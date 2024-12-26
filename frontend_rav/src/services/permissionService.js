import FetchService from "./fetchService";
import { useAuthStore } from "../stores/auth";

export default class PermissionService {
    constructor() {
        this.fetchService = new FetchService();
        this.authStore = useAuthStore();
    }

    async validate(url, modules) {
        const rol_id = this.authStore.getAuthenticatedUser().user.id_rol;
        const newUrl = url + rol_id + "permissions";
     
        const response = await this.fetchService.get(newUrl, {
            fetchOptions: {

            },
            success: (response) => {
                for (let i = 0; i<response.length; i++){
                    
                }
                for (let module of modules){
                    if (response[i].id_modulo == module.module_id){
                        if (module.permisos.includes(response[i].id_permiso_tipo)){
                            module.show = true
                        }
                        else{
                            module.show = false
                        }
                    }
                }
                console.log(response)
              
            },
            error: (response) => console.log(response),
        })
        return modules

    }
}