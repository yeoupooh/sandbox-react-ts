import { useTheme } from "@material-ui/core/styles";

export default function DeepChild() {
  const theme = useTheme();
  return <span>{`spacing ${theme.spacing}`}</span>;
}
