// import React, { useState } from "react";
// import { Card, Carousel, Button, Form, InputGroup } from "react-bootstrap";
// import Link from 'next/link';

// interface ToolLanguage {
//   tool: string;
//   description: string;
//   from?: string;
//   to?: string;
//   imageUrls: string[];
// }

// interface Position {
//   id: number;
//   positionName: string;
//   toolLanguages: ToolLanguage[];
// }

// interface FormData {
//   name: string;
//   positions: Position[];
// }

// interface DisplayDataProps {
//   formData: FormData | null;
// }

// const calculateYearDifference = (from?: string, to?: string): string => {
//   if (!from || !to) return "";
//   const fromYear = Number(from);
//   const toYear = Number(to);
//   if (isNaN(fromYear) || isNaN(toYear)) return "";
//   const difference = toYear - fromYear;
//   return `${difference} years`;
// };

// const DisplayData: React.FC<DisplayDataProps> = ({ formData }) => {
//   const [positions, setPositions] = useState<Position[]>(
//     formData ? formData.positions : []
//   );
//   const [searchTerm, setSearchTerm] = useState<string>("");

//   const handleDelete = (id: number) => {
//     setPositions(positions.filter((position) => position.id !== id));
//   };

//   const handleSearch = () => {
//     const filtered = formData?.positions.filter((position) =>
//       position.positionName.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setPositions(filtered || []);
//   };

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSearchTerm(event.target.value);
//   };

//   if (!formData) {
//     return <div>No data available</div>;
//   }

//   return (
//     <>
//       <style jsx>{`
//         #wrapCard {
//           position: relative;
//           margin-top: 1rem;
//         }
//         .delete-button {
//           margin: 0 auto;
//           background-color: red;
//           color: white;
//           border: none;
//           padding: 5px 10px;
//           display: none;
//           cursor: pointer;
//           border-radius: 5px;
//         }
//         #wrapCard .card-body:hover .delete-button {
//           display: block;
//         }
//       `}</style>

//       <div className="row">
//         <div className="col-md-6">
//           <div className="d-flex">
//             <span className="mt-2 me-3">Search </span>
//             <InputGroup>
//               <Form.Control
//                 type="text"
//                 placeholder="Search by position name"
//                 value={searchTerm}
//                 onChange={handleChange}
//               />
//               <Button variant="primary" onClick={handleSearch} className="ms-3">
//                 Search
//               </Button>
//             </InputGroup>
//           </div>
//         </div>
//       </div>

//       <div
//         className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
//         id="wrapCard"
//       >
//         {positions.length === 0 ? (
//           <div className="col">
//             <p className="no-results">No results found.</p>
//           </div>
//         ) : (
//           positions.map((position) => (
//             <div className="col-lg-4 col-md-6 mb-4" key={position.id}>
//               <Link href={`/edit/${position.id}`}>
//                 <div className="card">
//                   <div className="card-body">
//                     {position.toolLanguages.map((toolLanguage) => (
//                       <div key={toolLanguage.tool} className="mb-2">
//                         <div className="d-flex flex-wrap">
//                           <Carousel className="mx-auto">
//                             {toolLanguage.imageUrls.map((url, index) => (
//                               <Carousel.Item key={index}>
//                                 <img
//                                   src={url}
//                                   alt="Uploaded"
//                                   style={{ width: "100%", marginRight: "10px" }}
//                                 />
//                               </Carousel.Item>
//                             ))}
//                           </Carousel>
//                         </div>
//                         <div className="row">
//                           <div className="col-6 font-weight-bold mt-4 text-start">
//                             {formData.name}
//                           </div>
//                           <div className="col-6 font-weight-bold mt-4 text-end">
//                             {calculateYearDifference(
//                               toolLanguage.from,
//                               toolLanguage.to
//                             )}
//                           </div>
//                         </div>
//                         <p className="font-weight-bold mt-2 aaa">
//                           {position.positionName}
//                         </p>
//                         <p className="font-weight-bold mt-2">
//                           {toolLanguage.description}
//                         </p>
//                         <button
//                           className="delete-button"
//                           onClick={() => handleDelete(position.id)}
//                         >
//                           Delete
//                         </button>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </Link>
//             </div>
//           ))
//         )}
//       </div>
//     </>
//   );
// };

// export default DisplayData;













import React, { useState, useEffect } from "react";
import { Card, Carousel, Button, Form, InputGroup } from "react-bootstrap";
import Link from 'next/link';

interface ToolLanguage {
  tool: string;
  description: string;
  from?: string;
  to?: string;
  imageUrls: string[];
}

interface Position {
  id: number;
  positionName: string;
  toolLanguages: ToolLanguage[];
}

