export enum ResourceType {
    Dmsg,
    EventMessage,
}

export interface ResourceLanguage {
    J?: number,
    E?: number,
    D?: number,
    F?: number,
}

export interface ResourceFileName {
    baseName: string,
    fileName: string,
}

export interface ResourceEntry {
    fileId: number | ResourceLanguage;
    type?: ResourceType;
    description: string;
    fileName?: ResourceFileName | null,
}

export const database: ResourceEntry[] = [
    // Common resources
    {
        fileId: 0xd8b2,
        type: ResourceType.Dmsg,
        description: 'Chocobo Names',
    },

    // Weather files
    // { fileId: 0x1B78, description: '<Unknown>' }, // Base for weather regions 0-99
    // { fileId: 0x1B79, description: '<Unknown>' }, // Region table for regions 0-99
    // { fileId: 0x1B7C, description: '<Unknown>' }, // Base for weather regions 100+
    // { fileId: 0x1B7D, description: '<Unknown>' }, // Region table for regions 100+

    // Need to be categorized
    { fileId: 0xd8c9, type: ResourceType.Dmsg,          description: '<Unknown>' },
    { fileId: 0xd8ca, type: ResourceType.Dmsg,          description: '<Unknown>' },
    { fileId: 0xd8a9, type: ResourceType.Dmsg,          description: '<Unknown>' },
    { fileId: 0xd8aa, type: ResourceType.Dmsg,          description: '<Unknown>' },
    { fileId: 0xd8af, type: ResourceType.Dmsg,          description: '<Unknown>' },
    { fileId: 0xd8b0, type: ResourceType.Dmsg,          description: '<Unknown>' },
    { fileId: 0xd8ac, type: ResourceType.Dmsg,          description: '<Unknown>' },

    // already found below, can be removed
    { fileId: 0x2d,   type: ResourceType.Dmsg,          description: '<Unknown>' }, // 0
    { fileId: 0x3f,   type: ResourceType.Dmsg,          description: '<Unknown>' }, // 0
    { fileId: 0x1e,   type: ResourceType.Dmsg,          description: '<Unknown>' }, // 8
    { fileId: 0x30,   type: ResourceType.Dmsg,          description: '<Unknown>' }, // 8
    { fileId: 0x20,   type: ResourceType.Dmsg,          description: '<Unknown>' }, // 10
    { fileId: 0x32,   type: ResourceType.Dmsg,          description: '<Unknown>' }, // 10

    // Localized resources
    { fileId: 0x9A76,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 0
    { fileId: 0x9A75,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 1
    { fileId: 0xD8AD,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 2
    { fileId: 0xD8AE,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 3
    { fileId: 0xD8AB,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 4
    { fileId: 0x3F,    type: ResourceType.Dmsg,         description: '<Unknown>' }, // 5
    { fileId: 0xD95D,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 6
    { fileId: 0xD95E,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 7
    { fileId: 0x30,    type: ResourceType.Dmsg,         description: '<Unknown>' }, // 8
    { fileId: 0xD960,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 9
    { fileId: 0x32,    type: ResourceType.Dmsg,         description: '<Unknown>' }, // 10
    { fileId: 0xD962,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 11
    { fileId: 0xD963,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 12
    { fileId: 0xD964,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 13
    { fileId: 0xD965,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 14
    { fileId: 0xD966,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 15
    { fileId: 0xD8A9,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 16
    { fileId: 0xD96D,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 17
    { fileId: 0xD980,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 18
    { fileId: 0xD8AB,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 19
    { fileId: 0xD969,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 20
    { fileId: 0xD96A,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 21
    { fileId: 0xD96B,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 22
    { fileId: 0xD96C,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 23
    { fileId: 0xD971,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 24
    { fileId: 0xD972,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 25
    { fileId: 0xD985,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 26
    { fileId: 0xD98C,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 27
    { fileId: 0xD988,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 28
    { fileId: 0xD986,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 29
    { fileId: 0xD98E,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 30
    { fileId: 0xD97A,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 31
    { fileId: 0xD989,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 32
    { fileId: 0xD98D,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 33
    { fileId: 0xD97C,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 34
    { fileId: 0xD987,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 35
    { fileId: 0xD98A,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 36
    { fileId: 0xD98B,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 37
    { fileId: 0x5B,    type: ResourceType.Dmsg,         description: '<Unknown>' }, // 38
    { fileId: 0x49,    type: ResourceType.Dmsg,         description: '<Unknown>' }, // 39
    { fileId: 0xD977,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 40
    { fileId: 0x4A,    type: ResourceType.Dmsg,         description: '<Unknown>' }, // 41
    { fileId: 0x4B,    type: ResourceType.Dmsg,         description: '<Unknown>' }, // 42
    { fileId: 0xD973,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 43
    { fileId: 0xD976,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 44
    { fileId: 0x5F,    type: ResourceType.Dmsg,         description: '<Unknown>' }, // 45
    { fileId: 0xD978,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 46
    { fileId: 0xD979,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 47
    { fileId: 0xD97D,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 48
    { fileId: 0xD97E,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 49
    { fileId: 0xD8D0,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 50
    { fileId: 0x4C,    type: ResourceType.Dmsg,         description: '<Unknown>' }, // 51
    { fileId: 0xD974,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 52
    { fileId: 0x4D,    type: ResourceType.Dmsg,         description: '<Unknown>' }, // 53
    { fileId: 0x55,    type: ResourceType.Dmsg,         description: '<Unknown>' }, // 54
    { fileId: 0x56,    type: ResourceType.Dmsg,         description: '<Unknown>' }, // 55
    { fileId: 0x57,    type: ResourceType.Dmsg,         description: '<Unknown>' }, // 56
    { fileId: 0x9A85,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 57
    { fileId: 0xD975,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 58
    { fileId: 0xD97F,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 59
    { fileId: 0xD998,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 60
    { fileId: 0xD999,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 61
    { fileId: 0xD99A,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 62
    { fileId: 0xD99B,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 63
    { fileId: 0xD99C,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 64
    { fileId: 0xD99D,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 65
    { fileId: 0xD99E,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 66
    { fileId: 0xD99F,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 67
    { fileId: 0xD9A0,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 68
    { fileId: 0xD9AA,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 69
    { fileId: 0xD9A1,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 70
    { fileId: 0xD9A3,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 71
    { fileId: 0xD9A4,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 72
    { fileId: 0xD9A5,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 73
    { fileId: 0xD9A6,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 74
    { fileId: 0xD9A7,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 75
    { fileId: 0xD9A8,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 76
    { fileId: 0xD9A9,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 77
    { fileId: 0xD9AC,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 78
    { fileId: 0xD9AB,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 79
    { fileId: 0xD9B7,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 80
    { fileId: 0xD9B8,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 81
    { fileId: 0xD9B9,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 82
    { fileId: 0xD9BA,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 83
    { fileId: 0xD9BD,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 84
    { fileId: 0xD9BE,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 85
    { fileId: 0xD9BB,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 86
    { fileId: 0xD9BC,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 87
    { fileId: 0x52,    type: ResourceType.Dmsg,         description: '<Unknown>' }, // 88
    { fileId: 0x51,    type: ResourceType.Dmsg,         description: '<Unknown>' }, // 89
    { fileId: 0xD9B4,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 90
    { fileId: 0xD996,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 91
    { fileId: 0xD9B6,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 92
    { fileId: 0xD995,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 93
    { fileId: 0xD9B5,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 94
    { fileId: 0xD981,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 95
    { fileId: 0xD982,  type: ResourceType.Dmsg,         description: '<Unknown>' }, // 96
    { fileId: 0x1B6D,  type: ResourceType.EventMessage, description: '<Unknown>' }, // 97
    { fileId: 0x1B6F,  type: ResourceType.EventMessage, description: '<Unknown>' }, // 98
    { fileId: 0x1B71,  type: ResourceType.EventMessage, description: '<Unknown>' }, // 99
    { fileId: 0x1B73,  type: ResourceType.EventMessage, description: '<Unknown>' }, // 100
    { fileId: 0x1B75,  type: ResourceType.EventMessage, description: '<Unknown>' }, // 101
    { fileId: 0x1B77,  type: ResourceType.EventMessage, description: '<Unknown>' }, // 102
    { fileId: 0x1B7B,  type: ResourceType.EventMessage, description: '<Unknown>' }, // 103
    { fileId: 0x1B7F,  type: ResourceType.EventMessage, description: '<Unknown>' }, // 104
    { fileId: 0x1914,  description: '<Unknown>' }, // 105 (Zone Event Messages)
    { fileId: 0xE259,  description: '<Unknown>' }, // 106 (Zone Event Messages)
    { fileId: 0x10B9F, description: '<Unknown>' }, // 107 (Zone Event Messages)
    { fileId: 0x14E57, description: '<Unknown>' }, // 108 (Zone Event Messages)
];