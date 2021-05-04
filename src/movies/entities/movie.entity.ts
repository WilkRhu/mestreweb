import { Column, DataType, Model, Table } from 'sequelize-typescript';
import { Status } from '../../core/enum/status.enum';
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

  @Column({
    type: DataType.ENUM,
    values: [Status.ACT, Status.DES],
    defaultValue: [Status.ACT],
  })
  status: string;

  @Column({
    type: DataType.STRING,
  })
  uri: string;
}
