interface CpuInfo {
    avgLoad: number;
    currentLoad: number;
    currentLoadUser: number;
    currentLoadSystem: number;
    currentLoadNice: number;
    currentLoadIdle: number;
    currentLoadIrq: number;
    rawCurrentLoad: number;
    rawCurrentLoadUser: number;
    rawCurrentLoadSystem: number;
    rawCurrentLoadNice: number;
    rawCurrentLoadIdle: number;
    rawCurrentLoadIrq: number;
    cpus: Cpu[];
}
interface Cpu {
    load: number;
    loadUser: number;
    loadSystem: number;
    loadNice: number;
    loadIdle: number;
    loadIrq: number;
    rawLoad: number;
    rawLoadUser: number;
    rawLoadSystem: number;
    rawLoadNice: number;
    rawLoadIdle: number;
    rawLoadIrq: number;
}
export interface RootObject {
    cpuInfo: CpuInfo;
}
