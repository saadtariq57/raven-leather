export const generateSlug = (name: string, id: number) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") // Replace spaces & special chars with "-"
      .replace(/^-|-$/g, "") // Remove leading & trailing "-"
      .concat(`-${id}`); // Append the product ID to ensure uniqueness
  };