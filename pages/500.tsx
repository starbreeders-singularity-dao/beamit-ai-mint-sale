import animationData from "@/json/lottie/404.json";
import { checkWindow } from "@/lib/functions/_helpers.lib";
import styles from "@/styles/pages/404.module.scss";
import CustomButtonPrimary from "@/ui/CustomButtons/CustomButtonPrimary";
import Typography from "@mui/material/Typography";
import dynamic from "next/dynamic";
// import CustomButton from "@/ui/Buttons/CustomButton";

const Lottie = dynamic(() => import("lottie-react"));
const Wrapper = dynamic(() => import("@/layout/wrapper/Wrapper"));

const Index = () => {
  const reload = () => {
    if (checkWindow()) {
      window.location.reload();
    }
  };
  return (
    <Wrapper>
      <div className={styles.container}>
        <div className={styles.inner}>
          <h1>Something Went wrong</h1>
          <Lottie
            animationData={animationData}
            loop
            style={{
              height: 300,
              width: 300
            }}
            height={300}
            width={300}
          />
          <CustomButtonPrimary
            type="button"
            variant="contained"
            color="primary"
            onClick={reload}
          >
            <Typography>Error</Typography>
          </CustomButtonPrimary>
        </div>
      </div>
    </Wrapper>
  );
};

export default Index;
