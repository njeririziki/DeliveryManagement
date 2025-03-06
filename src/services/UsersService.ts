import { User } from '../types';


export const  fetchUserData = async (): Promise<User[]> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      headers: {
        "x-mirage-bypass": "true",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log({ data });

    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return [];
  }
};

export const fetchUserDetails = async ({ id }: { id: number }): Promise<User> => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      headers: {
        "x-mirage-bypass": "true",
      },
    });
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log({ data });

    return data;
  } catch (error) {
    console.error("Failed to fetch data:", error);
    return {} as User;
  }
};