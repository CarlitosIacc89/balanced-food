export function validatePassword(password) {
  if (!password || password.length < 6) {
    return {
      message: "La contraseña debe tener 6 caracteres o más",
      status: 400,
    };
  }
  return null;
}

export function validateName(name, option = "nombre") {
  const nameRegex = /^[A-Za-z]+$/;

  if (!name || name.trim().length === 0) {
    return {
      message: `El ${option} es obligatorio`,
      status: 400,
    };
  }

  if (!nameRegex.test(name)) {
    return {
      message: `El ${option} debe contener solo letras (sin simbolos ni numeros)`,
      status: 400,
    };
  }

  return null;
}

export function validateEmail(email) {
  const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

  if (!emailRegex.test(email)) {
    return {
      message: "Imgresa un correo valido",
      status: 400,
    };
  }
  return null;
}
