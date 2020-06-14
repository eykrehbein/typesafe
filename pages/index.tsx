import { MainBody } from "@/components/global/MainBody";
import { Navbar } from "@/components/global/Navbar";
import { FeaturedArticle } from "@/components/landing/featuredArticle";

export default () => {
  return (
    <MainBody>
      <Navbar />
      <FeaturedArticle />
    </MainBody>
  );
};
