exports.up = (pgm) => {
  pgm.createType('ukuran', ['s', 'm', 'l', 'xl', 'xxl']);
  pgm.createTable('baju', {
    id: {
      type: 'SERIAL',
      primaryKey: true,
    },
    warna: {
      type: 'VARCHAR(50)',
      notNull: true,
      default: 'putih',
    },
    ukuran: {
      type: 'ukuran',
      notNull: true,
      default: 's',
    },
    harga: {
      type: 'INTEGER',
      notNull: true,
      default: 0,
    },
    stok: {
      type: 'INTEGER',
      notNull: true,
      default: 0,
    }
  })
};

exports.down = (pgm) => {
  pgm.dropTable('baju');
  pgm.dropType('ukuran');
};
