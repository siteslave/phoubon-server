module.exports = {
  all(db, limit, offset) {
    return new Promise((resolve, reject) => {
      db.getConnection((err, conn) => {
        if (err) {
          reject(err);
        } else {
          let sql = `SELECT * FROM customers LIMIT ? OFFSET ?`;
          conn.query(sql, [limit, offset], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          });
          conn.release();
        }
      });
      
    });
  },

  remove(db, id) {
    return new Promise((resolve, reject) => {
      db.getConnection((err, conn) => {
        if (err) {
          reject(err);
        } else {
          let sql = `DELETE FROM customers WHERE id=?`;
          conn.query(sql, [id], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          });
          conn.release();
        }
      });
      
    });
  },

  saveMap(db, id, lat, lng) {
    return new Promise((resolve, reject) => {
      db.getConnection((err, conn) => {
        if (err) {
          reject(err);
        } else {
          let sql = `
          UPDATE customers 
          SET lat=?, lng=?
          WHERE id=?
          `;
          conn.query(sql, [lat, lng, id], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          });
          conn.release();
        }
      });
      
    });
  },

  total(db) {
    return new Promise((resolve, reject) => {
      db.getConnection((err, conn) => {
        if (err) {
          reject(err);
        } else {
          let sql = `SELECT COUNT(*) AS total FROM customers`;
          conn.query(sql, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows[0].total);
          });
          conn.release();
        }
      });
      
    });
  },
  getCustomerTypes(db) {
    return new Promise((resolve, reject) => {
      db.getConnection((err, conn) => {
        if (err) {
          reject(err);
        } else {
          let sql = `SELECT * FROM customer_types`;
          conn.query(sql, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          });
          conn.release();
        }
      });
      
    });
  },

  save(db, customer) {
    return new Promise((resolve, reject) => {
      db.getConnection((err, conn) => {
        if (err) {
          reject(err);
        } else {
          let sql = `
          INSERT INTO customers(first_name, last_name,
          sex, customer_type_id, email, telephone, image) 
          VALUES(?, ?, ?, ?, ?, ?, ?)
          `;
          conn.query(sql, [
            customer.first_name,
            customer.last_name,
            customer.sex,
            customer.customer_type_id,
            customer.email,
            customer.telephone,
            customer.image
          ], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          });
          conn.release();
        }
      });
      
    });
  }
}