export const formatNumber = (number: number): string => {
  const formattedNumber = number.toLocaleString(undefined, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  if (number < 0) {
    return `-$${Math.abs(number).toLocaleString(undefined, {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  }
  return `$${formattedNumber}`;
};
