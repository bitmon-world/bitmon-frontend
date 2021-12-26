import { Header } from "../../components/Header";

const Layout = ({ children }: { children?: JSX.Element | undefined }) => {
  return (
    <div className="relative z-0">
      <Header />
      <div>{children}</div>
    </div>
  );
};

export default Layout;
