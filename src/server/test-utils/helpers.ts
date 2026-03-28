import { createProject, resetProjectStoreForTests } from "../services/project";

export const cleanupTestData = async (): Promise<void> => {
  resetProjectStoreForTests();
};

export const seedTestData = async (): Promise<void> => {
  resetProjectStoreForTests();
  await createProject("Test Project 1");
  await createProject("Test Project 2");
  await createProject("Test Project 3");
};

export const randomEmail = (domain = "example.com"): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  return `test-${timestamp}-${random}@${domain}`;
};
