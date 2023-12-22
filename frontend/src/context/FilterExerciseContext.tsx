import { ReactNode, createContext, useContext, useEffect, useState } from "react";

interface FilterExerciseProps {
  bodyPart: string[];
  setBodyPart: (part: string[]) => void;
  saveBodyPart: (part: string) => void;
}

interface FilterExerciseContextProviderProps {
  children: ReactNode;
}
const FilterExerciseContext = createContext<FilterExerciseProps | null>(null);

export const useFilterExercise = () => {
  const context = useContext(FilterExerciseContext);
  if (!context) {
    // throw new Error("useAuth must be used within an AuthContextProvider");
    console.log("useAuth must be used within an FilterExerciseContextProvider");
  }
  return context;
};

const FilterExerciseContextProvider: React.FC<FilterExerciseContextProviderProps> = ({
  children
}) => {
  const [bodyPart, setBodyPart] = useState<string[]>([]);

  function saveBodyPart(part: string) {
    if (bodyPart.includes(part)) {
      setBodyPart(bodyPart.filter((item) => item !== part));
    } else {
      setBodyPart([...bodyPart, part]);
    }
  }
  const value: FilterExerciseProps = {
    bodyPart,
    setBodyPart,
    saveBodyPart
  };

  return <FilterExerciseContext.Provider value={value}>{children}</FilterExerciseContext.Provider>;
};

export default FilterExerciseContextProvider;
