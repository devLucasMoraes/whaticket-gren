import { hash } from "bcrypt";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Ticket } from "./Ticket";
import UserQueue from "./UserQueue";
import { Whatsapp } from "./Whatsapp";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255, unique: true })
  email: string;

  @Column({ type: "varchar", length: 255 })
  password: string;

  @Column({ type: "int" })
  tokenVersion: number = 0;

  @Column({ type: "varchar", length: 255 })
  profile: string = "admin";

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Ticket, (ticket) => ticket.user)
  tickets: Ticket[];

  @OneToMany(() => UserQueue, (userQueue) => userQueue.user)
  userQueues: UserQueue[];

  @ManyToOne(() => Whatsapp, (whatsapp) => whatsapp.whatsappUsers, {
    nullable: true,
  })
  @JoinColumn({ name: "whatsapp_id" })
  whatsapp: Whatsapp;

  async hashPassword() {
    this.password = await hash(this.password, 8);
  }

  constructor(data?: Partial<User>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
