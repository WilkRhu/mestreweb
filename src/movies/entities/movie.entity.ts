import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { CreateMovieDto } from '../dto/create-movie.dto';

@Table
export class Movie extends Model<CreateMovieDto> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title: string;

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  description: string;

  @Column({
    type: DataType.STRING,
  })
  dateInitial: string;

  @Column({
    type: DataType.STRING,
  })
  finalDate: string;
}
