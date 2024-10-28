export interface BaseProps {
    events?: Partial<Record<string, (event: Event) => void>>;

    [key: string]: unknown;
}
