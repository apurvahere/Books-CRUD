export const generateUniqueId = (length: number = 3) => {
  const characters = "0123456789";
  return Array.from(
    { length },
    () => characters[Math.floor(Math.random() * characters.length)]
  ).join("");
};
