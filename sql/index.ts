import { Sequelize } from 'sequelize-typescript';
import { Dialect } from 'sequelize';

import configJSON from './config/config.json';
import ToDoList from './models/toDoList.model';

const env = process.env.NODE_ENV || 'development';
const config = configJSON[env];

if (Sequelize) {
  const sequelize = new Sequelize({
    database: config.database,
    dialect: config.dialect as Dialect,
    username: config.username,
    password: config.password,
    storage: ':memory:',
  });

  sequelize.addModels([ToDoList]);
}

export { ToDoList };
