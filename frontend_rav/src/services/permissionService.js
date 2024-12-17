import FetchService from "./fetchService";
import { useAuthStore } from "../stores/auth";

export default class PermissionService {
    constructor(){
        this.fetchService = new FetchService();
        this.authStore = useAuthStore();
    }

    async validate(url,permissionCode){
        const user_id = this.authStore.getAuthenticatedUser().user_id;
        const data = {
            user_id,
            permissionCode
        }

        const response = await this.fetchService.post(url,{fetchOptions:{
            body: JSON.stringify(data)
        }})
        return response

    }
}