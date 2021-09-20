import client from '../database';
import { AuthStore } from '../middleware/auth';
import { Request, Response } from 'express';

const auth = new AuthStore();

export type User = {
  id?: number;
  username: string;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      const sql = 'SELECT * FROM users;';
      const conn = await client.connect();

      const result = await conn.query(sql);
      conn.release();
      return result.rows;
    } catch (err) {
      throw new Error(`Could not find any users. Error: ${err}`);
    }
  }

  async checkUserName(
    req: Request,
    res: Response,
    next: () => void
  ): Promise<void> {
    try {
      const sql = 'SELECT * FROM users WHERE username = ($1);';
      const conn = await client.connect();
      const result = await conn.query(sql, [req.body.username]);
      conn.release();
      console.log('user.ts: result.rows[0]', result.rows[0]);
      if (result.rows[0] == undefined) {
        next();
      }
      res.status(400).json({
        message: `Something went wrong checking the username. The username isn't unique!`
      });
    } catch (err) {
      throw new Error(
        `Something went wrong checking username: ${req.body.username}`
      );
    }
  }

  async create(user: User): Promise<User> {
    try {
      // console.log('user.ts: user ', user);
      // const existingUser = await this.checkUserName(user.username);
      user.password = await auth.hashPassword(user.password);
      // console.log('user.ts: user ', user);
      const conn = await client.connect();

      const sql =
        'INSERT INTO users (username, firstname, lastname, password) VALUES($1, $2, $3, $4) RETURNING *;';

      const result = await conn.query(sql, [
        user.username,
        user.firstname,
        user.lastname,
        user.password
      ]);
      // console.log('user.ts: result', result);
      conn.release();
      return result.rows[0];
      //take supplied user and store in database, on success return user in json form
    } catch (err) {
      throw new Error(
        `Something went wrong, try again. Duplicate user account? Error: ${err}`
      );
    }
  }

  async show(id: string): Promise<User> {
    try {
      // console.log('user.ts: id is ', id);
      const sql = 'SELECT * FROM users WHERE id=($1);';
      const conn = await client.connect();
      // const idNum =
      const result = await conn.query(sql, [id]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`There is no user with ID ${id}. Error: ${err}`);
    }
  }
  // async update(id: number, username: string, firstname: string, lastname: string){
  async update(user: User): Promise<User> {
    try {
      const sql =
        'UPDATE users SET username= ($1), firstname= ($2), lastname=($3) WHERE users.id = ($4) RETURNING *;';
      const conn = await client.connect();
      const result = await conn.query(sql, [
        user.username,
        user.firstname,
        user.lastname,
        user.id
      ]);
      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Something went wrong with updating user with ID=${
          user.id
        } and name ${(user.firstname, ' ', user.lastname)}`
      );
    }
  }

  async delete(id: string): Promise<string> {
    try {
      // console.log('user.ts/delete: id is ', id);
      const feedback = await this.show(id);
      // console.log('user.ts/delete: feedback ', feedback);
      const sql = 'DELETE FROM users WHERE id=($1);';
      const conn = await client.connect();

      const result = await conn.query(sql, [id]);
      conn.release();
      // console.log('user.ts/delete: value of result.rows[0] ', result.rows[0]);
      // return `Success! User with id = ${id} was deleted`
      return `Success! User with id = ${id} was deleted, Username: ${feedback.username}, (${feedback.firstname} ${feedback.lastname})`;
    } catch (err) {
      throw new Error(`Cannot delete user with id = ${id}`);
    }
  }
}
