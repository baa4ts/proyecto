document.addEventListener('DOMContentLoaded', () => {
    window.scrollTo(0, 0);

    if (!window.matchMedia('(prefers-color-scheme: dark)').matches) {
        alternarTema();
    }

    const botonTema = document.getElementById('themeToggle');
    botonTema?.addEventListener('click', alternarTema);

    let haDesplazadoAbajo = false;
    let haDesplazadoArriba = true;
    const umbral = 250;

    window.addEventListener('scroll', antiRebote(() => {
        const posicionDesplazamiento = window.scrollY || document.documentElement.scrollTop;

        if (posicionDesplazamiento > umbral && !haDesplazadoAbajo) {
            haDesplazadoAbajo = true;
            haDesplazadoArriba = false;
            esconderNavbar(true);
        } else if (posicionDesplazamiento < umbral && !haDesplazadoArriba) {
            haDesplazadoArriba = true;
            haDesplazadoAbajo = false;
            esconderNavbar(false);
        }
    }, 50));
});

function esconderNavbar(mostrar) {
    const barraNavegacion = document.getElementById('navbar');
    if (!barraNavegacion) return;

    if (mostrar) {
        barraNavegacion.classList.remove('nav-hidden');
    } else {
        barraNavegacion.classList.add('nav-hidden');
    }
}

function alternarTema() {
    const elementoHtml = document.documentElement;
    const esquemaActual = elementoHtml.getAttribute('data-scheme') || 'light';
    elementoHtml.setAttribute('data-scheme', esquemaActual === 'dark' ? 'light' : 'dark');
}

function antiRebote(funcion, espera) {
    let temporizador;
    return (...args) => {
        clearTimeout(temporizador);
        temporizador = setTimeout(() => funcion.apply(this, args), espera);
    };
}
