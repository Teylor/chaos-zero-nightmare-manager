export const slugify = (str: string) => {
  return str
    .trim() // Remove whitespace from ends
    .toLowerCase() // Convert to lowercase
    .replace(/\s+/g, '_'); // Replace one or more spaces with a single underscore
};
