export enum InfoStatus {
    Bad = 'bad', 
    Pending = 'pending',
    Good = 'good'
}

export interface Info {
    id?: number | string,
    text: string,
    status: InfoStatus
}
export interface InfoState {
    infos: Info[]
}