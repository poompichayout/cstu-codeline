import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Fade } from "react-awesome-reveal";
import { MiddleBlockSection, Content, ContentWrapper } from "./styles";
import { useState } from "react";
import jwtDecode from "jwt-decode";

interface UserData {
  raw_name: string;
  nickname: string;
}

interface ElderBlockProps {
  title: string;
  content: string;
  button: string;
  t: any;
}

const ElderBlock = ({ title, content, button, t }: ElderBlockProps) => {
  const [user] = useState<UserData>(jwtDecode(localStorage.getItem("$IevTd") as string));
  
  return (
    <MiddleBlockSection>
      <Fade direction="right">
        <Row justify="center" align="middle">
          <ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6 className="app">{t(title) + user.nickname}</h6>
              <Content>{t(content)}</Content>
              
            </Col>
          </ContentWrapper>
        </Row>
      </Fade>
    </MiddleBlockSection>
  );
};

export default withTranslation()(ElderBlock);
