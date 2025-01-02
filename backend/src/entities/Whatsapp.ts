import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Ticket } from "./Ticket";
import { User } from "./User";
import { WhatsappQueue } from "./WhatsappQueue";

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

  @Column({ type: "boolean" })
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

  @OneToMany(() => WhatsappQueue, (whatsappQueue) => whatsappQueue.whatsapp)
  whatsappQueues: WhatsappQueue[];
}
