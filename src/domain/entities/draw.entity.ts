import { Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Group } from "./group.entity";
import { User } from "./user.entity";

@Entity()
export class Draw {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Group)
    @JoinColumn({ name: 'group_id' })
    group: Group;

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id" })
    user: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: "friend_id" })
    friend: User;

    constructor(group: Group, user: User, friend: User) {
        this.group = group;
        this.user = user;
        this.friend = friend;
    }
}
