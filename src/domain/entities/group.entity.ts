import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

enum Status {
    PENDING = 'pending',
    COMPLETED = 'completed'
}

@Entity()
export class Group {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string

    @Column({ type: 'enum', enum: Status })
    status: string

    @Column()
    hostId: number

    @ManyToMany(() => User)
    @JoinTable()
    participants: User[]

    constructor(name: string, description: string, hostId: number) {
        this.name = name;
        this.hostId = hostId
        this.description = description
        this.status = Status.PENDING
    }
}
