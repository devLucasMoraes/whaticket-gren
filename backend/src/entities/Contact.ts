import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ContactCustomField } from "./ContactCustomField";
import { Message } from "./Message";
import { Ticket } from "./Ticket";

@Entity("contacts")
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  name: string;

  @Column({ type: "varchar", length: 255 })
  number: string;

  @Column({ type: "varchar", length: 255 })
  email: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  profilePicUrl: string;

  @Column({ type: "boolean" })
  isGroup: boolean;

  @CreateDateColumn()
  createdDate: Date;

  @UpdateDateColumn()
  updatedDate: Date;

  @DeleteDateColumn()
  deletedAt?: Date;

  @OneToMany(() => Message, (messages) => messages.contact)
  messages: Message[];

  @OneToMany(() => Ticket, (ticket) => ticket.contact)
  tickets: Ticket[];

  @OneToMany(() => ContactCustomField, (customField) => customField.contact)
  extraInfo: ContactCustomField[];
}
