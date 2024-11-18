import api from "@/api";
import { defineStore } from "pinia";
import { ref } from "vue";


interface Module {
    id: number;
    name: string;
    description: string;
}

export default defineStore('module', () => {

    const modules = ref([] as Module[]);

    const fetchModules = async () => {
        modules.value = (await api("/api/modules")).data;
    }

    return {
        modules,
        fetchModules,
    }
})