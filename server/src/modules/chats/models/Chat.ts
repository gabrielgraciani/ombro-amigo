import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('chat')
class Chat {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id_has_created_chat: string;

  @Column()
  user_id_has_received_chat: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default Chat;
