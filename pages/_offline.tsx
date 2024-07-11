import offlineJson from "@/json/lottie/offline.json";
import { checkWindow } from "@/lib/functions/_helpers.lib";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"));
const Wrapper = dynamic(() => import("@/layout/wrapper/Wrapper"));
const Container = dynamic(() => import("@mui/material/Container"));
const Stack = dynamic(() => import("@mui/material/Stack"));
const Button = dynamic(() => import("@mui/material/Button"));

const OfflinePage = () => {
  const handleRetry = () => {
    if (checkWindow()) {
      window.location.reload();
    }
  };

  return (
    <Wrapper>
      <Container sx={{ padding: 5 }}>
        <Lottie
          loop
          autoPlay
          animationData={offlineJson}
          rendererSettings={{
            preserveAspectRatio: "xMidYMid slice"
          }}
          height={300}
          width={300}
        />
        <Stack direction="row" justifyContent="center">
          <h1>You are offline!</h1>
        </Stack>
        <Stack direction="row" justifyContent="center">
          <Button
            onClick={handleRetry}
            variant="contained"
            color="secondary"
            disableElevation
          >
            Retry
          </Button>
        </Stack>
      </Container>
    </Wrapper>
  );
};

export default OfflinePage;
