export interface Server {
    isOnline: boolean;
    name: string;
    gameName: string;
    mapName: string;
    numPlayers: number;
    maxPlayers: number;
    gameMode: string;
    hasPassword: boolean;
    hostIp: string;
    hostPort: number;
    queryPort: number;
    
    isDedicated: boolean;
    isRanked: boolean;
    hasAntiCheat: boolean;
    operatingSystem: string;
    hasAutoRecord: boolean;
    demoIndexUri: string;
    hasVoip: boolean;
    sponsorText: string;
    communityLogoUri: string;
    team1: string;
    team2: string;
    numBots: number;
    mapSize: number;
    hasGlobalUnlocks: boolean;
    reservedSlots: number;
    hasNoVehicles: boolean;
    responseTime: number;
    
    players: Player[];
}

export interface Team {
    name: string;
    score: number;
    players: Player[];
}

export interface Player {
    name: string;
    pid: number;
    team: number;
    teamScore: number;
    kills: number;
    deaths: number;
    totalScore: number;
    ping: number;
    isBot: boolean;
}
