var crsr = document.querySelector("#cursor");
var blur = document.querySelector("#cursor-blur");

document.addEventListener("mousemove", function (dets) {
  crsr.style.left = dets.x + "px";
  crsr.style.top = dets.y + "px";
  blur.style.left = dets.x - 150 + "px";
  blur.style.top = dets.y - 150 + "px";
});

var h4all = document.querySelectorAll("#nav h4");
h4all.forEach(function (elem) {
  elem.addEventListener("mouseenter", function () {
    crsr.style.scale = 3;
    crsr.style.border = "1px solid #fff";
    crsr.style.backgroundColor = "transparent";
  });
  elem.addEventListener("mouseleave", function () {
    crsr.style.scale = 1;
    crsr.style.border = "0px solid #95C11E";
    crsr.style.backgroundColor = "#95C11E";
  });
});
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.getElementById('nav');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Your existing code for fetching and updating cryptocurrency data
    // Ensure this part of the script remains intact
});

document.addEventListener('DOMContentLoaded', function() {
    const apiUrl = 'https://api.coingecko.com/api/v3/coins/markets';
    const coins = [
        { id: 'bitcoin', symbol: 'BTC' },
        { id: 'ethereum', symbol: 'ETH' },
        { id: 'dogecoin', symbol: 'DOGE' },
        { id: 'binancecoin', symbol: 'BNB' },
        { id: 'solana', symbol: 'SOL' },
        { id: 'tether', symbol: 'USDT' },
        { id: 'cardano', symbol: 'ADA' },
        { id: 'ripple', symbol: 'XRP' },
        { id: 'polkadot', symbol: 'DOT' },
        { id: 'usd-coin', symbol: 'USDC' },
        { id: 'avalanche', symbol: 'AVAX' },
        { id: 'terra-luna', symbol: 'LUNA' }
    ];

    coins.forEach((coin, index) => {
        fetch(`${apiUrl}?vs_currency=usd&ids=${coin.id}&order=market_cap_desc&per_page=1&page=1&sparkline=false`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.length === 0) {
                    throw new Error(`No data returned for ${coin.symbol}`);
                }
                const coinData = data[0]; // Assuming only one coin data is returned per request
                const card = document.getElementById(`card${index + 1}`);
                if (card) {
                    const overlay = card.querySelector('.overlay');
                    const price = coinData.current_price;
                    const marketCap = coinData.market_cap;
                    const volume = coinData.total_volume;
                    const change24h = coinData.price_change_percentage_24h;

                    overlay.innerHTML = `
                        <h4>${coin.symbol}</h4>
                        <p>Price: $ ${price}</p>
                        <p>Market Cap: $ ${marketCap.toLocaleString()}</p>
                        <p>24h Volume: $ ${volume.toLocaleString()}</p>
                        <p>24h Change: ${change24h.toFixed(2)}%</p>
                    `;
                } else {
                    throw new Error(`Card element not found for ${coin.symbol}`);
                }
            })
            .catch(error => {
                console.error(`Error fetching data for ${coin.symbol}:`, error);
            });
    });
});
