const Baju = require("./Baju");

describe("Entity Baju", () => {
  it("harus membangkitkan error ketika properti ada yang kosong", () => {
    const payload = {
      id: 1,
    };

    expect(() => new Baju(payload)).toThrowError(
      "entitas model baju ada yang tidak lengkap"
    );
  });

  it("harus membangkitkan error ketika ada tipe data yang tidak sesuai", () => {
    const payload = {
      id: "1",
      warna: "putih",
      ukuran: 20,
      harga: 100000,
      stok: 30,
    };

    expect(() => new Baju(payload)).toThrowError(
      "entitas model baju tipe data tidak sesuai"
    );
  });

  it("harus berhasil menampilan data baju dengan benar", () => {
    const payload = {
      id: 1,
      warna: "hitam",
      ukuran: "xl",
      harga: 100000,
      stok: 30,
    };

    const { id, warna, ukuran, harga, stok } = new Baju(payload);

    expect(id).toEqual(payload.id);
    expect(warna).toEqual(payload.warna);
    expect(ukuran).toEqual(payload.ukuran);
    expect(harga).toEqual(payload.harga);
    expect(stok).toEqual(payload.stok);
  });
});
