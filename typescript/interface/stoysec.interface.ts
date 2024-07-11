export interface StoryCardList {
  number: string;
  title: string;
  content: string;
}

export interface StorySecProps {
  image: string;
  title: string;
  children: JSX.Element | JSX.Element[];
  cardList: StoryCardList[];
}
