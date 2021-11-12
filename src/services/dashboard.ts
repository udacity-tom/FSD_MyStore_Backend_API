import client from '../database';
import { Order } from '../models/order';
import { Product } from '../models/product';

export class DashboardQueries {
  //NOTE: Where to put? Not a model? No handler-> so no route->better placed here. Keep routes/models clean.
  async isUserAdmin(tokenUid: number): Promise<boolean> {
    try {
      const sql = 'SELECT * FROM users WHERE id = ($1);';
      const conn = await client.connect();
      const results = await conn.query(sql, [tokenUid]);
      return results.rows[0].admin;
    } catch (err) {
      throw new Error(`User is not Admin!`);
    }
  }
  async popularProducts(): Promise<string[]> {
    try {
      const sql =
        'SELECT product_id, sum(quantity) FROM order_products GROUP BY ROLLUP(product_id) ORDER BY sum(quantity) DESC LIMIT 6;';
      const conn = await client.connect();
      const filtered = (await conn.query(sql)).rows.filter(item => {
        if (item.product_id != null) {
          return item;
        }
      });
      conn.release();
      return filtered;
    } catch (err) {
      throw new Error(`Something went wrong!`);
    }
  }

  async productsByCategory(category: string): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products WHERE products.category = ($1);';
      const conn = await client.connect();
      const results = await conn.query(sql, [category]);
      conn.release();
      return results.rows;
    } catch (err) {
      throw new Error(`Something went wrong! There is no category ${category}`);
    }
  }

  async userOrdersCompleted(uid: string): Promise<Order[]> {
    try {
      const sql =
        "SELECT * FROM orders WHERE user_id= ($1) AND orders.status='complete';";
      const conn = await client.connect();
      const results = await conn.query(sql, [uid]);
      conn.release();
      return results.rows;
    } catch (err) {
      throw new Error(
        `Something went wrong! No complete orders for user id = ${uid}`
      );
    }
  }
}
