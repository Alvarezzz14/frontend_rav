import FetchService from "./fetchService";
import { useAuthStore } from "../stores/auth";


export default class PermissionService {
  constructor() {
    this.fetchService = new FetchService();
    this.authStore = useAuthStore();
    const rol_id = this.authStore.authenticatedUser.user.id_rol;
    const host = import.meta.env.VITE_HOST;
    this.urlFetch = `${host}:8080/roles/${rol_id}/permissions`;
    this.modulesAndPermissions;
  }

  async setModulesAndPermissions(url, fetchOptions = {}) {
    console.log(fetchOptions);
    
    await this.fetchService.get(url, {
      fetchOptions,
      success: (response) => {
        this.modulesAndPermissions = response;
      },
      error: (response) => console.log(response),
    });
  }

   validate(module_id, keyPermissions) {
    console.log("linea 26", this.modulesAndPermissions);

    for (let i = 0; i < this.modulesAndPermissions["modulos_permisos"].length; i++) {
        console.log(this.modulesAndPermissions["modulos_permisos"]);
        
        console.log(module_id,this.modulesAndPermissions["modulos_permisos"][i]["id_modulo"])
      if (module_id == this.modulesAndPermissions["modulos_permisos"][i]["id_modulo"]) {
          
          for (let index in this.modulesAndPermissions["modulos_permisos"][i].permisos) {
            console.log("true");
            console.log(this.modulesAndPermissions["modulos_permisos"][i].permisos[index].codigo)
          if (this.modulesAndPermissions["modulos_permisos"][i].permisos[index].codigo == keyPermissions) {
            console.log("otro true");
            
            return true;
          } else {
            return false;
          }
        }
      }
    }

    return false

  }
}
