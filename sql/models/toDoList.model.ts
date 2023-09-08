import { Table, Column, Model, DataType } from 'sequelize-typescript';

@Table({ tableName: 'ToDoList', timestamps: true })
export default class ToDoList extends Model {
  @Column(DataType.STRING)
  text: string;

  @Column(DataType.BOOLEAN)
  isFinished: boolean;
}
