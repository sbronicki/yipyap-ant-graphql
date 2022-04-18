import { gql, useQuery } from "@apollo/client";
import { Col, Descriptions, PageHeader, Row } from "antd";
import Posts from "../Post/Posts";
import Banner from "./Banner";
import Headshot from "./Headshot";
import { GET_USER_QUERY } from "../../GraphQL/queries";
import { useLocation } from "react-router-dom";
import { useContext } from "react";
import { UserContext, User } from "../../Context/UserContext";
import { useLayoutEffect } from "react";
import Loading from "../Loading/Loading";
import Error from "../Error/Error";
import { useState, useEffect } from "react";

const Profile = () => {
  const location = useLocation();
  const usernameFromURL = location.pathname.replace("/profile/", "");

  const { user, setUser } = useContext(UserContext);
  const isUsersProfile = user && user.username === usernameFromURL;

  const { loading, error, data } = useQuery(GET_USER_QUERY, {
    variables: { username: usernameFromURL },
  });

  const profileData = data?.user;
  window.gl_profileData = profileData;

  useEffect(() => {
    if (isUsersProfile) {
      setUser({ ...user, profileData: { ...profileData } });
    }
  }, [profileData, isUsersProfile]);

  const colWidth =
    window.innerWidth < 768 ? { span: 24, offset: 0 } : { span: 8, offset: 2 };

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;
  if (!profileData) return <Error error={"No profile data"} />;

  return (
    <Row className="has-spacer-padding-top">
      <Col
        className="is-overflow-hidden is-flex-center banner-container"
        span={24}
      >
        <Banner />
      </Col>
      <Col>
        <Row className="stack-cols-mobile">
          <Col
            className="has-spacer-padding-bottom"
            span={colWidth.span}
            offset={colWidth.offset}
          >
            <Headshot />
          </Col>
          <Col span={colWidth.span} offset={colWidth.offset}>
            <PageHeader title={profileData.username} subTitle="I'm the user!">
              <Descriptions column={1}>
                <Descriptions.Item label="Member Since">
                  {profileData.createDate}
                </Descriptions.Item>
                <Descriptions.Item label="Posts">
                  {profileData.posts.length}
                </Descriptions.Item>
              </Descriptions>
            </PageHeader>
          </Col>
        </Row>
      </Col>
      <Col className="is-flex-center stack-cols" span={24}>
        <Posts
          postList={profileData.posts}
          noDataMsg={`${profileData.username} hasn't posted anything :(`}
        />
      </Col>
    </Row>
  );
};

export default Profile;
