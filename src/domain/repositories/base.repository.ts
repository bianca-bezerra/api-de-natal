export interface BaseRepository<T> {
    create(entity: T): Promise<T>;
    list(): Promise<T[]>;
    update(entity: T): Promise<T>;
    delete(entity: T): Promise<void>;
}
