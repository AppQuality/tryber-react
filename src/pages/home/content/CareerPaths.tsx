import careerMarketResearch from "../assets/career-market-research.png";
import careerMarketResearch2x from "../assets/career-market-research@2x.png";

export const CareerPaths = () => {
  return (
    <img
      srcSet={`${careerMarketResearch} 638w,
               ${careerMarketResearch2x} 768w`}
      sizes="(max-width: 768px) 638px,
            768px"
      src={careerMarketResearch}
      alt="career market research"
    />
  );
};
