import { Row, Col } from "antd";
import { withTranslation } from "react-i18next";
import { Fade } from "react-awesome-reveal";
import { MiddleBlockSection, Content, ContentWrapper } from "./styles";
import jwtDecode from "jwt-decode";
import { useState } from "react";

interface UserData {
  raw_name: string;
  nickname: string;
}

interface FreshmenBlockProps {
  title: string;
  content: string[];
  button: string;
  t: any;
}

const MiddleBlock = ({ title, content, button, t }: FreshmenBlockProps) => {
  const [user] = useState<UserData>(jwtDecode(localStorage.getItem("$IevTd") as string));

  return (
    <MiddleBlockSection>
      <Fade direction="right">
        <Row justify="center" align="middle">
          <ContentWrapper>
            <Col lg={24} md={24} sm={24} xs={24}>
              <h6 className="app">{t(title) + user.nickname}</h6>
              {content.map((value, index) => (
                <div key={index}>
                <p>{"คำใบ้รอบที่ "+ (index + 1)}</p>
                <Content>{t(value)}</Content>
                </div>
              ))}
            </Col>
          </ContentWrapper>
        </Row>
      </Fade>
    </MiddleBlockSection>
  );
};

export default withTranslation()(MiddleBlock);
