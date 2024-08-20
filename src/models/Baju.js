class Baju {
  constructor(payload) {
    this._verifyPayload(payload);

    const { id, warna, ukuran, harga, stok } = payload;
    this.id = id;
    this.warna = warna;
    this.ukuran = ukuran;
    this.harga = harga;
    this.stok = stok;
  }

  _verifyPayload({ id, warna, ukuran, harga, stok }) {
    if (!id || !warna || !ukuran || harga === undefined || stok === undefined) {
      throw new Error("entitas model baju ada yang tidak lengkap");
    }

    if (
      typeof id !== "number" ||
      typeof warna !== "string" ||
      typeof ukuran !== "string" ||
      typeof harga !== "number" ||
      typeof stok !== "number"
    ) {
      throw new Error("entitas model baju tipe data tidak sesuai");
    }
  }
}

module.exports = Baju;
