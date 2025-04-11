export const handleApiRequest = async <T>(
  apiCall: () => Promise<T>
): Promise<T> => {
  try {
    const result: any = await apiCall();
    if (!result.success) {
      throw new Error((result as any).message || "Request failed");
    }

    return result;
  } catch (error: any) {
    console.log("Error Handler => ", error?.response?.data.message);
    throw new Error(error?.response?.data.message || "Something went wrong");
  }
};
