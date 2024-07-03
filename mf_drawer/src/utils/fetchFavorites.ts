export const fetchFavorites = async (): Promise<number> => {
  try {
    const response = await fetch("http://localhost:3000/storage/favorites");
    if (!response.ok) {
      throw new Error("Failed to fetch favorites");
    }
    const data = await response.json();
    return data.length;
  } catch (error) {
    console.error("Error fetching favorites:", error);
    return 0;
  }
};
