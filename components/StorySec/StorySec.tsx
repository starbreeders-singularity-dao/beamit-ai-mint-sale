import { StoryCardList, StorySecProps } from "@/interface/stoysec.interface";
import {
  StoryCardWrapper,
  StoryWrapper
} from "@/styles/StyledComponents/StoryWrapper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import Image from "next/image";

export function StoryCard({ content, number, title }: StoryCardList) {
  return (
    <StoryCardWrapper>
      <Box className="title_head">
        <Typography variant="h5">{number}</Typography>
      </Box>
      <Box className="card_content">
        <Typography variant="h6">{title}</Typography>
        <Typography>{content}</Typography>
      </Box>
    </StoryCardWrapper>
  );
}

export default function StorySec({
  image,
  title,
  children,
  cardList
}: StorySecProps) {
  return (
    <StoryWrapper className="cmn_gap">
      <Container fixed>
        <Box className="storys_sec_upper">
          <Grid container spacing={{ md: 0, xs: 3 }}>
            <Grid item md={5} xs={12}>
              <Box className="story_image">
                <figure>
                  <Image src={image} alt="image" width={540} height={560} />
                </figure>
              </Box>
            </Grid>
            <Grid item md={7} xs={12}>
              <Box className="story_text">
                <Typography variant="h2">{title}</Typography>
                <Box className="story_content">{children}</Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box className="storys_sec_lwr">
          <Grid container spacing={{ md: 4, xs: 2 }} justifyContent="center">
            {cardList?.map((item) => (
              <Grid item lg={4} md={6} xs={12} key={item?.title}>
                <StoryCard {...item} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </StoryWrapper>
  );
}
