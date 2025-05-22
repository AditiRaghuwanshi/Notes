export const validateEmail = (Email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(Email);
}


export const getInitials = (name) => {
  if (!name) return "";

  const words = name.trim().split(/\s+/); // Split by one or more spaces

  const firstChar = words[0][0]; // First letter of first word
  const lastChar = words[words.length - 1][0]; // First letter of last word

  return (firstChar + lastChar).toUpperCase(); // Combine and uppercase
};

