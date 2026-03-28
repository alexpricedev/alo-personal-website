export type Project = {
  id: number;
  title: string;
};

const store: Project[] = [];
let nextId = 1;

/** Clears all projects and resets id sequence — for tests only. */
export const resetProjectStoreForTests = (): void => {
  store.length = 0;
  nextId = 1;
};

/** Seeds the three starter rows once per process if the store is empty. */
export const seedStarterProjectsIfEmpty = (): void => {
  if (store.length > 0) return;
  for (const title of [
    "Hello World",
    "Server-Side Rendering",
    "Cookie-based CSRF",
  ]) {
    const id = nextId++;
    store.push({ id, title });
  }
};

export const getProjects = async (): Promise<Project[]> => {
  return [...store].sort((a, b) => a.id - b.id);
};

export const getProjectById = async (id: number): Promise<Project | null> => {
  return store.find((p) => p.id === id) ?? null;
};

export const createProject = async (title: string): Promise<Project> => {
  const project: Project = { id: nextId++, title };
  store.push(project);
  return project;
};

export const updateProject = async (
  id: number,
  title: string,
): Promise<Project | null> => {
  const index = store.findIndex((p) => p.id === id);
  if (index === -1) return null;
  const updated: Project = { id, title };
  store[index] = updated;
  return updated;
};

export const deleteProject = async (id: number): Promise<boolean> => {
  const index = store.findIndex((p) => p.id === id);
  if (index === -1) return false;
  store.splice(index, 1);
  return true;
};
