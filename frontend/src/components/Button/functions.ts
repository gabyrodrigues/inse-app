import { StyledVariant } from ".";

export function buttonVariantStyles(variant?: StyledVariant) {
  switch (variant) {
    case "filled":
      return "p-2 rounded-lg font-semibold bg-base-primary text-white border-0 hover:bg-base-darkPrimary";
    case "outline":
      return "p-2 rounded-lg font-semibold bg-transparent text-base-primary border-white border-2 hover:bg-white hover:border-white hover:text-base-darkPrimary disabled:bg-transparent disabled:border-2 disabled:border-gray-400 disabled:text-gray-900 disabled:opacity-30";
    case "outlineSecondary":
      return "p-2 rounded-lg font-semibold bg-transparent text-base-secondary border-white border-2 hover:bg-white hover:border-white hover:text-base-darkSecondary disabled:bg-transparent disabled:border-2 disabled:border-gray-400 disabled:text-gray-900 disabled:opacity-30";
    default:
      return "p-2 rounded-lg font-semibold bg-base-primary text-white border-0 hover:bg-base-darkPrimary";
  }
}
