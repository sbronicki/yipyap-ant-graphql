import { useEffect } from "react";
import { gql, useQuery } from "@apollo/client";
import { Col, PageHeader, Row } from "antd";
import { GET_POSTS_QUERY } from "../../GraphQL/queries";
import Error from "../Error/Error";
import LoadingLogo from "../Loading/LoadingLogo";
import Logo from "../Logo/Logo";
import Posts from "../Post/Posts";
import Banner from "../Profile/Banner";
import { useContext } from "react";
import { MobileContext } from "../../Context/MobileContext";

const Feed = () => {
  const { loading, error, data, refetch } = useQuery(GET_POSTS_QUERY);

  useEffect(() => {
    refetch();
    console.count("refetch");
  }, []);

  if (loading) return <LoadingLogo />;
  if (error) return <Error error={error} />;

  return (
    <Row className="is-fullWidth">
      <Col className="is-flex-center stack-cols" span={24}>
        <FeedBanner
          text={"Yip Yap Global Feed!"}
          subText={
            "This page shows the most recent posts from all fellow Yip Yap users!"
          }
        />
      </Col>
      <Col className="is-flex-center stack-cols" span={24}>
        <Posts postList={data.posts} parent="feed" />
      </Col>
    </Row>
  );
};

export default Feed;

const FeedBanner = ({ text, subText }) => {
  const { isMobile } = useContext(MobileContext);

  return (
    <Row>
      <Col span={!isMobile ? 5 : 4}>{!isMobile && <Logo />}</Col>
      <Col span={!isMobile ? 14 : 16}>
        <Row className="is-fullWidth">
          <Col span={24}>
            <h2 className="has-spacer-padding-top">{text}</h2>
          </Col>
          <Col span={24}>
            <p className="has-spacer-padding">{subText}</p>
          </Col>
        </Row>
      </Col>
      <Col span={!isMobile ? 5 : 4}>{!isMobile && <Logo />}</Col>
    </Row>
  );
};
