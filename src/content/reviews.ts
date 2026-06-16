export type Review = {
  quote: string;
  author: string; // business name or owner
  location?: string; // town on the Costa Blanca
};

// Placeholder — fill these in with real, verifiable client reviews as they come.
// Leave the array empty to hide individual quotes; the section still shows the
// honest "5-star rated" headline.
export const reviews: Review[] = [];

export const reviewsHeadline = "5-star rated by Costa Blanca businesses";
