import {defineStore} from "pinia";
import {ref} from "vue";

export const useSettingsStore = defineStore('settingsStore', () => {
    const sideBarOpen = ref(true)
    const submenuOpen = ref(0)
    const submenuLv2Open = ref(0)
    const breadcrumbs = ref([])

    const getSideBarState = () => {
        return sideBarOpen.value;
    };

    const getSubmenuStatus = () => {
        return submenuOpen.value;
    };

    const getSubmenuLv2Status = () => {
        return submenuLv2Open.value;
    };

    const getBreadcrumbs = () => {
        return breadcrumbs.value;
    };

    const toggleSidebar = (sideBarState) => {
        sideBarOpen.value = sideBarState;
    };

    const setSubmenuStatus = (submenuOpenState) => {
        submenuOpen.value = submenuOpenState;
    };

    const setSubmenuLv2Status = (submenuLv2OpenState) => {
        submenuLv2Open.value = submenuLv2OpenState;
    };

    const setBreadcrumbs = (breadcrumbs) => {
        breadcrumbs.value = breadcrumbs;
    };

    return {getSideBarState, getSubmenuStatus, getSubmenuLv2Status, getBreadcrumbs,
        toggleSidebar, setSubmenuStatus, setSubmenuLv2Status, setBreadcrumbs};
})