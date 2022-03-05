import { Header } from "../../components/Header";
import { useRouter } from "next/router";
import { Toaster } from "react-hot-toast";

const Layout = ({ children }: { children?: JSX.Element | undefined }) => {
  const { pathname } = useRouter();

  return (
    <>
      <Toaster containerClassName="z-50" />
      <div className="relative z-0">
        <Header background={pathname !== "/"} />
        <div>{children}</div>
      </div>
      {pathname !== "/" && (
        <div className="z-0 watermark">
          <div className="watermark-image" />
        </div>
      )}
    </>
  );
};

export default Layout;
