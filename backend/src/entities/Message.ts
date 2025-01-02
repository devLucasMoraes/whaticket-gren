import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from "typeorm";
import { Contact } from "./Contact";
import { Ticket } from "./Ticket";

@Entity("messages")
export class Message {
  @PrimaryColumn({ type: "varchar", length: 255 })
  id: string;

  @Column({ type: "int" })
  ack: number = 0;

  @Column({ type: "boolean" })
  read: boolean = false;

  @Column({ type: "boolean" })
  fromMe: boolean = false;

  @Column({ type: "text" })
  body: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  mediaType: string;

  @Column({ type: "boolean" })
  isDeleted: boolean = false;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @ManyToOne(() => Message, (message) => message.id, { nullable: true })
  @JoinColumn({ name: "quoted_msg_id" })
  quotedMsg: Message;

  @ManyToOne(() => Ticket, (ticket) => ticket.messages, { nullable: true })
  @JoinColumn({ name: "ticket_id" })
  ticket: Ticket;

  @ManyToOne(() => Contact, (contact) => contact.messages, { nullable: true })
  @JoinColumn({ name: "contact_id" })
  contact: Contact;
}
