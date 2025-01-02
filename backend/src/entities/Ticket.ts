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
import { Contact } from "./Contact";
import { Message } from "./Message";
import { Queue } from "./Queue";
import { User } from "./User";
import { Whatsapp } from "./Whatsapp";

@Entity("tickets")
export class Ticket {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  status: string = "pending";

  @Column({ type: "int", nullable: true })
  unreadMessages: number;

  @Column({ type: "text", nullable: true })
  lastMessage: string;

  @Column({ type: "boolean" })
  isGroup: boolean = false;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Message, (message) => message.ticket)
  messages: Message[];

  @ManyToOne(() => User, (user) => user.tickets, { nullable: true })
  @JoinColumn({ name: "user_id" })
  user: User;

  @ManyToOne(() => Contact, (contact) => contact.tickets, { nullable: true })
  @JoinColumn({ name: "contact_id" })
  contact: Contact;

  @ManyToOne(() => Whatsapp, (whatsapp) => whatsapp.tickets, { nullable: true })
  @JoinColumn({ name: "whatsapp_id" })
  whatsapp: Whatsapp;

  @ManyToOne(() => Queue, (queue) => queue.tickets, { nullable: true })
  @JoinColumn({ name: "queue_id" })
  queue: Queue;
}
