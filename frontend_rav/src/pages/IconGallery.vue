<template>
  <div class="p-8">
    <h1 class="text-2xl font-bold mb-6">Galería de Iconos SVG</h1>
    <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">
      <div
        v-for="icon in icons"
        :key="icon.name"
        class="flex flex-col items-center gap-2"
      >
        <component :is="icon.component" :size="40" />
        <span class="text-xs text-center break-all">{{ icon.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
// Importa todos los iconos encontrados en la carpeta Icons
import AddUserIcon from "@/components/Icons/AddUserIcon.vue";
import ApeLaIcon from "@/components/Icons/ApeLaIcon.vue";
import CompetenciasLaboralLaIcon from "@/components/Icons/CompetenciasLaboralLaIcon.vue.vue";
import DeleteIcon from "@/components/Icons/DeleteIcon.vue";
import DocumentIcon from "@/components/Icons/DocumentIcon.vue";
import DownloadIcon from "@/components/Icons/DownloadIcon.vue";
import EditIcon from "@/components/Icons/EditIcon.vue";
import FondoEmprenderIcon from "@/components/Icons/FondoEmprenderIcon.vue";
import IconActivity from "@/components/Icons/IconActivity.vue";
import IconAttention from "@/components/Icons/IconAttention.vue";
import IconDashboard from "@/components/Icons/IconDashboard.vue";
import IconMap from "@/components/Icons/IconMap.vue";
import IconoGov from "@/components/Icons/IconoGov.vue";

import IconoLogoutResponsive from "@/components/Icons/IconoLogoutResponsive.vue";
import IconProfile from "@/components/Icons/IconProfile.vue";
import IconReports from "@/components/Icons/IconReports.vue";
import IconRoles from "@/components/Icons/IconRoles.vue";
import IconRoute from "@/components/Icons/IconRoute.vue";
import IconSearch from "@/components/Icons/IconSearch.vue";
import IconTimeline from "@/components/Icons/IconTimeline.vue";
import IconUpload from "@/components/Icons/IconUpload.vue";
import IconUsers from "@/components/Icons/IconUsers.vue";

import LocationIcon from "@/components/Icons/LocationIcon.vue";
import LogoGov from "@/components/Icons/LogoGov.vue";
import LogoLogout from "@/components/Icons/LogoLogout.vue";
import LogoRav from "@/components/Icons/LogoRav.vue";
import PermissionsIcon from "@/components/Icons/PermissionsIcon.vue";
import RavIcon from "@/components/Icons/RavIcon.vue";
import RavIcon2 from "@/components/Icons/RavIcon2.vue";
import RavLogo from "@/components/Icons/RavLogo.vue";
import RoleIcon from "@/components/Icons/RoleIcon.vue";
import SenaLaIcon from "@/components/Icons/SenaLaIcon.vue";
import UserIcon from "@/components/Icons/UserIcon.vue";
import ViewIcon from "@/components/Icons/ViewIcon.vue";

const icons = [
  { name: "AddUserIcon", component: AddUserIcon },
  { name: "ApeLaIcon", component: ApeLaIcon },
  { name: "CompetenciasLaboralLaIcon", component: CompetenciasLaboralLaIcon },
  { name: "DeleteIcon", component: DeleteIcon },
  { name: "DocumentIcon", component: DocumentIcon },
  { name: "DownloadIcon", component: DownloadIcon },
  { name: "EditIcon", component: EditIcon },
  { name: "FondoEmprenderIcon", component: FondoEmprenderIcon },
  { name: "IconActivity", component: IconActivity },
  { name: "IconAttention", component: IconAttention },
  { name: "IconDashboard", component: IconDashboard },
  { name: "IconMap", component: IconMap },
  { name: "IconoGov", component: IconoGov },
  { name: "IconoLogoutResponsive", component: IconoLogoutResponsive },
  { name: "IconProfile", component: IconProfile },
  { name: "IconReports", component: IconReports },
  { name: "IconRoles", component: IconRoles },
  { name: "IconRoute", component: IconRoute },
  { name: "IconSearch", component: IconSearch },
  { name: "IconTimeline", component: IconTimeline },
  { name: "IconUpload", component: IconUpload },
  { name: "IconUsers", component: IconUsers },
  { name: "LocationIcon", component: LocationIcon },
  { name: "LogoGov", component: LogoGov },
  { name: "LogoLogout", component: LogoLogout },
  { name: "LogoRav", component: LogoRav },
  { name: "PermissionsIcon", component: PermissionsIcon },
  { name: "RavIcon", component: RavIcon },
  { name: "RavIcon2", component: RavIcon2 },
  { name: "RavLogo", component: RavLogo },
  { name: "RoleIcon", component: RoleIcon },
  { name: "SenaLaIcon", component: SenaLaIcon },
  { name: "UserIcon", component: UserIcon },
  { name: "ViewIcon", component: ViewIcon },
];
</script>

<style scoped>
.grid {
  justify-items: center;
}
</style>
