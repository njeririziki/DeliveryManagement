import { User } from '../types';
import axios from 'axios';


export const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then(data => {
          console.log({ data });
          
        if (data.status === 'success') {
          return resolve({ data: data.data });
        }

      }).catch(err => {
        reject(err)
        console.log(err)
      }).catch(error => {
        console.error('sign up failed', error);
      });
  })
}

export const fetchUserData = (): Promise<User[]> => {
  return new Promise((resolve, reject) => {
    try {
     axios.get("https://jsonplaceholder.typicode.com/users")
        .then(response => response.data)
        .then((data: User[]) => {
          console.log({ data });
          resolve(data);
        })
        .catch(err => {
          console.log(err);
          reject(err);
        });
    } catch (error) {
      console.error("Failed to fetch data:", error);
      reject(error);
    }
   
  });
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