export interface NavigationProp {
    id: number,
    title: string,
    route: string,
    onClick?(item: NavigationProp): void
}