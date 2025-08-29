// formatea los labels con límite y elipsis
export const formatAnalyticLabels = (brand, model, maxLength = 20) => {
  const modelConst = model.length > maxLength 
    ? model.substring(0, maxLength) + "…" 
    : model;

  return `${brand} ${modelConst}`;
};
