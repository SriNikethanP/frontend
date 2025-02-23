import Banner from "../components/BannerSection";
import Register from "../components/Register";

const Home = () => {
  return (
    <div>
      <Banner />
      <div className="pt-16">
        <Register /> {/* Your registration form */}
      </div>
    </div>
  );
};
export default Home;
