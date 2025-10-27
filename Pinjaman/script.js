function hitungPinjaman() {
  const jumlah = parseFloat(document.getElementById("jumlah").value);
  const bulan = parseInt(document.getElementById("bulan").value);
  const bungaTahunan = parseFloat(document.getElementById("bunga").value);

  if (isNaN(jumlah) || jumlah <= 0) {
    document.getElementById("hasil").innerHTML = "<p>Masukkan jumlah pinjaman yang valid.</p>";
    return;
  }

  const bungaBulanan = bungaTahunan / 100 / 12;
  const cicilanBulanan = (jumlah * bungaBulanan) / (1 - Math.pow(1 + bungaBulanan, -bulan));
  const totalBayar = cicilanBulanan * bulan;
  const totalBunga = totalBayar - jumlah;

  const formatRupiah = (angka) => angka.toLocaleString("id-ID", { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  document.getElementById("hasil").innerHTML = `
    <p><strong>Rincian Pinjaman:</strong></p>
    <p>Jumlah Pinjaman: Rp ${formatRupiah(jumlah)}</p>
    <p>Lama Pinjaman: ${bulan} bulan</p>
    <p>Bunga per tahun: ${bungaTahunan}%</p>
    <hr>
    <p><strong>Cicilan per bulan:</strong> Rp ${formatRupiah(cicilanBulanan)}</p>
    <p><strong>Total yang dibayar:</strong> Rp ${formatRupiah(totalBayar)}</p>
    <p><strong>Total bunga:</strong> Rp ${formatRupiah(totalBunga)}</p>
  `;
}
