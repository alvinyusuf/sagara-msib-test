const Baju = require("../models/Baju");

class BajuRepository {
  constructor(pool) {
    this.pool = pool;
  }

  async findAll() {
    const query = "SELECT * FROM baju";
    const result = await this.pool.query(query);
    return result.rows.map((row) => new Baju(row));
  }

  async create(baju) {
    const { warna, ukuran, harga, stok } = baju;
    const query =
      "INSERT INTO baju (warna, ukuran, harga, stok) VALUES ($1, $2, $3, $4) RETURNING *";
    const values = [warna, ukuran, harga, stok];
    const result = await this.pool.query(query, values);
    return new Baju(result.rows[0]);
  }

  async findById(id) {
    const query = "SELECT * FROM baju WHERE id = $1";
    const result = await this.pool.query(query, [id]);
    if (result.rows.length === 0) return null;
    return new Baju(result.rows[0]);
  }

  async update(id, dataBaju) {
    const existingBaju = await this.findById(id);
    if (!existingBaju) return null;
    const warna = dataBaju.warna || existingBaju.warna;
    const ukuran = dataBaju.ukuran || existingBaju.ukuran;
    const harga = dataBaju.harga || existingBaju.harga;
    const stok = dataBaju.stok || existingBaju.stok;
    const query =
      "UPDATE baju SET warna = $1, ukuran = $2, harga = $3, stok = $4 WHERE id = $5 RETURNING *";
    const values = [warna, ukuran, harga, stok, id];
    const result = await this.pool.query(query, values);
    if (result.rows.length === 0) return null;
    return new Baju(result.rows[0]);
  }

  async delete(id) {
    const query = "DELETE FROM baju WHERE id = $1 RETURNING *";
    const result = await this.pool.query(query, [id]);
    return result.rowCount > 0;
  }

  async findByWarnaDanUkuran(warna, ukuran) {
    const query = "SELECT * FROM baju WHERE warna = $1 AND ukuran = $2";
    const result = await this.pool.query(query, [warna, ukuran]);
    return result.rows.map((row) => new Baju(row));
  }

  async adjustStok(id, quantity) {
    const parsedQuantity = parseInt(quantity, 10);
    const query = "UPDATE baju SET stok = stok + $1 WHERE id = $2 RETURNING *";
    const result = await this.pool.query(query, [parsedQuantity, id]);
    if (result.rows.length === 0) return null;
    return new Baju(result.rows[0]);
  }

  async cekStok(operator, param) {
    const query = `SELECT * FROM baju WHERE stok ${operator} ${param}`;
    const result = await this.pool.query(query);
    return result.rows.map((row) => new Baju(row));
  }
}

module.exports = BajuRepository;
