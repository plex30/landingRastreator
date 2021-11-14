window.onload = () => {
  var swiper = new Swiper(".mySwiper", {
    spaceBetween: 10,
    width: 156,
    direction: "horizontal",
    loop: false,
    breakpoints: {
        768: {
          slidesPerView:5,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 40,
        },
      }
  });

  fecthDataSeguros();
  fecthDataBancos();
};

const fecthDataSeguros = async () => {
  await fetch("https://api-rastreator.herokuapp.com/seguros")
    .then((res) => res.json())
    .then((res) => {
      setSliderOne(res);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};

const fecthDataBancos = async () => {
  await fetch("https://api-rastreator.herokuapp.com/bancos")
    .then((res) => res.json())
    .then((res) => {
      setSliderTwo(res);
    })
    .catch((error) => {
      console.log("Error: ", error);
    });
};

const setSliderOne = (data) => {
  const sliderOne = document.querySelector(
    ".l-service__slide1 .swiper .swiper-wrapper"
  );
  data.forEach((item) => {
    const sliderChild = document.createElement("div");
    sliderChild.classList.add("swiper-slide");
    sliderOne.appendChild(sliderChild);
    const title = document.createElement("p");
    title.classList.add("slider-title");
    title.textContent = item.title;
    sliderChild.appendChild(title);
    const from = document.createElement("p");
    from.classList.add("slider-from");
    from.textContent = "Desde";
    sliderChild.appendChild(from);
    const price = document.createElement("p");
    price.classList.add("slider-price");
    price.textContent = item.price_from + " €/mes";
    sliderChild.appendChild(price);
  });
};

const setSliderTwo = (data) => {
  console.log(data);
  const sliderTwo = document.querySelector(
    ".l-service__slide2 .swiper .swiper-wrapper"
  );
  data.forEach((item) => {
    const sliderChild = document.createElement("div");
    sliderChild.classList.add("swiper-slide");
    sliderTwo.appendChild(sliderChild);
    const title = document.createElement("p");
    title.classList.add("slider-title");
    title.textContent = "Hasta " + item.max + " €";
    sliderChild.appendChild(title);
    const from = document.createElement("p");
    from.classList.add("slider-from");
    from.textContent = "Cuota desde";
    sliderChild.appendChild(from);
    const price = document.createElement("p");
    price.classList.add("slider-price");
    price.textContent = item.fee + " €/mes";
    sliderChild.appendChild(price);
  });
};
