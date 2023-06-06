import { Container } from "@mui/material";

/* eslint-disable-next-line */
export interface IgProps {}

export function Ig(props: IgProps) {
  return (
    <Container sx={{ backgroundImage: `url('/images/banner.png')` }}>
      <h1>Welcome to Ig!</h1>
    </Container>
  );
}

export default Ig;
