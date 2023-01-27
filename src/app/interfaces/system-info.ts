interface Raspberry {
    manufacturer: string;
    processor: string;
    type: string;
    revision: string;
}

interface System {
    manufacturer: string;
    model: string;
    version: string;
    serial: string;
    uuid: string;
    sku: string;
    virtual: boolean;
    raspberry: Raspberry;
}

export interface SystemInfo {
    system: System;
}
