const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

export function generateCharacter() {
  let result = ' ';
  const charactersLength = characters.length;
  for (let i = 0; i < 2; i++) {
    result += characters
      .charAt(Math.floor(Math.random() * charactersLength))
      .toUpperCase();
  }

  return result;
}
