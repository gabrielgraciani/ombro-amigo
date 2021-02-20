import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('posts_action')
class PostAction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column()
  post_id: string;

  @CreateDateColumn()
  created_at: Date;
}

export default PostAction;
