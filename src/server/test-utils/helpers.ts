export const cleanupTestData = async (): Promise<void> => {
  // No-op for now, kept for compatibility
};

export const randomEmail = (domain = "example.com"): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `test-${timestamp}-${random}@${domain}`;
};
