export const Options ={
    margin: 30,
    loop:true,
    responsiveClass: true,
    nav: true,
    dots: false,
    autoplay: true,
    // navText: ["<div className='nav-btn prev-slide' style='font-size: 20px;width: 40px'><</div>","<div className='nav-btn next-slide'style='font-size: 20px;width: 40px'>  ></div>"],
    navText: ["",""],
    smartSpeed: 1000,
    responsive: {
        0: {
            items: 1,
        },
        400: {
            items: 1,
        },
        600: {
            items: 2,
        },
        700: {
            items: 3,
        },
        1000: {
            items: 1,

        }
    },
};