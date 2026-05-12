import axios from "axios";

// Aşağıdaki Fonksiyonu değiştirmeyin.
async function ipAdresimiAl() {
  return await axios({
    method: "get",
    url: "https://apis.ergineer.com/ipadresim",
  }).then(function (response) {
    return response.data;
  });
}

const ipAdresim = await ipAdresimiAl();
console.log(ipAdresim);

/*
  AMAÇ:
  - location_card.png dosyasındakine benzer dinamik bir card oluşturmak.
  - HTML ve CSS hazır, önce IP adresini, sonra bunu kullanarak diğer bilgileri alacağız.

	ADIM 1: IP kullanarak verileri almak
  getData fonskiyonunda axios kullanarak şu adrese GET sorgusu atacağız: https://apis.ergineer.com/ipgeoapi/{ipAdresiniz}

  Fonksiyon gelen datayı geri dönmeli.

  Not: Request sonucu gelen datayı browserda network tabından inceleyin.
  İpucu: Network tabıından inceleyemezseniz GET isteklerini gönderdiğiniz URL'i direkt browserda açabildiğinizi unutmayın. 😉

  Bu fonksiyonda return ettiğiniz veri, Adım 2'de oluşturacağınız component'de argüman olarak kullanılıyor. Bu yüzden, veride hangi key-value çiftleri olduğunu inceleyin.
*/
/*await axios.get("url") */
async function getData() {
  try {
    const response = await axios.get(
      `https://apis.ergineer.com/ipgeoapi/${ipAdresim}`,
    );
    return response.data;
  } catch (e) {
    console.log(e);
  }
}

/*
	ADIM 2: Alınan veriyi sayfada gösterecek componentı oluşturmak
  getData ile aldığımız konum bazlı veriyi sayfada göstermek için cardOlustur fonskiyonu kullanılacak. DOM metodlarını ve özelliklerini kullanarak aşağıdaki yapıyı oluşturun ve dönün (return edin).

  Not: Ülke Bayrağını bu linkten alabilirsiniz:
  'https://flaglog.com/codes/standardized-rectangle-120px/{ülkeKodu}.png';

	<div class="card">
    <img src={ülke bayrağı url} />
    <div class="card-info"> 
    <h3 class="ip">{ip adresi}</h3>
      <p class="ulke">{ülke bilgisi (ülke kodu)}</p>
      <p>Enlem: {enlem} Boylam: {boylam}</p>
      <p>Şehir: {şehir}</p>
      <p>Saat dilimi: {saat dilimi}</p>
      <p>Para birimi: {para birimi}</p>
      <p>ISP: {isp}</p>
    </div>
  </div>
*/

function cardOlustur(myObj) {
  const div = document.createElement("div");
  div.classList.add("card");

  const img = document.createElement("img");
  img.src = `https://flaglog.com/codes/standardized-rectangle-120px/${myObj.ülkeKodu}.png`;
  div.appendChild(img);

  const div2 = document.createElement("div");
  div2.classList.add("card-info");
  div.appendChild(div2);

  const h3 = document.createElement("h3");
  h3.classList.add("ip");
  h3.textContent = myObj.sorgu;
  div2.appendChild(h3);

  const pUlke = document.createElement("p");
  pUlke.classList.add("ulke");
  pUlke.textContent = `${myObj.ülke} (${myObj.ülkeKodu})`;
  div2.appendChild(pUlke);

  const pKonum = document.createElement("p");
  pKonum.textContent = `Enlem: ${myObj.enlem} - Boylam: ${myObj.boylam}`;
  div2.appendChild(pKonum);

  const pSehir = document.createElement("p");
  pSehir.textContent = `Şehir: ${myObj.bölgeAdı}`;
  div2.appendChild(pSehir);

  const pSaat = document.createElement("p");
  pSaat.textContent = `Saat dilimi: ${myObj.saatdilimi}`;
  div2.appendChild(pSaat);

  const pPara = document.createElement("p");
  pPara.textContent = `Para birimi: ${myObj.parabirimi}`;
  div2.appendChild(pPara);

  const pIsp = document.createElement("p");
  pIsp.textContent = `ISP: ${myObj.isp}`;
  div2.appendChild(pIsp);

  return div;
}

// Buradan sonrasını değiştirmeyin, burası yazdığınız kodu sayfaya uyguluyor.
getData().then((response) => {
  const cardContent = cardOlustur(response);
  const container = document.querySelector(".container");
  container.appendChild(cardContent);
});
