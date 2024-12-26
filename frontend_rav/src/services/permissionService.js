import FetchService from "./fetchService";
import { useAuthStore } from "../stores/auth";

export default class PermissionService {
    constructor() {
        this.fetchService = new FetchService();
        this.authStore = useAuthStore();
        const rol_id = this.authStore.getAuthenticatedUser().user.id_rol;
        const host = import.meta.env.VITE_HOST;
        this.urlFetch = `${host}:8080/${rol_id}/permissions`
        this.modulesAndPermissions
        this.gotData = false
    }

    async validate(module_id,keyPermissions) {
        if(this.gotData) return
     
        await this.fetchService.get(this.urlFetch, {
            fetchOptions: {

            },
            success: (response) => {
                this.gotData = true
                this.modulesAndPermissions = response
                
              
            },
            error: (response) => console.log(response),
        })


        for (let i = 0; i<this.modulesAndPermissions.length; i++){
            if (module_id == module.module_id){
                for(let index in module.permission){
                    if(module.permission[index].codigo == keyPermissions){
                        return true
                    }
                    else{
                        return false
                    }
                }
            }
        }
      
        console.log(modulesAndPermissions)

    }
}