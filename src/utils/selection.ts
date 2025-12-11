export function getUpdatedOptions(
  currentOptions: string[],
  option: string
): string[] {
  return currentOptions.includes(option)
    ? currentOptions.filter((opt) => opt !== option)
    : [...currentOptions, option];
}

export const toggleOption = getUpdatedOptions;
