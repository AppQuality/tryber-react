import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useMemo,
  useState,
} from "react";

interface ExpPointsContextInterface {
  order: "ASC" | "DESC";
  orderBy: string;
  setOrder: Dispatch<SetStateAction<"ASC" | "DESC">>;
  setOrderBy: Dispatch<SetStateAction<string>>;
}

export const ExpPointsContext = createContext({
  order: "ASC" as "ASC" | "DESC",
  orderBy: "date" as string,
  setOrder: (order: "ASC" | "DESC") => {},
  setOrderBy: (orderBy: string) => {},
});

export const ExpPointsProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [order, setOrder] = useState<"ASC" | "DESC">("DESC");
  const [orderBy, setOrderBy] = useState<string>("date");

  const expPointsContextValue = useMemo(
    () => ({
      order,
      orderBy,
      setOrder: (order: "ASC" | "DESC") => {
        setOrder(order);
      },
      setOrderBy: (orderBy: string) => {
        setOrderBy(orderBy);
      },
    }),
    [order, orderBy, setOrder, setOrderBy]
  );

  return (
    <ExpPointsContext.Provider value={expPointsContextValue}>
      {children}
    </ExpPointsContext.Provider>
  );
};

export const useExpPointsContext = () => {
  const context = useContext(ExpPointsContext);

  if (!context) throw new Error("Provider not found");

  return context; // Now we can use the context in the component, SAFELY.
};
