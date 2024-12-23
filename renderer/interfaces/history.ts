import { Model } from "./model";

export type ModelPricing = {
  inputPrice: number;
  promptCacheWritePrice: number;
  promptCacheReadPrice: number;
  outputPrice: number;
};

export const MODEL_PRICING: Record<Model, ModelPricing> = {
  'claude-3-5-sonnet-20241022': {
    inputPrice: 3,
    promptCacheWritePrice: 3.75,
    promptCacheReadPrice: 0.30,
    outputPrice: 15,
  },
  'claude-3-5-haiku-20241022': {
    inputPrice: 0.80,
    promptCacheWritePrice: 1,
    promptCacheReadPrice: 0.08,
    outputPrice: 4,
  },
  'claude-3-opus-20240229': {
    inputPrice: 15,
    promptCacheWritePrice: 18.75,
    promptCacheReadPrice: 1.50,
    outputPrice: 75,
  },
} as const;

export type TokenCountHistory = {
  id: string;
  timestamp: string;
  model: Model;
  text: string;
  tokenCount: number;
};

export type TokenPricing = {
  inputPrice: number;
  promptCacheWritePrice: number;
  promptCacheReadPrice: number;
  outputPrice: number;
};

export const calculateTokenPricing = (model: Model, tokenCount: number): TokenPricing => {
  const pricing = MODEL_PRICING[model];
  if (!pricing) {
    throw new Error(`Unknown model: ${model}`);
  }

  const tokenCountInMillions = tokenCount / 1_000_000;
  return {
    inputPrice: pricing.inputPrice * tokenCountInMillions,
    promptCacheWritePrice: pricing.promptCacheWritePrice * tokenCountInMillions,
    promptCacheReadPrice: pricing.promptCacheReadPrice * tokenCountInMillions,
    outputPrice: pricing.outputPrice * tokenCountInMillions,
  };
};

export type TokenCountHistoryItem = TokenCountHistory;
