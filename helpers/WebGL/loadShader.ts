import postErrorLogs from '../API/postErrorLogs';

export const loadShader = async (path: string): Promise<string | null> => {
  try {
    // For client-side loading
    const response = await fetch(path);
    if (!response.ok) {
      throw new Error(`Failed to load shader at ${path}: ${response.status}`);
    }
    const shaderSource = await response.text();
    return shaderSource;
  } catch (error) {
    postErrorLogs(error, `Error loading shader: ${path}`);
  }

  return null;
};
