import { faqQuery } from "@/api/functions/cms.api";
import { useQuery } from "@tanstack/react-query";

const useFaqHooks = () => {
  const faq = useQuery({
    queryKey: ["FAQ"],
    queryFn: faqQuery
  });

  return {
    faq
  };
};

export default useFaqHooks;
