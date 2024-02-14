import { Layout, Row, Col } from "antd";
import {
  AppContainer,
  Image,
  InfoContainer,
  Title,
  Developer,
  AgeRating,
  BadgeContainer,
  EditorChoiceTag,
  VoteCount,
  DevelopersWrapper,
  InfoWrapper,
  StarsContainer,
  EditorChoiceWrapper,
  EditorChoiseIcon,
  LogoSection,
  StarsSection,
  UserIcon,
} from "./styles";
import InstallButton from "./components/InstallButton";

function App() {
  const filledStar = "★";
  const stars = `${filledStar.repeat(5)}`;
  const voteCount = "1627";

  return (
    <Layout
      className="layout"
      style={{ minHeight: "100vh", paddingTop: "32px" }}
    >
      <Row justify="center">
        <Col xs={24} sm={20} md={18} lg={16} xl={14}>
          <AppContainer>
            <InfoContainer>
              <Row style={{ width: "100%" }}>
                <Col xs={24} sm={18} md={18} lg={18} xl={18}>
                  <LogoSection>
                    <Image src="/267478337023.jpg" alt="App Icon" />
                    <InfoWrapper>
                      <Title>Best Slots</Title>
                      <DevelopersWrapper>
                        <Developer>Nine Dev</Developer>
                        <Developer>Casino</Developer>
                      </DevelopersWrapper>
                      <AgeRating>18+</AgeRating>
                    </InfoWrapper>
                  </LogoSection>
                </Col>
                <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                  <BadgeContainer>
                    <EditorChoiceWrapper>
                      <EditorChoiseIcon
                        src="/choise.png"
                        alt="App Icon"
                      ></EditorChoiseIcon>
                      <EditorChoiceTag>Editor's choice</EditorChoiceTag>
                    </EditorChoiceWrapper>
                    <StarsSection>
                      <StarsContainer>{stars}</StarsContainer>
                      <VoteCount>{voteCount}</VoteCount>
                      <UserIcon src="/user.png" alt="App Icon"></UserIcon>
                    </StarsSection>
                    <InstallButton link="https://www.youtube.com/watch?v=37vhxQQukdE" />
                  </BadgeContainer>
                </Col>
              </Row>
            </InfoContainer>
          </AppContainer>
        </Col>
      </Row>
    </Layout>
  );
}

export default App;
