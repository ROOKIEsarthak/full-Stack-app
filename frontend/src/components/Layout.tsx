import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Readonly<Props>) {
  return (
    <div className="flex flex-row bg-black text-white ">
      <div className="flex flex-col w-[100%]">
        <Header />
        <div className="flex flex-row">
          <Sidebar />
          <div>{children}</div>
          <Footer />
        </div>
      </div>
    </div>
  );
}
