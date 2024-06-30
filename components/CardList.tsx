// import React, { useState, useEffect } from "react";


// import CardItem from "./CardItem";
// import { fetchEmployees } from "../utils/fetchEmployees";
// import { Employee } from "../types/types";


// interface CardListProps {
//   initialPageItems: Employee[];
// }

// const CardList: React.FC<CardListProps> = ({ initialPageItems }) => {
//   const [employees, setEmployees] = useState<Employee[]>(initialPageItems);
//   const [loading, setLoading] = useState<boolean>(false);
//   const [page, setPage] = useState<number>(1);
//   const [hasMore, setHasMore] = useState(true);

//   useEffect(() => {
//     fetchData();
//   }, []);

//   useEffect(() => {
//     const handleScroll = () => {
//       if (
//         window.innerHeight + document.documentElement.scrollTop ===
//         document.documentElement.offsetHeight
//       ) {
//         // Reached the bottom of the page
//         fetchData();
//       }
//     };

//     window.addEventListener("scroll", handleScroll);
//     return () => {
//       window.removeEventListener("scroll", handleScroll);
//     };
//   }, [page]); 


//   const fetchData = async () => {
//     setLoading(true);
//     try {
//       const response = await fetchEmployees(page); // Fetch data from JSON file
//       if (response.length > 0) {
//         setEmployees((prevData) => [...prevData, ...response]);
//         setPage((prevPage) => prevPage + 1);
//       } else {
//         setHasMore(false); // No more data to load
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <>
//       <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
//         {employees.map((employee) => (
//           <CardItem key={employee.id} item={employee} />
//         ))}
//       </div>
//       {loading && <p>Loading...</p>}
//       {!loading && !hasMore && <p>No more items</p>}
//     </>
//   );
// };

// export default CardList;
