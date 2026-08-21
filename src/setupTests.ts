// Se configuran los matchers personalizados para las pruebas del DOM
import '@testing-library/jest-dom';

// Se agrega un mock para matchMedia por si algún componente lo requiere al renderizar
window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };