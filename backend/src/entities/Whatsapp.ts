import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Queue } from "./Queue";
import { Ticket } from "./Ticket";
import { User } from "./User";

@Entity("whatsapps")
export class Whatsapp {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255, unique: true })
  name: string;

  @Column({ type: "text", nullable: true })
  session: string;

  @Column({ type: "text", nullable: true })
  qrcode: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  status: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  battery: string;

  @Column({ type: "boolean", nullable: true })
  plugged: boolean;

  @Column({ type: "int" })
  retries: number = 0;

  @Column({ type: "text", nullable: true })
  greetingMessage: string;

  @Column({ type: "text", nullable: true })
  farewellMessage: string;

  @Column({ type: "boolean" })
  isDefault: boolean = false;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Ticket, (ticket) => ticket.whatsapp)
  tickets: Ticket[];

  @OneToMany(() => User, (user) => user.whatsapp)
  whatsappUsers: User[];

  @ManyToMany(() => Queue, (queue) => queue.whatsapps)
  @JoinTable({ name: "whatsapp_queues" })
  queues: Queue[];

  constructor(data?: Partial<Whatsapp>) {
    if (data) {
      Object.assign(this, data);
    }
  }
}
