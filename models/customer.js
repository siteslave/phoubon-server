module.exports = {
  all(db) {
    return new Promise((resolve, reject) => {
      db.getConnection((err, conn) => {
        if (err) {
          reject(err);
        } else {
          let sql = `SELECT * FROM customers`;
          conn.query(sql, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
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