interface FormData {
  name: string;
  positions: Position[];
}

interface DisplayDataProps {
  formData: FormData | null;
}

const calculateYearDifference = (from?: string, to?: string): string => {
  if (!from || !to) return "";
  const fromYear = Number(from);
  const toYear = Number(to);
  if (isNaN(fromYear) || isNaN(toYear)) return "";
  const difference = toYear - fromYear;
  return `${difference} years`;
};

const DisplayData: React.FC<DisplayDataProps> = ({ formData }) => {
  const [positions, setPositions] = useState<Position[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [page, setPage] = useState<number>(1); // Track current page or batch
  const [loading, setLoading] = useState<boolean>(false); // Track loading state

  useEffect(() => {
    if (formData) {
      setPositions(formData.positions.slice(0, 10)); // Load initial batch of positions
    }
  }, [formData]);

  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + document.documentElement.scrollTop ===
        document.documentElement.offsetHeight
      ) {
        loadMorePositions();
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [positions]); // Add positions to dependencies if positions change frequently

  const loadMorePositions = async () => {
    if (loading) return;
    setLoading(true);
    try {
      // Simulate fetching more data, replace with actual fetch logic
      const morePositions = await fetchMoreData(); // Replace with your fetch logic
      setPositions((prevPositions) => [...prevPositions, ...morePositions]);
      setPage(page + 1); // Increment page or batch number
    } catch (error) {
      console.error("Error fetching more data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMoreData = async (): Promise<Position[]> => {
    // Simulate fetching more data, replace with actual fetch logic
    return new Promise<Position[]>((resolve) => {
      setTimeout(() => {
        // Example: fetch next 10 positions based on page number
        const startIndex = page * 10;
        const endIndex = startIndex + 10;
        const moreData = formData?.positions.slice(startIndex, endIndex) || [];
        resolve(moreData);
      }, 1000); // Simulated delay
    });
  };

  const handleDelete = (id: number) => {
    setPositions(positions.filter((position) => position.id !== id));
  };

  const handleSearch = () => {
    const filtered = formData?.positions.filter((position) =>
      position.positionName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPositions(filtered || []);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  if (!formData) {
    return <div>No data available</div>;
  }

  return (
    <>
      <style jsx>{`
        #wrapCard {
          position: relative;
          margin-top: 1rem;
        }
        .delete-button {
          margin: 0 auto;
          background-color: red;
          color: white;
          border: none;
          padding: 5px 10px;
          display: none;
          cursor: pointer;
          border-radius: 5px;
        }
        #wrapCard .card-body:hover .delete-button {
          display: block;
        }
      `}</style>

      <div className="row">
        <div className="col-md-6">
          <div className="d-flex">
            <span className="mt-2 me-3">Search </span>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search by position name"
                value={searchTerm}
                onChange={handleChange}
              />
              <Button variant="primary" onClick={handleSearch} className="ms-3">
                Search
              </Button>
            </InputGroup>
          </div>
        </div>
      </div>

      <div
        className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4"
        id="wrapCard"
      >
        {positions.length === 0 ? (
          <div className="col">
            <p className="no-results">No results found.</p>
          </div>
        ) : (
          positions.map((position) => (
            <div className="col-lg-4 col-md-6 mb-4" key={position.id}>
              <Link href={`/edit/${position.id}`}>
                <div className="card">
                  <div className="card-body">
                    {position.toolLanguages.map((toolLanguage) => (
                      <div key={toolLanguage.tool} className="mb-2">
                        <div className="d-flex flex-wrap">
                          <Carousel className="mx-auto">
                            {toolLanguage.imageUrls.map((url, index) => (
                              <Carousel.Item key={index}>
                                <img
                                  src={url}
                                  alt="Uploaded"
                                  style={{ width: "100%", marginRight: "10px" }}
                                />
                              </Carousel.Item>
                            ))}
                          </Carousel>
                        </div>
                        <div className="row">
                          <div className="col-6 font-weight-bold mt-4 text-start">
                            {formData.name}
                          </div>
                          <div className="col-6 font-weight-bold mt-4 text-end">
                            {calculateYearDifference(
                              toolLanguage.from,
                              toolLanguage.to
                            )}
                          </div>
                        </div>
                        <p className="font-weight-bold mt-2 aaa">
                          {position.positionName}
                        </p>
                        <p className="font-weight-bold mt-2">
                          {toolLanguage.description}
                        </p>
                        <button
                          className="delete-button"
                          onClick={() => handleDelete(position.id)}
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </Link>
            </div>
          ))
        )}
      </div>

      {loading && (
          <div className="col-12 text-center">
            <p>Loading...</p>
          </div>
        )}
    </>
  );
};

export default DisplayData;



