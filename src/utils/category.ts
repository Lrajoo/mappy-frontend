export const getCategory = (category: string[]) => {
  if (category.includes("coffee")) {
    return "https://img.icons8.com/fluency/35/null/coffee-to-go.png";
  } else if (category.includes("restaurant")) {
    return "https://img.icons8.com/external-bearicons-blue-bearicons/35/null/external-Restaurant-location-bearicons-blue-bearicons.png";
  } else if (category.includes("bar")) {
    return "https://img.icons8.com/external-vitaliy-gorbachev-flat-vitaly-gorbachev/35/null/external-cocktail-vacation-vitaliy-gorbachev-flat-vitaly-gorbachev-1.png";
  }
};
