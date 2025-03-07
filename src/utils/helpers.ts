/**
 * Converts a given string to title case.
 * 
 * This function transforms the input string such that the first letter of each word is capitalized
 * and the rest of the letters are in lowercase.
 * 
 * @param s - The input string to be converted to title case.
 * @returns The converted string in title case.
 * 
 * @example
 * ```typescript
 * convertStrigToTitleCase("hello world"); // returns "Hello World"
 * ```
 */
export function convertStrigToTitleCase(s: string): string {
    return s.toLowerCase()
            .split(' ')
            .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
}


/**
 * Generates a random order location between a warehouse and a destination.
 * @param warehouse - The starting location (warehouse).
 * @param destination - The final location (destination).
 * @param ratio - The distance ratio between the two points (default: 0.5 for midpoint).
 * @returns A new location object representing the order location.
 */
type Location = { lat: number; lng: number };

export const generateOrderLocation = (warehouse: Location, destination: Location, ratio: number = 0.5): Location => {
  const lat = warehouse.lat + (destination.lat - warehouse.lat) * ratio;
  const lng = warehouse.lng + (destination.lng - warehouse.lng) * ratio;
  return { lat, lng };
};

