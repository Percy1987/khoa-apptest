import employeesData from '../data/employees.json';
import { Employee } from '../types/types';


export const fetchEmployees = (page: number, pageSize: number = 10) => {
  return new Promise<Employee[]>((resolve, reject) => {
    try {
      const startIndex = (page - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const pageItems = employeesData.data.pageItems.slice(startIndex, endIndex);
      resolve(pageItems);
    } catch (error) {
      reject(error);
    }
  });
};