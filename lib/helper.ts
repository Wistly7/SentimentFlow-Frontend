import { neutralLimit } from "./constants";

export const getSentimentColor = (setimentNumber: number | null = null) => {
  if (setimentNumber && setimentNumber >= neutralLimit) return "text-green-500";
  if (setimentNumber && setimentNumber <= -neutralLimit) return "text-red-500";
  return "text-yellow-500";
};
export const getSentimentBgColor = (setimentType: string) => {
  switch (setimentType) {
    case "positive":
      return "bg-green-500/10";
    case "negative":
      return "bg-red-500/10";
    case "neutral":
      return "bg-yellow-500/10";
    default:
      return "bg-gray-500/10";
  }
};

 export  const getSentimentLabel = (sentiment: number | undefined) => {
    if (sentiment === undefined) return "Unknown"
    if (sentiment > neutralLimit) return "Positive"
    if (sentiment < -neutralLimit) return "Negative"
    return "Neutral"
  }
export const getSentiment = (value: number) => {
  if (value >= neutralLimit) return "Positive";
  else if (value <= -neutralLimit) return "Negative";
  else return "Neutral";
};
export const getSentimentBadgeColor = (value: number) => {
  if (value >= neutralLimit) return "bg-green-500/20 text-green-500 border-green-500/30";
  else if (value <= -neutralLimit) return "bg-red-500/20 text-red-500 border-red-500/30";
  else return "bg-yellow-500/20 text-yellow-500 border-yellow-500/30";
};

/**
 * Calculates a "window" of page numbers for pagination.
 *
 * @param currentPage The current active page (1-indexed).
 * @param totalPages The total number of pages.
 * @param windowSize The maximum number of pages to show in the window (e.g., 5).
 * @returns An array of page numbers (e.g., [1, 2, 3, 4, 5] or [8, 9, 10, 11, 12]).
 */
export const calculatePaginationWindow = (
  currentPage: number,
  totalPages: number,
  windowSize = 5
): number[] => {
  const MAX_PAGES_PER_WINDOW = windowSize;

  let startPage = currentPage - Math.floor(MAX_PAGES_PER_WINDOW / 2);

  let endPage = currentPage + Math.floor(MAX_PAGES_PER_WINDOW / 2);

  //pages are less than the max window size

  if (startPage < 1) {
    if (endPage - startPage + 1 > totalPages) {
      endPage = totalPages;
    } else {
      console.log(totalPages)
      endPage =Math.min(endPage+ 1 - startPage, totalPages);
    }

    startPage = 1;
  } else if (endPage > totalPages) {
    if (startPage - (endPage - totalPages + 1) < 1) {
      startPage = 1;
    } else {
      startPage = Math.max(startPage- (endPage - totalPages),1);
    }

    endPage = totalPages;
  }

  const pagesArr = [];

  for (let s = startPage; s <= endPage; s++) {
    pagesArr.push(s);
  }

  return pagesArr;
};
/**
 * Generates a random, visually pleasing color in HSL format.
 *
 * @param {number} saturation - The "vibrancy" (0-100). 70 is a good default.
 * @param {number} lightness - The "brightness" (0-100). 50 is a good default for strong colors.
 * @returns {string} A CSS HSL color string (e.g., "hsl(249, 70%, 50%)").
 */
export function generateRandomHslColor(saturation = 70, lightness = 50) {
  // 1. Generate a random number from 0 to 360 for the hue
  const hue = Math.floor(Math.random() * 361); // 0-360 degrees

  // 2. Return the HSL string
  return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
}
export const getAvgScore= (sentiment:string, positiveScore:number, negativeScore:number, neutralScore:number):string=>{
    switch (sentiment){
        case "neutral":
            return neutralScore.toPrecision(4);
        case "positive":
            return positiveScore.toPrecision(4);
        case "negative":
            return negativeScore.toPrecision(4);
        default:
          return "0";

    }
}