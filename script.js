$(document).ready(function () {
    // Halaman daftar surah
    if ($("#surah-list").length) {
        $.get("https://equran.id/api/v2/surat", function (data) {
            let surahList = data.data;
            let html = "";
            surahList.forEach(surah => {
                html += `
                    <a href="detail.html?id=${surah.nomor}" class="list-group-item list-group-item-action">
                        <div>
                            <strong>${surah.nomor}. ${surah.namaLatin} (${surah.nama})</strong>
                            <p class="mb-0">Arti: ${surah.arti}</p>
                        </div>
                        <span class="badge bg-primary">${surah.jumlahAyat} ayat</span>
                    </a>
                `;
            });
            $("#surah-list").html(html);
        });
    }

    // Halaman detail surah
    if ($("#ayah-list").length) {
        const urlParams = new URLSearchParams(window.location.search);
        const surahId = urlParams.get("id");

        if (surahId) {
            $.get(`https://equran.id/api/v2/surat/${surahId}`, function (data) {
                let surah = data.data;
                $("#surah-title").text(`${surah.namaLatin} (${surah.nama})`);
                $("#surah-translation").text(`Arti: ${surah.arti}`);

                let ayahHtml = "";
                surah.ayat.forEach(ayah => {
                    ayahHtml += `
                        <div class="ayat">
                            <p><strong>${ayah.nomorAyat}.</strong> ${ayah.teksArab}</p>
                            <p>${ayah.teksIndonesia}</p>
                        </div>
                    `;
                });
                $("#ayah-list").html(ayahHtml);
            });
        }
    }
});
