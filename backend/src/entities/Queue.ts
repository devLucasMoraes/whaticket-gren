import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Ticket } from "./Ticket";
import { User } from "./User";
import { Whatsapp } from "./Whatsapp";

@Entity("queues")
export class Queue {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, unique: true })
  name: string;

  @Column({ type: "varchar", length: 255, unique: true })
  color: string;

  @Column({ type: "text", nullable: true })
  greetingMessage: string;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Ticket, (ticket) => ticket.queue)
  tickets: Ticket[];

  @ManyToMany(() => User, (user) => user.queues)
  users: Whatsapp[];

  @ManyToMany(() => Whatsapp, (whatsapp) => whatsapp.queues)
  whatsapps: Whatsapp[];

  constructor(data?: Partial<Queue>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
