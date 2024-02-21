/* eslint-disable prefer-const */
export function getAvatarFallbackLetter(
  firstName: string,
  lastName?: string
): string {
  // Handle empty or null names
  if (!firstName && !lastName) {
    return "?"; // Or your preferred fallback character
  }

  // Use last name if available
  if (lastName) {
    return lastName[0].toUpperCase();
  }

  // If only first name, check for single or multiple words
  if (firstName.trim().includes(" ")) {
    // Multiple words - take first letter of each
    const initials = firstName
      .split(/\s+/)
      .map((word) => word[0].toUpperCase())
      .join("");
    return initials.length > 2 ? initials.slice(0, 2) : initials;
  } else {
    // Single word - take first letter
    return firstName[0].toUpperCase();
  }
}

export function flattenObject(obj: object, parentKey = "") {
  let result: object = {};

  for (let key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const newKey = parentKey ? `${parentKey}_${key}` : key;

      if (typeof obj[key] === "object" && obj[key] !== null) {
        Object.assign(result, flattenObject(obj[key], newKey));
      } else {
        result[newKey] = obj[key];
      }
    }
  }

  return result;
}

// exclude object properties
export const exclude = async (obj: object, keys: string[]) => {
  return Object.fromEntries(
    Object.entries(obj).filter(([key]) => !keys.includes(key))
  );
};
