interface SelectionFormProps {
  title?: string;
  subtitle?: string;
}

export const SelectionFormHeader = ({
  title,
  subtitle,
}: SelectionFormProps) => {
  return (
    <div>
      <div>{title}</div>
      <div>{subtitle}</div>
    </div>
  );
};
