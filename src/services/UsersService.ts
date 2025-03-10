import { User } from "../types";

export const fetchUserData = (): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    try {
      fetch("https://jsonplaceholder.typicode.com/users", {
        headers: {
          "x-mirage-bypass": "true",
        },
      })
        .then((response) => response.json())
        .then((data: User[]) => {
          resolve(data);
        })
        .catch((err) => {
          console.log(err);
          reject(err);
        });
    } catch (error) {
      console.error("Failed to fetch data:", error);
      reject(error);
    }
  });
};

export const fetchUserDetails = ({ id }: { id: number }): Promise<User> => {
  return new Promise((resolve, reject) => {
    try {
      fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        headers: {
          "x-mirage-bypass": "true",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          reject(err);
          console.log(err);
        });
    } catch (error) {
      console.error("Failed to fetch data:", error);
      return reject(error);
    }
  });
};
