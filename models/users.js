module.exports = {
  doLogin(db, username, password) {
    return new Promise((resolve, reject) => {
      db.getConnection((err, conn) => {
        if (err) {
          reject(err);
        } else {
          let sql = `
          SELECT id, username, fullname 
          FROM users
          WHERE username=? AND password=?
          `;
          conn.query(sql, [username, password], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          });
          conn.release();
        }
      });
      
    });
  },

  saveDeviceToken(db, id, deviceToken) {
    return new Promise((resolve, reject) => {
      db.getConnection((err, conn) => {
        if (err) {
          reject(err);
        } else {
          let sql = `
          UPDATE users 
          SET device_token=?
          WHERE id=?
          `;
          conn.query(sql, [deviceToken, id], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
          });
          conn.release();
        }
      });
      
    });
  }

}