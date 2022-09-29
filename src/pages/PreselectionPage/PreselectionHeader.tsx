interface PreselectionHeaderProps {
  title?: string;
  subtitle?: string;
}

export const PreselectionHeader = ({
  title,
  subtitle,
}: PreselectionHeaderProps) => {
  return (
    <div>
      <div>{title}</div>
      <div>{subtitle}</div>
    </div>
  );
};
