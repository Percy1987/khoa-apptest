import { useState, useEffect } from "react";

interface ToolLanguageResource {
  toolLanguageResourceId: number;
  positionResourceId: number;
  name: string;
}

interface PositionData {
  positionResourceId: number;
  name: string;
  toolLanguageResources: ToolLanguageResource[];
}

const usePositions = () => {
  const [positionOptions, setPositionOptions] = useState<PositionData[]>([]);
 

  useEffect(() => {
    fetch("../data/positionresources.json")
      .then((response) => response.json())
      .then((data) => {
        console
        setPositionOptions(data.data);
      })
      .catch((error) => {
        console.error("Error fetching positions:", error);
      });   
  }, []);

  return { positionOptions };
};

export default usePositions;
